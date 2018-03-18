var quoteForLink="",
  authorForLink="";
var imageSize = "https://source.unsplash.com/random/" + $(window).width() + "x" + $(window).height();
var img = "<div>"

function getBackground(){
  img += "<img src = '" + imageSize + "' alt='Nature Background'>"
  img += "</div>"
  $("#backgroundImg").html(img);
}
function getQuote(){
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(val) {
      console.log(val);
      if (typeof val === "string") {
        val = JSON.parse(val);
      }
      $("#quoteHere").html(val.quote);
      $("#authorHere").html(" - " + val.author);
      window.quoteForLink = encodeURIComponent(val.quote).replace(/'/g, "%27");
      window.authorForLink = encodeURIComponent(val.author).replace(/'/g, "%27");
      $("#tweetBtn").html("<a href='https://twitter.com/intent/tweet?text="+ window.quoteForLink +"  - "+ window.authorForLink + "'><span class='glyphicon glyphicon-send'></span>   Tweet</a>");
      },
    });
}

$(document).ready(function() {
  getBackground();
  getQuote();
  $("#generateBtn").click(function () {
    location.reload();
  });
});
