"use strict"

$(document).ready(function() {
  
  console.log("Page loaded!");  
  prepareForm();
  
});

// Prepares the search form
function prepareForm() {
  
  $("#search-btn").click(function() {
    search();
  });
  
  $("#query").keypress(function(event) {
    if (event.keyCode === 13) {
      search();
    }
  });
}

// Takes the input value and searches Spotify
function search() {
  var query = $("#query").val();
  console.log("Searching " + query);
  searchSpotify(query);        
}

// Searches artists on spotify using the query
function searchSpotify(query) {
  
  $("#results").html("Searching...");
  
  var url =
      "https://api.spotify.com/v1/search?type=artist&q=" + query;

  $.ajax({
    url: url
  }).done(function(data) {
    var artists = data.artists.items;
    showResults(artists);
  });
}

// Display the artists in the html
function showResults(artists) {
  
  var template = $("#artist-row").html();
  var results = $("#results");
  
  results.empty();
  
  for (var i=0; i < artists.length; i++) {
    
    var artist = artists[i];

    var templateData = buildTemplateData(artist);
    
    var artistRow = Mustache.render(template, templateData);
    results.append(artistRow);
  }
}

function buildTemplateData(artist) {
  
  var imageUrl;

  if (artist.images.length > 0) {
    imageUrl = artist.images[0].url;
  } else {
    imageUrl = "spotify.png";
  }

  var name = artist.name;
  if (name.length > 30) {
    name = name.substr(0, 30) + "...";
  }

  var templateData = {
    name: name,
    imageUrl: imageUrl,
    followers: artist.followers.total
  };
  
  return templateData;
}