var animals = ["Eagle", "Tiger","Lion","Leopard","Cheetah","Wolf","Hawk","Peacock","Antelope","Hyena","Python","Cobra","Elephant"];

function callGiphyAPI(animalVal) {
  var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
    animalVal + "&api_key=dc6zaTOxFJmzC&limit=12";

  $.ajax({
    url: queryUrl,
    method: "GET"

  }).then(function(response) {
    var apiResponse = response.data
    console.log(apiResponse);
    renderImages(apiResponse)

  })
}

function addToArray(animalName) {

  animals.push(animalName);
  console.log("Added Animal: " + animalName)
  console.log(animals);
  renderButtons();
}

function renderButtons() {
  $("#buttons").empty();
  for (var i = 0; i < animals.length; i++) {
    var btn = $("<button>");
    btn.addClass("animal-buttons btn btn-outline-secondary");
    btn.attr('data-item', animals[i]);
    btn.text(animals[i]);
    $("#buttons").append(btn);
  }
}

function renderImages(results) {

  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div class='images col col-lg-3'>");

    var rating = results[i].rating.toUpperCase();

    var p = $("<p>").text("Rating: " + rating);

    var animalImage = $("<img>");
    animalImage.attr("src", results[i].images.fixed_height_still.url);
    animalImage.addClass("animal-images gif");
    gifDiv.prepend(p);
    gifDiv.prepend(animalImage);

    $("#images").prepend(gifDiv);

  }
}

$(document).ready(function() {
  renderButtons();
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    var animalName = $("#animalName").val().trim();
    if(animalName.length>0){
      addToArray(animalName);
    }
   
    $("#animalName").val("");

  });
});
$('body').on("click", ".animal-buttons", function(event) {
  event.preventDefault();
  $("#images").empty();
  var animalVal = $(this).attr('data-item');
  console.log(animalVal);
  callGiphyAPI(animalVal);
});
$('body').on('click', '.gif', function() {
  var src = $(this).attr("src");
if($(this).hasClass('playing')){
   //stop
   $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
   $(this).removeClass('playing');
} else {
  //play
  $(this).addClass('playing');
  $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
}
});
