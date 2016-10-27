angular.module('foodIdeas').directive('searchResults', [
    function(){
        return {
            restrict : 'A, E',
            controller: 'searchRestaurant',
            //ERROR in Chrome when loading locally. Webserver needed: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.
            //Works in FF
            templateUrl : 'templates/searchResults.html'
        };
    }
]);