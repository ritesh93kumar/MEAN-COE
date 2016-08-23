var easyDonations=angular.module('easyDonations');

easyDonations.controller('donationController',['$scope', '$http', '$sessionStorage', 'donationFactory','$timeout', function($scope, $http, $sessionStorage, donationFactory,$timeout){
    
	console.log("inside view donations controller");
    
	$scope.items = [];
	if($sessionStorage.user){
		// Only if Session is Set
		$scope.posted_by = $sessionStorage.user._id;
		$scope.current_user_name = $sessionStorage.user.current_user;
	}
    
    function getDonors(){
        donationFactory.getDonors().then(function(response){
            $scope.donors=response.data;
            console.log("Donors object");
            console.log(response);
          },function(error){
            console.log("Couldnot get donors data");});
    };
    
    function getDonorById(){
        donationFactory.getDonorById($sessionStorage.user.current_user).then(function(response){
            $scope.donor=response.data;
            console.log("Donor object");
            console.log(response);
          },function(error){
            console.log("Couldnot get donor data");});
    };
    
    function getPosts() {
        donationFactory.getPosts()
        .then(function (response){
            $scope.posts = response.data;
            console.log("POST OBJECT");
            console.log(response);
        }, function (error) {
            console.log("Could not get data");
        });
    };
   
     $scope.getAllDetails=function(){
         $scope.postDetails={};
        console.log("Inside GetAll");
        for(i in $scope.posts)
        {
            for(j in $scope.donors)
            {
                  /* console.log($scope.posts[i].posted_by);
                   console.log($scope.posts[i].items);
                */
                    if($scope.posts[i].posted_by ==$scope.donors[j]._id)
                    {
                        console.log($scope.donors[j].name);
                        console.log($scope.posts[i].items);
                        console.log("postDetails");
                        
                    }
            }
        }
        
    };
        getDonorById();
        getDonors();
        getPosts();
        $timeout($scope.getAllDetails, 1000);
    

	$scope.insertPosts = function(){
		// Insert the item to the Items Array
		$scope.items.push($scope.item);
		console.log("Added Items : ");
		console.log($scope.items);
		
		// Insert the items array, posted_by and the expiry_date into Posts Collection
		var postData = {
			"posted_by" : $scope.posted_by,
			"expiry_date" : $scope.expiry_date,
			"items" : $scope.items
		}
		donationFactory.insertPosts(postData)
		.then(
			function (response){
				console.log("Inserted Item : ");
				console.log(response.data);
			}, function(error){
				console.log("Could Not Insert");
			}
		);
	}
    
	$scope.addItem = function(){
		// Create a item object and populate it
		var item = {};
		item.item = $scope.item.item;
		item.quantity = $scope.item.quantity;
		
		//Push item into Items Array
		$scope.items.push(item);
		
		// Reset the Fields
		$scope.item.item = "";
		$scope.item.quantity = "";
		console.log("Added Items : ");
		console.log($scope.items);
	}
	
}]);