let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/quote_machine", (err)=> {
    if(err)    
        console.log("there was an error " + err)
});

let quoteSchema = new mongoose.Schema({
    author : String,
    text : String
})

let Quote = mongoose.model("Quote", quoteSchema);


var addQuote = function(author, text, cb) {
    let quote = new Quote({
        author,
        text
    });

    quote.save(function(err, quote){
        if(err) {
            throw err;
        } else {
            console.log("Quote Added ! ");
            cb();
        }
    })
}

var getRandom = function(cb) {
    var count = Quote.count({}, (err, count) => {
        var random = Math.floor(Math.random() * count);
        
        let quote = Quote.findOne().skip(random).exec((err, result)=>{
            cb(result);        
        });
    });
    

}

// addQuote("Oussama", "Miaou?");


module.exports = {addQuote, getRandom};