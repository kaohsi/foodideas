angular.module('foodIdeas').controller('searchRestaurant', [
    '$scope',
    '$rootScope',
    '$location',
    'restaurantFactory',
    function($scope, $rootScope, $location, restaurantFactory){
        //$scope.zipCode = '95127';
    
       $scope.submit = function(){
           restaurantFactory.getRestaurant($scope.zipCode).then(function(data){
               if (data.data.query.results !== null){
                   $rootScope.restaurants = data.data.query.results.Result;
                   console.log(data.data.query.results.Result);
               } else {
                   $rootScope.restaurants = null;
               }
               $location.path( "/results" );
            }, function(error){
                console.log("Error fetching restaurant list.");
           });
       };
     
    }
]);