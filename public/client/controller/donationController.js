var easyDonations=angular.module('easyDonations');

easyDonations.controller('donationController',['$scope', '$http', '$sessionStorage', 'donationFactory', function($scope, $http, $sessionStorage, donationFactory){
    
	console.log("inside view donations controller");
    
	$scope.items = [];
	$scope.posted_by = $sessionStorage.user._id;
	$scope.current_user_name = $sessionStorage.user.current_user;
    
    function getPosts() {
        donationFactory.getPosts()
        .then(function (response){
            $scope.posts = response.data;
            console.log(response);
        }, function (error) {
            console.log("Could not get data");
        });
    };
    getPosts();

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
		item.name = $scope.item.name;
		item.quantity = $scope.item.quantity;
		
		//Push item into Items Array
		$scope.items.push(item);
		
		// Reset the Fields
		$scope.item.name = "";
		$scope.item.quantity = "";
		console.log("Added Items : ");
		console.log($scope.items);
	}
	
}]);