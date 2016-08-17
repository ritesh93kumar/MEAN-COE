var easyDonations=angular.module('easyDonations');
easyDonations.controller('mainController',['$scope','$modal','$http',function($scope,$modal,$http){
    
    console.log("Inside mainController");
    $scope.statistics;
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
    
    $http.get('/api/statistics')
        .success(function(data) {
            $scope.statistics = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   
}]);