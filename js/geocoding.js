/**
 * @author schomax
 * 
 * This Class makes use of the Google Maps JavaScript V3 API
 * 
 */

var geocoder;
var map;
var mapOptions;

//directions
var directionsService; 
var directionsDisplay;


//Init Map, Address-geocoding, Coordinate-geocoding, Routing

/*
 * Initializes Google-Map, Geocoder, Autocomplete-Places
 */
function initialize() {
	
	//directions Service
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	
	//get Geocoder for Coordinate-geocoding
	geocoder = new google.maps.Geocoder();
	
	// Autocomplete by Address-geocoding
	var options = {
		//bounds: latlon area
		types: ['geocode'], // return geocoding (address) results only
	  	// componentRestrictions: {country: 'at'} // return places from AT only
	};
    var input1 = document.getElementById('startaddress');
    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);    

    var input2 = document.getElementById('targetaddress');
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options); 

	//load map to validate results
    mapOptions = {
      center: new google.maps.LatLng(47.8,13.033333),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
        
    directionsDisplay.setMap(map); 
 
 }
 google.maps.event.addDomListener(window, 'load', initialize);


/*
 * Parses start and target address and requests route for specific vehicle
 * writes result time and distance to result-list
 * 
 */
function route(id){

  	var start = document.getElementById('startaddress').value;
    var target = document.getElementById('targetaddress').value;
    
    //check if empty
    if(start == '' || target == ''){
    	alert("No Address provided Inputfield");
		return;
    }

	//route for CAR, Bike, Walk, PT
	if(id==1){
	  var request = {
	    origin:start,
	    destination:target,
	    travelMode: google.maps.TravelMode.DRIVING
	  };
	 }else if(id==2){
	  var request = {
	    origin:start,
	    destination:target,
	    travelMode: google.maps.TravelMode.BICYCLING
	  };	 	
	 }else if(id==3){
	  var request = {
	    origin:start,
	    destination:target,
	    travelMode: google.maps.TravelMode.WALKING
	  };	 	
	 }	
	  else if(id==4){
	  var request = {
	    origin:start,
	    destination:target,
	    travelMode: google.maps.TravelMode.TRANSIT
	  };
	 }
 
 	  //request Google-Route
	  directionsService.route(request, function(result, status) {
	  	
	    if (status == google.maps.DirectionsStatus.OK) {
	    	
	    	//if route found parse time and distance and write to result-list
	    	if(id==1){
	    		$("#resultsCar").empty();
				$("#resultsCar").append("<li>Distance:" + result.routes[0].legs[0].distance.text + "</li> <li> Duration:"+ result.routes[0].legs[0].duration.text +" </li>");
		    	directionsDisplay.setDirections(result);
	    	}
	    	else if(id==2){
	    		$("#resultsBike").empty();
				$("#resultsBike").append("<li>Distance:" + result.routes[0].legs[0].distance.text + "</li> <li> Duration:"+ result.routes[0].legs[0].duration.text +" </li>");
		    	directionsDisplay.setDirections(result);
	    	}
	    	else if(id==3){
	    		$("#resultsWalk").empty();
				$("#resultsWalk").append("<li>Distance:" + result.routes[0].legs[0].distance.text + "</li> <li> Duration:"+ result.routes[0].legs[0].duration.text +" </li>");
		    	directionsDisplay.setDirections(result);
	    	}
	    	else if(id==4){
	    		$("#resultsPT").empty();
				$("#resultsPT").append("<li>Distance:" + result.routes[0].legs[0].distance.text + "</li> <li> Duration:"+ result.routes[0].legs[0].duration.text +" </li>");
		    	directionsDisplay.setDirections(result);
	    	}
	    	
	  	 }
	  	 //get Coordinates for Address
	  	 getCoordinates();
	  });	
}

  

/*
 * Address to Coordinate
 * 
 * parses Inputfields and requests coordinates for address
 * writes result (lat,lon) to Inputfields
 * 
 */ 	
function getCoordinates() {
	
	//parse Inputfield	
	var start = document.getElementById('startaddress').value;
	var stop = document.getElementById('targetaddress').value;

	if(start == '' || stop == ''){
		alert("No Address in Inputfield");
		return;
	}
	
	//get Coordinates for StartLocation
  	geocoder.geocode( { 'address': start}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result = results[0].geometry.location;
      
      //write to input-fields
      document.getElementById("lat1").value = result.lat();
	  document.getElementById("lng1").value = result.lng();      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
    
    //get Coordinates for StopLocation
    geocoder.geocode( { 'address': stop}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var result = results[0].geometry.location;

      //write to input-fields
      document.getElementById("lat2").value = result.lat();
      document.getElementById("lng2").value = result.lng();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

