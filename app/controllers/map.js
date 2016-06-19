angular.module('demoMapApp.controller', [])
    .controller('mapController', ['$scope', '$http', '$q','filterbyFilter', 'locationService', 'loadGoogleMapAPI', function ($scope, $http, $q,filterbyFilter, locationService, loadGoogleMapAPI) {
        $scope.data = {};
        // $scope.listOfMarkers = null;
        var map;
        var infowindow;
        var listOfMarkers=[];
        $scope.locationData = locationService.locationData;
        if ($scope.locationData == null || $scope.locationData.length == 0) {
            var rcvdData= getLocationData();
        }
        function getLocationData(){
            var deferred = $q.defer();
            $http.get('./location/location.json').then(
            function (result) {
                $scope.locationData = result.data;
                $scope.data.countrySelect = $scope.locationData[0].country;
                // $scope.data.citySelect = $scope.locationData[0].city;
                deferred.resolve();
            },
            function(){
                deferred.reject();
            }

        );

        }
        $scope.updateMarkerList = function () {
            addMarker();
        }
        
        loadGoogleMapAPI.then(
            function () {
                console.log('maps loaded successfuly');
                var myLatLng = { lat: $scope.locationData[0].lat, lng: $scope.locationData[0].lng};
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng
                });
                var contentString = "hey you out there";
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
            }
        );
        function addMarker() {
            
            listOfPlaces = filterbyFilter($scope.locationData, 'city', $scope.data.citySelect);
            if(listOfPlaces== false){console.log('selected city :'+$scope.data.citySelect+" is not present"); return false;}
            removeMarker();
            listOfPlaces.forEach(function (item,index) {
                 if(index==0){
                     map.setZoom(14);
                    map.setCenter({lat:item.lat,lng:item.lng});
                    
                }
                var marker = new google.maps.Marker({
                    position: { lat: item.lat, lng: item.lng },
                    animation: google.maps.Animation.DROP
                });
                var contentString = '<p><span class="bold">Address: </span>' + item.address + '</p>' +
                    '<p><span class="bold">country: </span>' + item.country + '</p>' +
                    '<p><span class="bold">city: </span>' + item.city + '</p>' +
                    '<p><span class="bold">pin: </span>' + item.postalCode + '</p>';
                marker.addListener('click', function () {
                    infowindow.setContent(contentString);
                    infowindow.open(map, marker);
                });
                listOfMarkers.push(marker);
            });
            listOfMarkers.forEach(function (item) {
               
                setTimeout(function () {
                    item.setMap(map)
                }, 500);
            });

        }
        function removeMarker() {
            listOfMarkers.forEach(function (item) {
                google.maps.event.clearListeners(item, 'click');
                item.setMap(null);
            });
            listOfMarkers.splice(0);
        }


    }]);