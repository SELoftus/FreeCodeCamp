$(document).ready(function() {
   //when search is clicked run code
$('#search').click(function() {
    //get input field value
    var searchTerm = $('#searchTerm').val();
    //API url with search Term
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";
    //Wikipedia API ajax call
    $.ajax({
            //another way to get a JSON file
            type: "GET",
            url: url,
            async: false, //data thing that works when false
            dataType: "json",
            //returns the entries matching your search term
            success: function(data, textStatus, jqXHR) {
                $('#output').html(''); //clears previous search results
                for(var i = 0; i < data[1].length; i++) {
                    $('#output').prepend("<div><div class='btn-default'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>" );   //returns data as array & separates into list items
                }//end of for
                $("#searchTerm").val('');
                
            }, //close success function
            
            error: function(errorMessage) {
                alert("Error");
            }//close error function
        
    });//close ajax call
});   //close click function

$("#searchTerm").keypress(function(e) {
    if(e.which==13) {
        $("#search").click();
    }//close if
});//close keypress
});//close main function