angular.module('easyDonations').service("postService", function ($http, $q) {
 
    
    console.log("inside service");
    $scope.getposts = function () {
        var deferred = $q.defer();
        
                $http.({ method: 'GET', url: '/api/posts'}).success(function(data){
            deferred.resolve(data);
          });
                return deferred.promise;
        
    };
      $scope.getDonors = function () {
          
          
           var deferred = $q.defer();
        
                $http.({ method: 'GET', url: '/api/donors'}).success(function(data){
            deferred.resolve(data);
          });
                return deferred.promise;
          
          
        
    };
    
    
    
});



/*return $http.get('')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            });*/