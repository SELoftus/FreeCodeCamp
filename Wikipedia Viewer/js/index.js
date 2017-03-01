$(document).ready(function() {
   //when search is clicked run code
$('#search').click(function() {
    //get search input
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
            success: function(data) {
                //console.log(data[1][0]); //gets heading
                //console.log(data[2][0]); //description of 1st index of array
                //console.log(data[3][0]); //search term
                $('#output').html(''); //clears previous search results
                for(var i = 0; i < data[1].length; i++) {
                    $('#output').prepend("<li><a href="+data[3][i]+">"+data[1][i] + "</a><p>"+data[2][i]+"</p></li>"); //returns data as array & separates into list items
                }//end of for
                
            }, //close success function
            
            error: function(errorMessage) {
                alert("Error");
            }//close error function
        
    })//close API call
})   //close click function
});//close main function