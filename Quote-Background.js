/*
@description - Automatically retreive a quote. Each time a quote is
               retrieved, the background changes. The user may also press
               tweet button to open up a new tab and tweet the quote.
@input - Generate a new quote or tweet the current quote by pressing buttons
@author - Brandon - Brandon.Murch@protonmail.com
*/
                /*Dynamically gets the background from Upsplash
                based on the users screen size */
const getBackground = () => {
  let imgURL = "https://source.unsplash.com/random/" + $(window).width()
    + "x" + $(window).height()
  $(".background").css("background-image", "url(" + imgURL + ")");
}
                /*Gets a random quote, then modifies the HTML to display it.
                  Generates a tweet button using the quote so the user will
                  have the quote pre-typed when the link is opened. */
const getQuote = () => {
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
      $(".quote__text--quote").html(val.quote);
      $(".quote__text--author").html(" - " + val.author);
      let quoteForLink = encodeURIComponent(val.quote).replace(/'/g, "%27");
      let authorForLink = encodeURIComponent(val.author).replace(/'/g, "%27");
      $(".button--tweet").html("<a href='https://twitter.com/intent/tweet?text="
        + window.quoteForLink +"  - "+ window.authorForLink
        + "'><span class='glyphicon glyphicon-send'></span>    Tweet</a>");
      },
    });
}

$(document).ready(() => {
  getBackground();
  getQuote();
  $(".button--generate").click(function () {
    location.reload(); //reloads the page for a new tweet/background
  });
});
