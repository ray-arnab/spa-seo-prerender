spaModule.controller('myTripsController', function($scope, myTripsService) {
		// create a message to display in our view
		$scope.message = 'Demonstrates muliple and named views within "My Trips"';

    	// Trips
		myTripsService.async('dummyUserId').then(function() {
        	$scope.trips = myTripsService.getTrips();
      	});

    $scope.$parent.seo = { 
        pageTitle : 'My Trips', 
        pageDescription: 'Manage your trips' 
   	};

});



spaModule.controller('myTripsDetailController', function($scope, $state, $stateParams, myTripsService) {

    	myTripsService.async('dummyUserId').then(function() {
        	$scope.trip = myTripsService.getTrip($stateParams.id);
      	});

});