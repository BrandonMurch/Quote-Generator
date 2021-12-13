/*
@description - Automatically retreive a quote. Each time a quote is
               retrieved, the background changes. The user may also press
               tweet button to open up a new tab and tweet the quote.
@input - Generate a new quote or tweet the current quote by pressing buttons
@author - Brandon - Brandon.Murch@protonmail.com
*/
                /*Dynamically gets the background from Unsplash
                based on the users screen size */
const getBackground = () => {
  let imgURL = "https://source.unsplash.com/random/" + $(window).width()
    + "x" + $(window).height() + "?random=" + Math.round(Math.random() * 1000);
  $(".background").css("background-image", "url(" + imgURL + ")");
}
                /*Gets a random quote, then modifies the HTML to display it.
                  Generates a tweet button using the quote so the user will
                  have the quote pre-typed when the link is opened. */
const getQuote = () => {
  $.ajax({
    type: "GET",
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
    success: function(val) {
      if (typeof val === "string") {
        val = JSON.parse(val);
      }
      $(".quote__text--quote").html(val.quoteText);
      $(".quote__text--author").html(" - " + val.quoteAuthor);
      let quoteForLink = encodeURIComponent(val.quoteText).replace(/'/g, "%27");
      let authorForLink = encodeURIComponent(val.quoteAuthor).replace(/'/g, "%27");
      $(".button--tweet").html("<a href='https://twitter.com/intent/tweet?text="
        + quoteForLink +"  - "+ authorForLink
        + "'><span class='glyphicon glyphicon-send'></span>    Tweet</a>");
      },
    error: function(errorMessage) {
        alert("Error");
    },
    });
}

$(document).ready(() => {
  getBackground();
  getQuote();
  $(".button--generate").click(function () {
    // workaround for codepen because it doesn't like location.reload()
    getBackground();
    getQuote();
  });
});
