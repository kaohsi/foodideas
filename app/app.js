angular.module('foodIdeas', ['ngRoute']);

angular.module('foodIdeas').config(
    function($routeProvider){
        $routeProvider.when('/', {
            template: '<search-restaurant></search-restaurant>'
        });
    }
);