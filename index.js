let exp = require("express")
let bodyParser = require("body-parser")
let https = require("https")
const { response } = require("express")
let port = process.env.PORT || 3000
let app = exp()
let url = "https://api.adviceslip.com/advice"
app.use(bodyParser.urlencoded({extended:true}))

app.use(exp.static("public"))

app.get("/",(req,res)=>{
   https.get(url,(response)=>{
    response.on("data",(d)=>{
      let data = JSON.parse(d)
      let advice = data.slip.advice
      let id = data.slip.id
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
      
      <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png">
      <link rel="stylesheet" href="css/style.css">
      
      <title>Frontend Mentor | Advice generator app</title>
      
      <!-- Feel free to remove these styles or customise in your own stylesheet 👍 -->
      </head>
      <body>
      <main>
      <p>
      Advice #<span>`+ id +`</span><!-- Advice ID goes here -->
      </p>
          
      <h2>
      " <span> `+ advice +` </span><!-- Advice text goes here -->"
      </h2>
          <img src="images/pattern-divider-desktop.svg" aria-hidden="true" alt="" class="desktop-divider">
          <img src="images/pattern-divider-mobile.svg" aria-hidden="true" alt="" class="mobile-divider">
      <div class="dice-img-holder">
          <img src="images/icon-dice.svg" alt="" aria-hidden="true" class="dice-img">
        </div>
      </main>
      
      
      </body>
      </html>
      `)
    })
   })
})

app.listen(port,()=>{
    console.log("our port has just started")
})