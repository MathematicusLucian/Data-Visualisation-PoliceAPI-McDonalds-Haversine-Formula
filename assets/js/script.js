//To override CORS:
//open -a Google\ Chrome --args --disable-web-security --user-data-dir

$( document ).ready(function() {

	var mymap = L.map('mapid').setView([51.275, 0.35], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapbox_access_token, {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: mapbox_access_token
	}).addTo(mymap);

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