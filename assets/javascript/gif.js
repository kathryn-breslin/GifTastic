var topics = ["plants", "books", "San Francisco",
    "running", "tacos", "husky",
    "flowers", "art", "Spain", "hiking"];

function displayButtons() {
    for (var i = 0; i < topics.length; i++) {
        // console.log(topics[i]);
        var newButton = $('<button>');
        newButton.addClass('btn btn-light');
        newButton.addClass('topic');
        newButton.attr('data-name', topics[i]);
        newButton.text(topics[i]);
        $('#buttons-view').append(newButton);
    }
    $('#add-topic').on('click', function () {
        event.preventDefault();
        addButtons();
    })
}

function addButtons() {
    var topic = $('#search-input').val().trim();
    topics.push(topic);
    // console.log(topic);
    $("#buttons-view").empty();
    $("#search-input").val("");
    displayButtons();
}

function findGifs() {
    var topic = $(this).attr('data-name');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10&rating=PG"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);

        topic = response.data;
        // console.log(topic);
        for (var i = 0; i < topic.length; i++) {
            newDiv = $('<div>');
            newDiv.addClass('individual-gif-container');
            newDiv.addClass('card');

            var newGifImage = $("<img src = '" + topic[i].images.fixed_height_still.url + " '>");
            newGifImage.addClass('gif-image', 'card-image-top');
            newGifImage.attr("state", "still");
            newGifImage.attr("still-data", topic[i].images.fixed_height_still.url);
            newGifImage.attr("animated-data", topic[i].images.fixed_height.url);

            newDivContents = $('<div>');
            newDivContents.addClass('card-body');

            newDivContentsPara = $('<p>')
            newDivContentsPara.addClass('card-text');
            newDivContentsPara.append("<p>Title: " + topic[i].title + "</p>");
            newDivContentsPara.append("<p>Rating: " + topic[i].rating + "</p>");

            newDiv.append(newGifImage);
            newDiv.append(newDivContentsPara);
            newDiv.append(newDivContents);

            $('#gif-view').append(newDiv);

            $('#gifReturn').css(
                {
                    "background-color": "#F8F9FA",
                    "padding": "20px",
                    "margin": "40px"
                });
        }

        $('.gif-image').on('click', function () {

            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            }
            else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"))
            }
        })
    })
}
$(document).on('click', '.topic', findGifs);
addButtons();



