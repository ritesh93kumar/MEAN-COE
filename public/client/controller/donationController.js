var easyDonations=angular.module('easyDonations');

easyDonations.controller('donationController',['$scope', '$http', '$sessionStorage', 'donationFactory','$timeout','$rootScope', function($scope, $http, $sessionStorage, donationFactory,$timeout,$rootScope){
    
	console.log("inside view donations controller");
     $scope.hidePostButton=true;
	$scope.items = [];
	if($sessionStorage.user){
		// Only if Session is Set
		$scope.posted_by = $sessionStorage.user.current_user;
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
    
    
    function getOrphanageById(){
        donationFactory.getOrphanageById($sessionStorage.user.current_user).then(function(response){
            $scope.orphanage=response.data;
            console.log("Orphanage object");
            console.log(response);
          },function(error){
            console.log("Couldnot get orphanage data");});
    };
    
     function getPostsOfDonor(){
        donationFactory.getPostsByDonorName($sessionStorage.user.current_user).then(function(response){
            $scope.postsOfDonor=response.data;
            console.log("DonorPosts object");
             $rootScope.numberOfPosts=Object.keys($scope.postsOfDonor).length;
            console.log(response);
          },function(error){
            console.log("Couldnot get donorPost data");});
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
         $scope.postDetails=[];
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
                        $scope.postDetails.push({"name":$scope.donors[j].name,"items":$scope.posts[i].items,"quantity":$scope.posts[i].quantity,"postedBy":$scope.posts[i].posted_by,"postId":$scope.posts[i]._id,"loaction":$scope.donors[j].address.city});
                        console.log("postDetails");
                        
                    }
            }
        }
        
    };
        getDonorById();
    getOrphanageById();
 		getPostsOfDonor();
        getDonors();
        getPosts();
        $timeout($scope.getAllDetails, 1000);
    

    $scope.viewPosts=function(){		
        $scope.hidePostButton=false;		
        console.log($rootScope.numberOfPosts);		
        if($rootScope.numberOfPosts>0)		
        {		
            $scope.showPosts=true;		
            $scope.showPostError=false;		
            		
           $scope.viewPostButton=true;		
            		
        }		
        else		
        {		
            $scope.showPosts=false;		
            $scope.showPostError=true;		
           $scope.viewPostButton=true;		
            		
        }		
        		
        		
    		
    };		
    		
    $scope.hidePosts=function(){		
    $scope.showPosts=false;		
    $scope.showPostError=false;		
     $scope.viewPostButton=false;		
         $scope.hidePostButton=true;		
    };		
    		
    $scope.deletePost=function(id){		
        donationFactory.deletePostById(id).then(function(response){		
            $scope.deletedPost=response.data;		
            //$http.successRedirect('/donorProfile');		
            		
        },function(error){		
            console.log("Couldnot delete post");})		
            		
    };
    
    
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
	};
    
    $scope.claimForThisPost = function(postId){
        console.log("Inside claimForThisPost");
        //var id = $sessionStorage.user._id;
       
        var claimsObj={"claims":$sessionStorage.user._id};
        donationFactory.updatePosts(postId,claimsObj);
       
    };
	
}]);