var easyDonations=angular.module('easyDonations');

easyDonations.controller('authController',function($scope, $http, $rootScope, $location,$sessionStorage){
    
    console.log("In auth Controller");
     
     $scope.user = $rootScope.user;
     $scope.error_message = '';
    
     //var authenticated = $sessionStorage.user.authenticated;
    
     $scope.login = function(){
        $http.post('/auth/login', $scope.loginInfo).success(function(data){
            if(data.state == 'success'){
                console.log("from auth"+data);
                
                $scope.user.authenticated = true;
                $scope.user.current_user = data.user.username;
				$scope.user._id = data.user._id;
                $scope.user.role=data.user.role;
                $sessionStorage.user = $scope.user;

                console.log($sessionStorage.user);

                $rootScope.authenticated = $sessionStorage.user.authenticated;
                $rootScope.role=$sessionStorage.user.role;
                $location.path('/');
                alert("Login Successful !");
            }
            else{
                $scope.error_message = data.message;
                alert("Opps Login unsuccessful !");
            }
        }).error(function(err){
            alert("Incorrect Username/Password");
        });
      };
    
    
   
});