angular.module('foodIdeas').factory('restaurantFactory', [
    '$http',                                
    function($http){
        var service = {};

        function buildRequestUrl(vendor){
            var url = '';
            switch (vendor){
                case 'yelp':
                    url = 'https://api.yelp.com/v2/search';
                break;

                case 'yahoo':
                    url = 'https://query.yahooapis.com/v1/public/yql';
                break;

                default:
                break;
            }
            return url;
        }

        function requestData(zipCode){
            var url = buildRequestUrl('yahoo');


            var params = { q: "select * from local.search where zip='"+ zipCode +"' and query='chinese'",
                                            format: 'json',
                            diagnostics: true

                          };
            return $http.get(url, {params: params});
        }

        service.getRestaurant = function(zipCode){
            return requestData(zipCode);
        };

        return service;
    }
]);