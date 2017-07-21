
spaModule.controller('checkInController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Web checkin to avoid last minute queues';

    $scope.$parent.seo = { 
        pageTitle : 'Check In', 
        pageDescription: 'Web Check for faster and smoother experience at airport' 
   	};

});