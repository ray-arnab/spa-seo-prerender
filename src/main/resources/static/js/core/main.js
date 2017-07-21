var TEMPLATE_PATH_PREFIX = "views/";

var spaModule = angular.module('companySPA', ['ui.router']);

spaModule.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/book');

    $stateProvider

    	// Book states and views
        .state('book', {
            url: '/book',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book.html',
            controller: 'bookController'
        })
    	.state('book.plan', {
            url: '/plan',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book-plan.html'
        })
    	.state('book.select', {
            url: '/select',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book-select.html'
        })
    	.state('book.travelers', {
            url: '/travelers',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book-travelers.html'
        })
    	.state('book.payment', {
            url: '/payment',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book-payment.html'
        })
    	.state('book.confirmation', {
            url: '/confirmation',
            templateUrl: TEMPLATE_PATH_PREFIX + 'book-confirmation.html'
        })

		// Check IN states and views
        .state('checkIn', {
            url: '/checkIn',
            templateUrl: TEMPLATE_PATH_PREFIX + 'checkIn.html',
                    controller: 'checkInController'
        })


    	// My Trips states and views
    	.state('myTrips', {
            url: '/myTrips',
            views: {

                '': { 
                	templateUrl: TEMPLATE_PATH_PREFIX + 'myTrips.html',
                    controller: 'myTripsController'
                },

                'list@myTrips': { 
                    templateUrl: TEMPLATE_PATH_PREFIX + 'myTrips-list.html'
                }  
            }

        })

		.state('myTrips.detail', {
            url: '/:id',
            views: {
                'detail@myTrips': { 
                    templateUrl: TEMPLATE_PATH_PREFIX + 'myTrips-detail.html',
                    controller: 'myTripsDetailController'
                }    
            }

        })
    	;


        //$locationProvider.html5Mode(true);
    	$locationProvider.hashPrefix("!");
});

