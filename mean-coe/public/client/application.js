var easyDonations=angular.module('easyDonations',['ngRoute','ngResource']).run(function($rootScope,$http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
        console.log("Signout");
        $http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
	};
});;