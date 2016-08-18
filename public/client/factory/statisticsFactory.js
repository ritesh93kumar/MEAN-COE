var easyDonations=angular.module('easyDonations');

easyDonations.factory('statisticsFactory',['$http',function($http,$scope){
    var statsFactory={};
    statsFactory.getStatistics=function(){
        return $http.get('/api/statistics');
    };
    return statsFactory;
}]);