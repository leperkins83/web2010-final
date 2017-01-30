$(document).ready(function() {

    function getArticles(searchTerm) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + searchTerm,
            dataType: "jsonp",
            method: 'get'
        }).done(function(response) {
            console.log(response);
            // use the articleMaker function here and then
            // append each article to the DOM using jquery's .append() method
            for(var i = 0; i < response.query.search.length; i++) {
                    var title = response.query.search[i].title;
                    var snippet = response.query.search[i].snippet;
                    var article = articleMaker(title, snippet);
                    $('#articlesContainer').append(article) //append turns a string into html
                }
        });
    }

    function articleMaker(title, snippet) {
        var article = '';
        article += '<a target="_blank" rel+"noopener" href="https://en.wikipedia.org/wiki/' + title + '">';
        article += '<div class="article">';
        article += '<h3>' + title + '</h3>';
        article += '<p>' + snippet + '</p>';
        article += '</div>';
        article += '</a>';

        // IMPORTANT: make sure each article can be clicked on and takes you to the
        // wikipedia page of that article. Hint: use an anchor element.

        return article;
    }

    // When click on "search" button, run the getArticles function and pass in
    // the value of the search box as the "searchTerm" parameter to the getArticles function
    $('#searchButton').click(function() {
        $('#articlesContainer').html('');
        var searchTerm = $('#searchBox').val();
        getArticles(searchTerm);
    });

    // Extra Credit: do the same thing as clicking on the "search" button, but when the user hits the "enter" key
    $("#searchBox").on("keypress", function(event) {
        if(event.keyCode === 13) {
          var searchTerm = $('#searchBox').val();
          getArticles(searchTerm);
      }
    });

});
