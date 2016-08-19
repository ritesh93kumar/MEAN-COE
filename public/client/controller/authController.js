var easyDonations=angular.module('easyDonations');

easyDonations.controller('authController',function($scope, $http, $rootScope, $location,$sessionStorage){
    
    console.log("In auth Controller");
     
     $scope.user = $rootScope.user;
     $scope.error_message = '';
    
     //var authenticated = $sessionStorage.user.authenticated;
    
     $scope.login = function(){
        $http.post('/auth/login', $scope.loginInfo).success(function(data){
            if(data.state == 'success'){
                
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;
				$scope.user._id = data.user._id;
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
    
    
    $scope.isSameOrphanage = function(){  
        
    /*    if(typeof(orphanageSignupInfo)=="undefined")
        {
            return true;
        }
        
        else*/ if($scope.orphanageSignupInfo.password != $scope.orphanageSignupInfo.confirmPassword){    
            $scope.showButtonOrphanage=true;           
            return false;
        }
        else{
            $scope.showButtonOrphanage=false;            
            return true;
        }
    };
    
    $scope.isSameDonor = function(){ 
       /*   if(typeof(donorSignupInfo)=="undefined")
        {
            return true;
        }
        else*/ if($scope.donorSignupInfo.password != $scope.donorSignupInfo.confirmPassword){    
            $scope.showButtonDonor=true;           
            return false;
        }
        else{
            $scope.showButtonDonor=false;            
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
});