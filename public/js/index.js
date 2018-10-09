// ============================================================================================================
// SCRAPPING 
// ============================================================================================================
$(document).ready(function () {

    // Grab the articles as a json when page loads, append to the page
    $.getJSON("/articles", function (data) {
        console.log("\nAbout to append articles to the home page!--------------------------");
        for (var i = 0; i < 10; i++) {
            // Display the information on the page
            $("#articleSection").prepend(
                "<div class='resultDiv bg-info m-1 rounded'><p class='resultText'><strong>Title:</strong> " +
                data[i].title + "<br> <strong>Link: </strong> <a>blogto.com" + data[i].link + 
                "</a></p><button class = 'saveArticleBtn btn btn-primary' data-id='" +
                data[i]._id + "'><span class='icon'><i class='fa fa-bookmark'></i></span>Save Article</button></div>");
        }
    });

    // Save article button changes the saved property of the article model from false to true
    $(document).on("click", ".saveArticleBtn", function () {
        // change icon to check mark
        $(this).children("span.icon").children("i.fa-bookmark").removeClass("fa-bookmark").addClass("fa-check-circle");
        // Get article id
        var articleID = $(this).attr("data-id");
        console.log(`Article ID: ${articleID}`);
        // Run a POST request to update the article to be saved
        $.ajax({
            method: "POST",
            url: "/save/" + articleID,
            data: {
                saved: true
            }

        }).done(function (data) {
            // CHECK IF ARTICLE IS SAVED
            console.log(`Data: ${this.data}`); 
        });
    });
});


// ============================================================================================================
// SAVED ARTICLES 
// ============================================================================================================

// SAVE OBJECTS AND CHANGE ICON TO INDICATE SAVE 
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // CHECK IF ARTICLE IS SAVED
        if (data[i].saved === true) {

            // DISPLAY INFORMATION AND CREATE NOTES AND REMOVE BTN ON SAVED PAGE
            $("#savedResults").append(
                "<div class='savedDiv m-1 rounded'><p class='savedText'><strong>Title: </strong> " + data[i].title + "<br> <strong>Link: </strong> blogto.com"+ data[i].link +
                "</p><a class='unsaveBtn btn btn-danger' data-id='" + data[i]._id + "'>Remove</a><a class='notesBtn btn btn-info' data-toggle='modal' data-target='#notesModal' data-id='" + data[i]._id +
                "'>Notes</a></div>");
        }
    }
});

// OPEN MODAL AND DISPLAY NOTES -- continue working on
// ===================================================
$(document).on("click", ".notesBtn", function() {
    // Empty the notes from the note section
    console.log("Notes button has been clicked!"); 
    
    // Save the id from the button tag
    var articleID = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + articleID
    })
      // With that done, add the note information to the page
      .done(function(data) {
        console.log("Data After Clicking the Notes Button:", data);

        // MODAL SHOULD OPEN HERE!
        $("#notes").append("<p id='noteField'></p>");
        if (data.notes) {
          $("#noteField").append("<ul id='notelist'>");
            for (var i = 0; i < data.notes.length; i++) {
              $('#notelist').append("<li id='" + data.notes[i]._id + "'>" + data.notes[i].body + " " +
              "<button data-id='" + data.notes[i]._id +
              "' id='deletenote'>X</button></li>");
            }
          $('#noteField').append("</ul>");
        } else {
          $('#noteField').text("There aren't any notes yet.");
        }
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      });
  });


// SAVING NOTES
// ===================================================
// When you click the savenote button
$(document).on("click", "#saveNote", function() {
    // Grab the id associated with the article from the submit button
    var articleID = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + articleID,
      data: {
        // Value taken from note textarea
        body: $("#noteField").val()
      }
    }).done(function(data) {
        console.log(`WE  HAVE DATA: ${data}`)

      });
    // REMOVE TEXT AREA OF NOTES
    // $("#bodyinput").val("");
  });


// REMOVING SAVED ARTICLES -- needs work; only deleted on refresh
// ===================================================
$(document).on("click", ".unsaveBtn", function () {
    // Get article id
    var articleID = $(this).attr("data-id");
    console.log(`ArticleID to be Deleted: ${articleID}`);
    // Run a POST request to update the article to be saved
    $.ajax({
        method: "POST",
        url: "/unsave/" + articleID,
        data: {
            saved: false
        }
    }).done(function(data){
        console.log(`ArticleID Removed: ${data}`); 
        $(data).remove(); 
    });
});


// DELETING NOTES
// ============================
// $(document).on("click", ".deleteNote", function () {

// });