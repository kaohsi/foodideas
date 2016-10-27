angular.module('foodIdeas', ['ngRoute']);

angular.module('foodIdeas').config([
    '$routeProvider',
    function($routeProvider){
        $routeProvider.when('/', {
            template: '<search-restaurant></search-restaurant>'
        });
        
        $routeProvider.when('/results', {
            template: '<search-results></search-results>'
        });
    }
]);