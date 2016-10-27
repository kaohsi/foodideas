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

        function requestData(){
            var url = buildRequestUrl('yahoo');


            var params = { q: "select * from local.search where zip='94085' and query='chinese'",
                                            format: 'json',
                            diagnostics: true

                          };
            $http.get(url, {params: params}).then(function(data){
                //console.lo0g('data', data.data.query.results.Result);
                console.log(data);
            }, function(error){
                console.log('error', error);
            });
        }

        service.getRestaurant = function(){
            requestData();
        };

        return service;
    }
]);