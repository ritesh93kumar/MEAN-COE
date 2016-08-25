var easyDonations=angular.module('easyDonations');

easyDonations.controller('claimsController', function($scope, $http, $sessionStorage){
    
    console.log('claims contlr');
    
    $scope.orphanageDetails = [];
    
    $scope.claims; 
    
    $scope.postId = '';
    
    console.log( $scope.orphanageDetails[0]);
    
    function getDetails(){
        angular.forEach($scope.claims, function(value, key){
          $http.get('/api/orphanages/' + value).then(function(response){
              
              var orphanage = {};
              
              orphanage = response.data;
              //orphanage.no_of_people = response.data.no_of_people;
              
              $scope.orphanageDetails.push(orphanage);
              
              console.log($scope.orphanageDetails);
              
          });
       });
    };
    
    $scope.getClaims = function(){
        $http.get('/api/posts/' + $scope.postId).then(function(response) {
            $scope.claims = response.data.claims;
            console.log(response.data.claims);
            getDetails();
        });        
    };
    
});