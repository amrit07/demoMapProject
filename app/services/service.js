angular.module('demoMapApp.service', [])
    .factory('locationService', ['$http', '$q', function ($http, $q) {
        var locationData = [];
        var locationObj = {};
        var get = function () {
            locationData.splice(0);
            var deferred = $q.defer();
            $http.get('./location/location.json').then(
                function (result) {
                    locationData = result.data;
                    deferred.resolve(result.data);
                },
                function (err) {
                    console.log('error in getting data from server');
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        };
  locationObj = {
      locationData :locationData,
      get:get
  };
  return locationObj;

    }])
    .service('loadGoogleMapAPI', ['$window', '$q', 
    function ( $window, $q ) {

        var deferred = $q.defer();

        // Load Google map API script
        function loadScript() {  
            // Use global document since Angular's $document is weak
            var script = document.createElement('script');
            script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyDwglyZbvReA82jtrudwDkMaLriWJxonfM&callback=initMap';

            document.body.appendChild(script);
        }

        // Script loaded callback, send resolve
        $window.initMap = function () {
            deferred.resolve();
        }

        loadScript();

        return deferred.promise;
    }]);
