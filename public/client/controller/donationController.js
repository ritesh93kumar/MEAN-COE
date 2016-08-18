var easyDonations=angular.module('easyDonations');

easyDonations.controller('donationControl',['$scope', '$http', 'dataFactory', function($scope, $http, dataFactory){
    
   console.log("inside view donations controller");
    
    $scope.posts;
    $scope.donors;
    
    
     
    function getPosts() {
        dataFactory.getPosts()
        .then(function (response){
            $scope.posts = response.data;
            console.log(response);
        }, function (error) {
            console.log("Could not get data");
        });
    };
    getPosts();
  
    
}]);