let mongoose = require("mongoose");

const MONGOLAB_URI = "mongodb://OussamaLightRay:L1ghtingRay@ds159953.mlab.com:59953/fight_quotes";
// const MONGOLAB_URI = "mongodb://localhost/quote_machine";

mongoose.connect(MONGOLAB_URI, {useMongoClient: true}, (err)=> {
    if(err)    
        console.log("there was an error " + err);
    else 
        console.log("connected");
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
            console.log("error adding quote");
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
            if(err) {
                console.log("Error getting quote");
                cb({author : "ERROR",
                    text : "ERROR"})
            } else {
                cb(result);        
            }
        });
    });
    

}

module.exports = {addQuote, getRandom};
