var easyDonations=angular.module('easyDonations');

easyDonations.config(function($routeProvider){
	$routeProvider
    
//        .when('/', {
//			templateUrl: 'index.html',
//			controller: 'mainController'
//		})
		//the login display
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'authController'
		})
		//the donor signup display
		.when('/donorsignup', {
			templateUrl: 'views/donor_signup.html',
			controller: 'signupController'
		})
		//the orphanage signupdisplay
		.when('/orphanagesignup', {
			templateUrl: 'views/orphanage_signup.html',
			controller: 'signupController'
		})
        .when('/viewdonation',{
            templateUrl : 'views/donationpage.html',
            controller : 'donationController'
        })
		.when('/donate', {
			templateUrl : 'views/post_items.html',
			controller : 'donationController'
		})
       
});