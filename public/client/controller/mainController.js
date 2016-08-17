var easyDonations=angular.module('easyDonations');
easyDonations.controller('mainController',['$scope','$modal',function($scope,$modal){
    
    console.log("Inside mainController");

    $scope.loadLoginModal = function () {
        $modal.open({
            templateUrl: 'views/login.html',
            controller: 'authController',
            scope: $scope
        });
    };

    $scope.loadDonorSignUpModal = function () {
        $modal.open({
            templateUrl: 'views/donor_signup.html',
            controller: 'authController',
            scope: $scope
        });
    };

    $scope.loadOrphanageSignUpModal = function () {
        $modal.open({
            templateUrl: 'views/orphanage_signup.html',
            controller: 'authController',
            scope: $scope
        });
    };
}]);