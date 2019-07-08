//To override CORS:
//open -a Google\ Chrome --args --disable-web-security --user-data-dir

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function getDistanceHaversine(lat1,lon1,lat2,lon2) {

	var R = 6371e3; // metres
	var Phi1 = Math.radians(lat1);
	var Phi2 = Math.radians(lat2);
	var DeltaPhi = Math.radians(lat2-lat1);
	var DeltaLambda = Math.radians(lon2-lon1);

	var a = Math.sin(DeltaPhi/2) * Math.sin(DeltaPhi/2) +
	        Math.cos(Phi1) * Math.cos(Phi2) *
	        Math.sin(DeltaLambda/2) * Math.sin(DeltaLambda/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	return d;

}

$( document ).ready(function() {

	var macky_stores = [ 
		[51.47040,-0.06910],  
		[51.48439,-0.06843], 
		[51.47316,-0.09259], 
		[51.48966,-0.04256], 
		[51.48987,-0.09716], 
		[51.46160,-0.11597], 
		[51.46043,-0.01140], 
		[51.50474,-0.08391], 
		[51.48161,-0.01071], 
		[51.50914,-0.06167], 
		[51.44454,-0.01795], 
		[51.50315,-0.11192], 
		[51.46295,-0.13571], 
		[51.47421,-0.13299], 
		[51.44613,-0.12619], 
		[51.42986,-0.03394], 
		[51.51482,-0.05888], 
		[51.51367,-0.10114], 
		[51.51849,-0.08220], 
		[51.51435,-0.10784], 
		[51.50642,-0.12689], 
		[51.50877,-0.12445], 
		[51.49645,-0.14107]
	];

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

	$( ".result" ).html( "<h3>Please wait - getting you some data!</h3><hr>" ); 

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
    		+ "</p>"
    		+ "<p>"
    		+ "latitude: " + data[i].location.latitude
    		+ ", longitude: " + data[i].location.longitude 
    		+ "</p>"
		  ); 

		  console.log( "id: " + data[i].id 
    		+ ", latitude: " + data[i].location.latitude
    		+ ", longitude: " + data[i].location.longitude
    	  ); 

	  	  var shortest_distance = 0;

		  for(var k = 0; k < macky_stores.length; k++) {

		  	var this_distance = getDistanceHaversine(data[i].location.latitude,data[i].location.longitude,macky_stores[k][0],macky_stores[k][1]);

		  	$( ".result" ).append(
			  	"<p>"
	    		+ k + ": " + this_distance + "m"
	    		+ "</p>"
			  ); 

		  	if((k == 0)||(this_distance < shortest_distance)){
		  		shortest_distance = this_distance;
		  	}

		  }

		  $( ".result" ).append(
		  	"<p>"
    		+ "McDonalds: " + shortest_distance + "m"
    		+ "</p><hr>"
		  ); 

		  console.log(shortest_distance);
		  console.log(" ");

    	  j = i; 
	  });  

	  console.log("Count: " +j)
	
	})
    .fail(function(xhr, textStatus, errorThrown) {

      console.log( "Load was performed." );	

      $( ".result" ).html(xhr.responseText + "; " + xhr.textStatus); 

    });

});