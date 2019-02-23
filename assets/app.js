var apiKey = "yIApEjOmw3kwfJNeLCE9L0JVGVoCuJMW";

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=";
var articleCounter = 0;

function runQuery(numArticles, queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(NYTData) {
    console.log(NYTData);
    for (var i = 0; i < numArticles; i++) {
      articleCounter++;
      var section = $("<div>");
      section.addClass("well");
      section.attr("id", "article-well-" + articleCounter);
      $("#section").append(section);
      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );
      }
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
      }
      $("#articleWell-" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleWell-" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleWell-" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );
    }
  });
}

$("#run-search").on("click", function(event) {
  event.preventDefault();
  articleCounter = 0;
  $("#section").empty();
  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + searchTerm;
  var numResults = $("#num-records-select").val();
  var startYear = $("#start-year").val().trim();
  var endYear = $("#end-year").val().trim();
  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }
  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }
  runQuery(numResults, queryURL);
});

$("#clear-all").on("click", function() {
  articleCounter = 0;
  $("#section").empty();
});