var easyDonations=angular.module('easyDonations');

easyDonations.controller('donationControl',function($scope,$http){
   console.log("inside view donations controller");
      $scope.message="ABHIJEETTTTTTTTTTTTT";
      
    $scope.donations=[];
    
      $scope.all= function(){
        console.log("inside all function");
        $http.get("/api/posts").then(function successCallback(res) {
            for(i in res.data){
                
                $http.get("/api/donors/"+res.data[i].posted_by)
                    .then(function successCallback(response) {
                        var items = res.data[i].items;
                        console.log("Value of i : " +i);

//                        console.log("Items : ");
//                        console.log(items);    
                        var name=response.data.name;
                        console.log("donations by "+name);
                        console.log(items);
                        var donation = {
                             name : items
                        }
                        $scope.donations.push(donation);
//                        console.log($scope.donation);
//                        console.log($scope.donations);
                }, function errorCallback(response) {
                    console.log("error no donor data ");

                 });
            }
            
        }, function errorCallback(response) {
            console.log("error no post  data ");
            
        });
      };
    $scope.all();
  
    
});