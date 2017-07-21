spaModule.controller('bookController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Demonstrates nested views within "Book"';

    $scope.$parent.seo = { 
        pageTitle : 'Book flight', 
        pageDescription: 'Cheapest fares to 150 destinations' 
   	}; 
});