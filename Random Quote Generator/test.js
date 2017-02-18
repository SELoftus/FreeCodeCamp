//This is the working code as of 6/1/17

//Call the URL for quotes - forismatic in this case
var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
//Create a function to get the data you want from the API
var getQuote = function(data) {
  //variable to retrive the quote & author name
  $(".quote-text").text(data.quoteText);
  var quot = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + data.quoteText + ' - ' + data.quoteAuthor;
  //have author name display as Unknown if there isn't an author name available
  if (data.quoteAuthor === '') {
    data.quoteAuthor = 'Unknown';
  }
  $("#author-name").text(' - ' + data.quoteAuthor);
  //Tweet the current quote
  $("#tweet-quote").attr("href", quot, 'https://twitter.com/intent/tweet?hashtags=quotes');
};
$(document).ready(function() {
  $.getJSON(url, getQuote, 'jsonp');

});
$("#newQuote").click(function() {
  $.getJSON(url, getQuote, 'jsonp');
});