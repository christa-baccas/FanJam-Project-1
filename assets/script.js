var artist = '';
var title = '';
var searchHistory = [];


$('#formContainer').on("click", '#rockOnBtn', function(event) {
    event.preventDefault();
    
    // take input value 
    artist = $(".artistInput").val();
    title = $(".titleInput").val();

    searchHistory.push(title);

    // convert object to JSON string
    const jsonSongArr = JSON.stringify(searchHistory);

    // save to local storage
    localStorage.setItem("title", jsonSongArr);
    
    lyricsApi();
    attractions(artist);
});


function lyricsApi() {
  console.log("Starting lyrics functions.");
  var lyricsUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    
    fetch(lyricsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          //append lyrics to maybe p tags in the first column
          getHistory();
      });
      console.log("Ending lyrics functions.");
  }

function getHistory(){
    console.log("Starting getHistory");
    var searchHistoryDiv = $("#historyBtns");
    searchHistoryDiv.html("");

    if(localStorage.getItem("title")) {
        // get string from local storage
        searchHistory = JSON.parse(localStorage.getItem("title"));
        console.log(searchHistory);

        
        // for loop to create buttons of history of songs searches
        for (var i = 0; i < searchHistory.length; i++) {
            var newBtns = $("<button class='btn btn-primary' type='button'>Search</button>")
            console.log(newBtns);
            newBtns.text(searchHistory[i]);
            searchHistoryDiv.append(newBtns);
           
            newBtns.click(function(event) {
                event.preventDefault();
                var searchedTitle = $(event.target);
                var prevTitle = searchedTitle.text();
                console.log(prevTitle);
                lyricsApi(prevTitle);
                attractions(prevTitle);
            })
        }
    }
    console.log('Ending getHistory');
}

function matchArtist(artist){

}

function attractions() {
  console.log('Starting attractions');  
  var attractionsURL = `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${artist}&apikey=2AXpKaz2osoCIVl9Uly7i4JgRllUmxfL`;
    fetch(attractionsURL)
        .then(function (response) {
            return response.json();
        })
        .then (function(data) {
            console.log(data);
            matchArtist(data._embedded.attractions);
        // capitalize all letters from input
        // if (data.attractions[].name.toUpperCase() === artist.toUpperCase && data.attractions.upcomingEvents._total > 0) {
            // make all the variables for the buttons(if statement for if the artist has a link to their fb, youtube, etc)
            // prepend photo to lyrics side of columns
            // append social media buttons
            // call events function
            events(artist);
            // else{
                // append the "this artist has no upcoming events" to html}
        
        // })
  })
  console.log('Ending attractions');
}

function events(artist) {
    console.log('Starting events');
    var eventsURL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${artist}&apikey=2AXpKaz2osoCIVl9Uly7i4JgRllUmxfL`
    fetch(eventsURL)
      .then(function (response) {
        return response.json();
      })
      .then (function(data) {
          console.log(data);
          console.log(data._embedded.events[0].name);
          //var concertsDiv = //div
          //concertsDiv.html("");
          for (var i=0; i < data._embedded.events.length; i++) {
              if (data._embedded.events[i].name.toUpperCase() === artist.toUpperCase()) {
                  var concertURL = data._embedded.events[i].url;
                  //console.log(concertURL);
                  var concertBtns = $("<button class='btn btn-primary' id='concert' type='button'></button>")
                  var concertLink = $("<a class=concertLink></a>");
                  concertLink.attr("href", concertURL);
                  // concertLink.text(artist + [i]);
                  //console.log(concertLink);
                  $("#concerts").append(concertBtns);
                  concertBtns.append(concertLink);
                    //just to test in temp div
              }       
            //else {
                // append the "this artist has no upcoming events" to html}
            }
      })
      console.log('Ending Event');
}

// function for "search new artist" button at the bottom of both columns that scrolls user back to the top of the page
// clear html inner.HTML("")
// append buttons to the bottom of the lyrics with title of the song. Create an array in local storage to do this
