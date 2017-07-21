
spaModule.factory('routingService', ['$location', function($location) {

	var service = {};
	
	service.goToBook = function() {
		$location.path('book');
	};
	
	service.goToCheckIn = function() {
		$location.path('checkIn');
	};

	service.goToMyTrips = function() {
		$location.path('myTrips');
	};
	
	return service;
	
}]);