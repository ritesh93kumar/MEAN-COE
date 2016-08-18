var easyDonations=angular.module('easyDonations');

easyDonations.factory('donationFactory', ['$http', function($http){
    
    var donationFactory = {};
    
    donationFactory.getPosts = function () {
        return $http.get('/api/posts');
    };
    
    donationFactory.getDonors = function (id) {
        return $http.get('/api/donors/'+id);
    };
	
	donationFactory.insertPosts = function (data) {
        return $http.post('/api/posts', data);
    };
	
	donationFactory.getPostsById = function (id) {
        return $http.get('/api/posts' + id);
    };
	
//	dataFactory.updatePosts = function () {
		// To be implemented
//        return $http.put('/api/posts');
//    };
    
    return donationFactory;
}]);