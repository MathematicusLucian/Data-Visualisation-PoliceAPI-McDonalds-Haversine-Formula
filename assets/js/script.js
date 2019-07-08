//To override CORS:
//open -a Google\ Chrome --args --disable-web-security --user-data-dir

$( document ).ready(function() {

	var mymap = L.map('mapid').setView([51.275, 0.35], 13);

	$( ".result" ).html( "Let's get some data!" );

	$.get( "https://data.police.uk/api/crimes-street/anti-social-behaviour?poly=51.275,0.35:51.6,-0.35:51.275,-0.35:51.6,0.35&date=2017-01", 
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

	  var j = 0;
	  $.each(data, function(i, item) {
    	console.log( "id: " + data[i].id 
    		+ ", latitude: " + data[i].location.latitude
    		+ ", longitude: " + data[i].location.longitude
    		);
    	j = i;
	  });
	  console.log("Count: " +j)
	
	})
    .fail(function(xhr, textStatus, errorThrown) {

      console.log( "Load was performed." );	

      $( ".result" ).html(xhr.responseText + "; " + xhr.textStatus); 

    });

});