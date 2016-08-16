var easyDonations=angular.module('easyDonations');

easyDonations.controller('authController',function($scope, $http, $rootScope, $location){
    console.log("In auth Controller");
     $scope.user = {username: '', password: ''};
     $scope.error_message = '';

    
     $scope.login = function(){
     $http.post('/auth/login', $scope.loginInfo).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
    
    
    $scope.isSameOrphanage = function(){
        
        if($scope.orphanageSignupInfo.password != $scope.orphanageSignupInfo.confirmPassword)
        {    $scope.showButtonOrphanage=true;
           
            return false;
        }
        else
        {
            $scope.showButtonOrphanage=false;
            
            return true;
        }
    }
    
    $scope.isSameDonor = function(){
        
        if($scope.donorSignupInfo.password != $scope.donorSignupInfo.confirmPassword)
        {    $scope.showButtonDonor=true;
           
            return false;
        }
        else
        {
            $scope.showButtonDonor=false;
            
            return true;
        }
    }
    
    $scope.register = function(){
        console.log("inside register");
        $http.post('/auth/donorSignup', $scope.donorSignupInfo).success(function(data){
        if(data.state == 'success'){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
        }
      else{
        $scope.error_message = data.message;
      }
    });
          $http.post("/auth/orphanageSignup",$scope.orphanageSignupInfo)
             .success(function(data){
               if(data.state == 'success'){
            $rootScope.authenticated = true;
            $rootScope.current_user = data.user.username;
            $location.path('/');
        }
      else{
        $scope.error_message = data.message;
      }
          });
  };
});