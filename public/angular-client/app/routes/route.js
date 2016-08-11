var myApp=angular.module('EasyDonations');
myApp.config(function($routeProvider){
    .when('/',{
        controller:'controllers/loginController',
        templateUrl:'index.html';
    });
});