angular.module('foodIdeas').controller('searchRestaurant', [
    '$scope',
    '$rootScope',
    '$location',
    '$http',
    'restaurantFactory',
    function($scope, $rootScope, $location, $http, restaurantFactory){

        function extractFromAdress(components, type){
           for (var i=0; i<components.length; i++)
               for (var j=0; j<components[i].types.length; j++)
                   if (components[i].types[j]==type) return components[i].long_name;
           return "";
        }

         $scope.foodTypes = ["Pizza", "Italian", "Tapas", "Chinese", "Japanese"];

         $scope.getCurrentZipCode = function(){
           window.navigator.geolocation.getCurrentPosition(function(pos){
              $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+pos.coords.latitude+','+pos.coords.longitude+'&sensor=true').then(function(res){
                if (res.status == 200){
                  if (res.data.results.length){
                      var zip = extractFromAdress(res.data.results[0].address_components, "postal_code");
                      sessionStorage.setItem('currentZipCode', zip);
                      $scope.zipCode = zip;
                  }
                }
              });
            });
         };

         $scope.submit = function(){
              restaurantFactory.getRestaurant($scope.zipCode, $scope.selectedFoodType).then(function(data){
                 if (data){
                     $rootScope.restaurants = data;
                     //console.log(data);
                 } else {
                     $rootScope.restaurants = null;
                 }
                 $location.path( "/results" );
              }, function(error){
                  console.log("Error fetching restaurant list.");
             });
         };

         if (!sessionStorage.getItem('currentZipCode')){ //Cache zip code in session storage
            $scope.getCurrentZipCode();
         } else {
           $scope.zipCode = sessionStorage.getItem('currentZipCode');
         }
    }
]);
