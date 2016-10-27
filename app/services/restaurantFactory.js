angular.module('foodIdeas').factory('restaurantFactory', [
    '$http',
    '$q',
    function($http, $q){

        /*** PRIVATE FUNCTIONS/VARIABLES GOES HERE ***/
        var service = {};
        var zipCode;
        var selectedFoodType;

        function buildRequest(vendor){
            var request = {};
            switch (vendor){
              case 'yahoo':
                  request.url = 'https://query.yahooapis.com/v1/public/yql';
                  request.params = {
                      q: "select * from local.search where zip='"+ zipCode +"' and query='" + selectedFoodType + "'",
                      format: 'json',
                      diagnostics: true
                    };
              break;

              case 'yelp':
                  request.url = 'https://api.yelp.com/v2/search';
              break;

              default:
              break;
            }
            return request;
        }

        function rebuildData(data, vendor){
            /** This function rebuild the data received from different vendors **/
            /** to standard response expected by the controller. **/

            var ds = [];
            switch (vendor){
              case 'yahoo':
                if (data.data.query.results !== null){
                    for (i=0; i<data.data.query.results.Result.length; i++){
                        ds.push(
                            { 'Name' : data.data.query.results.Result[i].Title }
                        );
                    }
                }
              break;

              case 'yelp':
              break;

              default:
              break;
            }

            return ds;
        }

        function requestData(vendor){
            var request = buildRequest(vendor);
            var d = $q.defer();

            $http.get(request.url, {params: request.params}).then(function(res){
                data = rebuildData(res, vendor);
                d.resolve(data);
            },
            function(error){
                console.log("Failed to fetch data from ", vendor, " :", error);
                d.reject(true);
            });

            return d.promise;
        }
        /** PRIVATE FUNCTIONS/VARIABLES END HERE **/

        service.getRestaurant = function(zip, foodtype){
            zipCode = zip;
            selectedFoodType = foodtype;
            return requestData('yahoo');
        };

        return service;
    }
]);
