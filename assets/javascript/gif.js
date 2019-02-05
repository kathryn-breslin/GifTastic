var topics = ["plants", "books", "San Francisco", 
                "running", "tacos", "husky", 
                "flowers", "art", "Spain", "hiking"];

function displayButtons () {
   
        var topic = $(this).attr('data-name');
        
        //my GIPHY key would not work..the one used below is from our activities
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG"

        //MY GIPHY below
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
                    var gifDiv = $('<div/>');
                    var rating = $('<p>').text('Rating: ' + topic[i].rating);
                    var title = $('<p>').text('Title: ' + topic[i].title);
                    var gifImage = $('<img/>');

                    gifImage.attr('data-state', 'still');
                    gifImage.attr('src', topic[i].images.fixed_height_still.url);
                    gifImage.attr('data-still', topic[i].images.fixed_height_still.url);

                    gifImage.attr('data-state', 'animate');
                    gifImage.attr('data-animate', topic[i].images.fixed_height.url);
                   // gifImage.attr('src', topic[i].images.fixed_height.url);
                    gifDiv.addClass('gifImage');
                    gifDiv.append(gifImage);
                    gifDiv.append(rating);
                    gifDiv.append(title);
            
                    $('#gif-view').prepend(gifDiv);

                    $('#gifReturn').css(
                    {
                        "background-color": "#F8F9FA",
                        "padding": "20px",
                        "margin": "40px"
                    });


                    $('#gif-view').on('click', '.gifImage', function() {
                        var state = $(this).attr('data-state');
            
                         if (state === 'still'){
                         var animatedGif = $(this).attr('data-animate');
                         $(this).attr('data-state', 'animate');
                         $(this).attr('src', animatedGif);
                          }
            
                         else   {
                         var stillGif = $(this).attr('data-still');
                         $(this).attr('data-state', 'still');
                         $(this).attr('src', stillGif);
                         }
                     }); 
                }
         });

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


