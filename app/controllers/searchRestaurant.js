angular.module('foodIdeas').controller('searchRestaurant', [
    '$scope',
    'restaurantFactory',
    function($scope, restaurantFactory){
        $scope.restaurants = restaurantFactory.getRestaurant();
        $scope.boom = 'xxxx';
    }
]);