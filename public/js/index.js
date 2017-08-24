var apiURL = "/getQuote";
var hashtag = "DailyQuote"

$(document).ready(function() {
    getQuote();
});

function getQuote() {
    $(".quoteBox *").fadeOut('slow', function() {
        loadQuote( (quoteData) => {
            updateHtml(quoteData, ()=>{
                $(".quoteBox *").fadeIn("slow");    
            });
        });
            
    }); 
}
/* JSON and quote update */
function updateHtml(data, cb) {
      $("#quote-text").html(data.text);
      $("#author-name").html(data.author == ""? "Unknown": data.author);
      $("#author-link").attr("href", data.author == ""? "#" : "http://en.wikipedia.org/wiki/" + data.author);
      cb();
}

function loadQuote(cb) {
    $.getJSON(apiURL, function(data){
        cb(data);
    });
}

/* Share buttons part */
var tweet_btn = document.getElementById("tweet");

tweet_btn.addEventListener("click", function(){
  var quoteText = document.getElementById("quote-text").textContent;
  var quoteAuthor = document.getElementById("author-name").textContent;

  var shareLink = 'https://twitter.com/intent/tweet?hashtags='+ hashtag +
      '&text="'+encodeURIComponent(quoteText+'" -' + quoteAuthor);
  
  window.open(shareLink); 
}, false);