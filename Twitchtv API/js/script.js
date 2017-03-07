//will need to add a class of 'active' to the current selector onclick
//will need to add class of 'hidden' to the appropriate rows when 'online' and 'offline' are selected

//run jQuery
$(document).ready(function() {
    //create empty array for follower names
    var following=[];
    //freeCodeCamp stream info/status API call
    var url="https://wind-bow.gomix.me/twitch-api/streams/freecodecamp";
    $.getJSON(url, function(data1){
        if(data1.stream === null) {
            $("#fccStatus").html("freeCodeCamp is Currently Offline");
        } else {
            $("#fccStatus").html("freeCodeCamp is Currently Online");
        }//end if/else
    });//close getJSON
    
    //get JSON call to channel info URL
    var followerURL="https://wind-bow.gomix.me/twitch-api/users/freecodecamp/follows/channels";
    $.getJSON(followerURL, function(data2) {
        //iterate through array & get follower display names
        for (var i=0; i < data2.follows.length; i++) {
            var displayName = data2.follows[i].channel.display_name;
            following.push(displayName);
        }//close for loop
         following.push('comster404');
         following.push('brunofin');
         following.push('ESL_SC2');
         
         //for loop to iterate through followers array
         for (var i=0; i < following.length; i++) {
             var url2="https://wind-bow.gomix.me/twitch-api/streams/' + following[i] +'/?callback=?";
             
             $.getJSON(url2).done(function(data3) {
                 var logo;
                 var status;
                 var name;
                 //returns error if user does not exist
                 if(data3.error) {
                     logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
                     
                     name = data3.message;
                     status = data3.error;
                     
                     $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a  href='https://wind-bow.gomix.me/twitch-api" +displayName+  +"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                     
                 }//close data3 error if
                 
                 if(data3.stream === null) {
                     $.getJSON(data3._links.channel), function(data5) {
                        status = "Offline";
                        logo = data5.logo;
                        name = data3.display_name;
                        if(logo === null) {
                            logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
                        }//end logo null if
                        $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a  href='https://wind-bow.gomix.me/twitch-api" +displayName+  +"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                     };//close data5 getJSON call
                 }
             });//close getJSON call in followers FOR loop
            
         }//close followers for loop
         
         //get users who are online
         for (var i=0; i < following.length; i++) {
             var onlineURL = "https://wind-bow.gomix.me/twitch-api/streams/" + following[i];
            $.getJSON(url, function(data4) {
                var logo = data4.stream.channel.logo;
                    if(logo === null) {
                            logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
                        }//end logo null if
                 var status = data4.stream.channel.status;
                 
                 var name =  data4.stream.channel.display_name;
                 $("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a  href='https://wind-bow.gomix.me/twitch-api" +displayName+  +"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                
            });// close users online for loop
         }
    }); //close 2nd getJSON/followerURL
    
   });//close document.ready