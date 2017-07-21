spaModule.factory('myTripsService', function($http, $q){
    var path = "data/trips.json";

    var trips = [];
    var deffered = $q.defer();
    var myTripsService = {};


    myTripsService.async = function(userId) {

    	$http.get(path).success(function (data) {
            trips = [];
          	data.forEach(function (trip) {
                trips.push(trip);
            });
      		deffered.resolve();
    	});
    	return deffered.promise;
  	};

    myTripsService.getTrips = function() { 
        return trips; 
    };

    myTripsService.getTrip = function(tripId) { 
        for (var i = 0; i < trips.length; i++) {
            if (trips[i].id === tripId) {
                return trips[i];
            }
        }
        return []; 
    };

    return myTripsService;

});