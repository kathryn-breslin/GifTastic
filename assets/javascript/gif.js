var topics = ["plants", "books", "San Francisco", 
                "running", "tacos", "husky", 
                "flowers", "art", "Spain", "hiking"];

function displayButtons () {
   
        var topic = $(this).attr('data-name');
        
        //my GIPHY key would not work..the one used below is from our activities
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG"

        //MY GIPHY blow
        // var queryURL = "https://api.giphy.com/v1/gifs/search?" + topic + "api_key=HfzaLobXPlhuhwVrZxOCHvuJTyKDpo5m&q=topic&limit=10&offset=0&rating=PG&lang=en";
        // console.log("https://api.giphy.com/v1/gifs/search?" + topic + "api_key=HfzaLobXPlhuhwVrZxOCHvuJTyKDpo5m&q=topic&limit=10&offset=0&rating=PG&lang=en");
       
       
        $.ajax({
            url: queryURL,
            method: "GET",
           
        }).then(function(response) {
            console.log(response);

            $('.topic').on('click', function() {

                event.preventDefault();
                
                topic = response.data;
                for (var i = 0; i < topic.length; i++) {
                    var gifDiv = $('<div>');
                    var p = $('<p>').text('Rating: ' + topic[i].rating);
                    var gifImage = $('<img>');
                    gifImage.attr('src', topic[i].images.fixed_height.url);
                    gifDiv.addClass('gifImage');
                    gifDiv.append(gifImage);
                    gifDiv.append(p);
            
                    $('#gif-view').prepend(gifDiv);
                }
            });
//each button needs to be double clicked in order for the collection of gifs to appear
    });
}

function createButtons() {
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        button.addClass('topic');
        button.attr('data-name', topics[i]);
        button.text(topics[i]);
        $('#buttons-view').append(button);
    }

    $('#add-topic').on('click', function(event) {
        event.preventDefault();
    
        var topic = $('#search-input').val().trim();
        topics.push(topic);
        createButtons();
    });

}

$(document).on('click', '.topic', displayButtons);

createButtons();
