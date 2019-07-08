//To override CORS:
//open -a Google\ Chrome --args --disable-web-security --user-data-dir

$( document ).ready(function() {

	$( ".result" ).html( "Let's get some data!" );

	$.get( "https://data.police.uk/api/crimes-street/anti-social-behaviour?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2017-01", 
	function( data ){

	  console.log( "Load was performed." );

	  $( ".result" ).html("");
	  $.each(data, function(i, item) {
		  $( ".result" ).append(
		  	"<p>id: " + data[i].id 
	    		+ ", latitude: " + data[i].location.latitude
	    		+ ", longitude: " + data[i].location.longitude 
	    		+ "</p>"
		  ); 
	  });

	  $.each(data, function(i, item) {
    	console.log( "id: " + data[i].id 
    		+ ", latitude: " + data[i].location.latitude
    		+ ", longitude: " + data[i].location.longitude
    		);
	  });
	
	})
    .fail(function(xhr, textStatus, errorThrown) {

      console.log( "Load was performed." );	

      $( ".result" ).html(xhr.responseText + "; " + xhr.textStatus); 

    });

});