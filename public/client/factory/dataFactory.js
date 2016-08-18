var easyDonations=angular.module('easyDonations');

easyDonations.factory('dataFactory', ['$http', function($http){
    
    var dataFactory = {};
    
    dataFactory.getPosts = function () {
        return $http.get('/api/posts');
    };
    
    dataFactory.getDonors = function (id) {
        return $http.get('/api/donors/'+id);
    };
    
    return dataFactory;
}]);