var easyDonations=angular.module('easyDonations');
easyDonations.controller('signupController',['$scope','$http','$sessionStorage','$rootScope','$location',function($scope,$http,$sessionStorage,$rootScope,$location){

  $scope.isSame = function(password,confirmPassword){  

        
       if(password != confirmPassword){    
            $scope.showButtonOrphanage=true;           
            return false;
        }
        else{
            $scope.showButtonOrphanage=false;            
            return true;
        }
    };
    
   
    
    $scope.registerDonor = function(){
        console.log("inside register");
        
        $http.post('/auth/donorSignup', $scope.donorSignupInfo).success(function(data){
            if(data.state == 'success'){
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;

                $sessionStorage.user = $scope.user;
                console.log($sessionStorage.user);
                $rootScope.authenticated = $sessionStorage.user.authenticated;
                
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };
    
    $scope.registerOrphanage=function(){
        
        $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo).success(function(data){
            if(data.state == 'success'){
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;

                $sessionStorage.user = $scope.user;
                console.log($sessionStorage.user);  
                $rootScope.authenticated = $sessionStorage.user.authenticated;

                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    }; 




}]);