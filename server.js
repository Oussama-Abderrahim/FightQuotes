let express = require("express");
let bodyParser = require("body-parser");
let app = express();

let quoteDb = require("./Quote.js");

app.set("view engine", "ejs");

app.use("/assets", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json


app.get("/", (req, res) => {    
    console.log("loading");
    let quote = quoteDb.getRandom((quote)=> {
        res.locals.quoteText = quote.text;
        res.locals.authorName = quote.author;
        res.render("index");
    });
})

app.get("/getQuote", (req, res) => {
    quoteDb.getRandom((quote)=> {
        res.json(quote);
    });
});

app.get("/addQuote", (req, res) => {
    res.render("addQuote");
})
app.post("/addQuote", (req, res) => {
    quoteDb.addQuote(req.body.authorName, req.body.quoteText, ()=>{
        res.redirect("/");        
    })
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });