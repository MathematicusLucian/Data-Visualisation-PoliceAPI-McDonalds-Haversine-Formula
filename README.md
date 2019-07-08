# McYobbo
Using Police API and McDonald's store location data, to see if level of anti-social "yobbo" crime is higher in the vicinity of a MackyD venue

### Police API
Polygon set for the crime data request to Police API: that is South London, i.e. Lambeth, Peckham, Greenwich.   
<code>
$.get( "https://data.police.uk/api/crimes-street/anti-social-behaviour?poly=" + bottom_lat + "," + left_long + ":" + bottom_lat + "," + right_long +":" + top_lat + "," + right_long + ":" + top_lat + "," + left_long + "&date=2017-01", .........
</code>

### Extracting McDonalds' store data
From this url https://www.mcdonalds.com/gb/en-gb/restaurant-locator.html, I extracted details of all stores within 5 miles of Peckham, which falls within the centre of the polygon I set for the crime data request.  
<code>  
$('#rl-listView .restaurant-location__address-container').each(function(){  
    console.log("'"+ $(this).find('.restaurant-location__title').html() + "','" + $(this).find('.restaurant-location__address').html().replace('<b>','').replace('</b>','').replace('<br>',', ') + "'");  
});  
</code>  

Stores extracted:
<code>
'Peckham','72/76 RYE LANE, PECKHAM, SE15 5DQ'
'Old Kent Road Dt','518 OLD KENT ROAD RETAIL PARK, PECKHAM, SE1 5BA'
'Camberwell','BUTTERFLY WALK, CAMBERWELL GREEN, SE5 8RW'
'Deptford','BESTWOOD RETAIL PARK, DEPTFORD, SE8 5DQ'
'Walworth Rd','198/200 WALWORTH ROAD, SOUTHWARK, SE17 1JJ'
'Brixton','518/522 BRIXTON ROAD, BRIXTON, SW9 8EN'
'Lewisham','166/172 LEWISHAM HIGH STREET, LEWISHAM, SE13 6JL'
'LONDON BRIDGE','TOOLEY STREET, , SE1 2TF'
'Greenwich-Cutty Sark','2 CRESCENT ARCADE, GREENWICH, SE10 9EJ'
'Highway Shadwell','102/106 THE HIGHWAY WESTBOUND, SHADWELL, E1W 2BX'
'Catford 2','CATFORD ISLAND, CATFORD, SE6 2DD'
'Waterloo Station','UNIT 43 THE COLONNADE, LAMBETH, SE1 8SF'
'Clapham','130/134 CLAPHAM HIGH STREET, CLAPHAM, SW4 7UH'
'Wandsworth Road','368/370 WANDSWORTH ROAD, CLAPHAM, SW8 4ET'
'Streatham Place','2/22 STREATHAM PLACE, STREATHAM, SW2 4PZ'
'Sydenham','BELL GREEN RETAIL PARK, SYDENHAM, SE26 4PU'
'Commercial Road','201/217 COMMERCIAL ROAD, TOWER HAMLETS, E1 2BT'
'St Pauls','1A LUDGATE HILL, CITY OF LONDON, EC4M 7AA'
'Liverpool Street','UNIT 25 THE CONCOURSE, CITY OF LONDON, EC2M 7PY'
'Fleet Street','152/153 FLEET STREET, CITY OF LONDON, EC4A 2DQ'
'Whitehall','45/47 WHITEHALL, WESTMINSTER, SW1A 2BX'
'Strand','34/35 STRAND, WESTMINSTER, WC2N 5HY'
'Victoria','155 VICTORIA STREET, WESTMINSTER, SW1E 5NA'
</code>

### Output  
![preview](./assets/img/output.png)  

### ASBO map   
![preview](./assets/img/mapasbo.png)   
