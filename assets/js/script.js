//To override CORS:
//open -a Google\ Chrome --args --disable-web-security --user-data-dir

$( document ).ready(function() {

	var bottom_lat = 51.45;
	var top_lat = 51.51;
	var left_long = -0.15;
	var right_long = 0.02;

	var mymap = L.map('mapid').setView([(bottom_lat+top_lat)/2, (left_long+right_long)/2], 12);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapbox_access_token, {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: mapbox_access_token
	}).addTo(mymap);

	var polygon = L.polygon([
	    [bottom_lat, left_long ],
	    [bottom_lat, right_long],
	    [top_lat, right_long],
	    [top_lat, left_long]
	], {
	    color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.1
	}).addTo(mymap);

	$( ".result" ).html( "Let's get some data!" ); 

	$.get( "https://data.police.uk/api/crimes-street/anti-social-behaviour?poly="
		+ bottom_lat
		+ "," 
		+ left_long
		+ ":"
		+ bottom_lat
		+ "," 
		+ right_long 
		+":"
		+ top_lat
		+ ","
		+ right_long 
		+ ":"
		+ top_lat
		+ ","
		+ left_long
		+ "&date=2017-01", 
	function( data ){

	  console.log( "Load was performed." );

	  $( ".result" ).html("");
	  var j = 0;
	  $.each(data, function(i, item) {
	  	  //var marker = L.marker([data[i].location.latitude, data[i].location.longitude]).addTo(mymap);

		  $( ".result" ).append(
		  	"<p>id: " + data[i].id 
	    		+ ", latitude: " + data[i].location.latitude
	    		+ ", longitude: " + data[i].location.longitude 
	    		+ "</p>"
		  ); 
    	  j = i;
	  }); 
	  
	  /*$.each(data, function(i, item) {
    	console.log( "id: " + data[i].id 
    		+ ", latitude: " + data[i].location.latitude
    		+ ", longitude: " + data[i].location.longitude
    		); 
	  });*/
	  console.log("Count: " +j)
	
	})
    .fail(function(xhr, textStatus, errorThrown) {

      console.log( "Load was performed." );	

      $( ".result" ).html(xhr.responseText + "; " + xhr.textStatus); 

    });

});