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
        console.log($scope.donorSignupInfo);
        $http.post('/auth/donorSignup', $scope.donorSignupInfo).success(function(data){
            if(data.state == 'success'){
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;
                
                $sessionStorage.user = $scope.user;
                $scope.user._id = data.user._id;
                $scope.user.role = data.user.role;
                console.log($sessionStorage.user);
                $rootScope.authenticated = $sessionStorage.user.authenticated;
				$rootScope.role = $sessionStorage.user.role;                
                $location.path('/');
                alert("You are successfully registered, HAPPY DONATING !");
                console.log("Donor registered !")
            }
            else{
                $scope.error_message = data.message;
                alert("Opps some error occurred !");
            }
        });
    };
    
    $scope.registerOrphanage=function(){
        
        $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo).success(function(data){
            if(data.state == 'success'){
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;
				$scope.user.role = data.user.role;
                $sessionStorage.user = $scope.user;
                console.log($sessionStorage.user);  
                $rootScope.authenticated = $sessionStorage.user.authenticated;
				$rootScope.role = $sessionStorage.user.role;
                $location.path('/');
                alert("Your Orphanage is registered successfully !");
                console.log("Orphanage registered !")
            }
            else{
                $scope.error_message = data.message;
                alert("Opps some error occurred !");
            }
        });
    }; 



   

}]);