var myApp = angular.module('EasyDonations',['ngCookies']);

/*myApp.run(function($rootScope) {
  //  $rootScope.color = 'blue';
//  $rootScope.sessionUser="";
});*/
myApp.controller('loginController', function($scope,$http,$window,$rootScope,$cookies){
//    console.log($scope.loginInfo);
  
    
    if($cookies.get("user"))
        $scope.isUserLoggedIn = true;
    else
        $scope.isUserLoggedIn = false;
    console.log($scope.isUserLoggedIn);
    $scope.login = function() {
       console.log("inside login controller");
        $http.post("/auth/login",$scope.loginInfo).then(function successCallback(response) {
            console.log(response.data.user.username);
            console.log(response.data.user.password);
            console.log(response);
            $scope.userInfo=response.data.user.username;
            $cookies.put("user", response.data.user.username);
//            $rootScope.sessionUser = $cookies.get("user");
            $scope.isUserLoggedIn = true;
            console.log("Login status of" + $scope.sessionUser + " : " + $scope.isUserLoggedIn);
            $window.location.href = '/';
            
            
        }, function errorCallback(response) {
             $scope.isUserLoggedIn = false;
            alert("invalid Username/password");
        });
      };
    
    $scope.logout=function(){
       
        console.log("inside logoput");
        $http.get("/auth/signout").then(function successCallback(response) {
        
       
      
        $scope.isUserLoggedIn = false;
        }, function errorCallback(response) {
            console.log("logout failed!");
        });
    };
        
    });