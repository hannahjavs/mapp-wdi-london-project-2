/* global google */

angular
  .module('itineraryApp')
  .directive('googleMap', googleMap);


function googleMap() {

  return {
    restrict: 'E',
    template: '<div class="map">Google map div</div>',
    replace: true,
    scope: {
      center: '='
    },
    link($scope, $element) {
      console.log($scope);
      const map = new google.maps.Map($element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 10
      });

      const placesService = new google.maps.places.PlacesService(map);
      let markers = [];

      function removeMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      map.addListener('click', (e) => {
        const establishment = document.getElementById('establishment').value;
        const radius = document.getElementById('radius').value;
        const price = document.getElementById('price').value;
        

        console.log(establishment);
        removeMarkers();

        map.panTo(e.latLng); // Animation pan to location clicked

        placesService.nearbySearch({
          location: e.latLng,
          radius: radius,
          openNow: true,
          type: establishment,
          minprice: price
        }, (results, status) => {
          if(status !== 'OK ' && establishment === '') return false;

          markers = results.map(result => {
            return new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });
          });
        });
      });
      const latLng = { lat: location.lat, lng: location.lng};
      const marker = new google.maps.Marker({
        position: latLng,
        map: map

      });


      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
    }
  };
}

// document.addEventListener('DOMContentLoaded', () => {
//   const mapDiv = document.querySelector('.map');
//   const input = document.querySelector('#place');
//   const autocomplete = new google.maps.places.Autocomplete(input, { types: ['establishment'] });
//   let markers = [];
//
//   autocomplete.addListener('place_changed', () => {
//     console.log(autocomplete.getPlace());
//   });
//
//   const map = new google.maps.Map(mapDiv, {
//     center: { lat: 51.51, lng: -0.09 },
//     zoom: 14
//   });
//
//   const placesService = new google.maps.places.PlacesService(map);
//
//   // REMOVE MAP MARKERS
//   function removeMarkers() {
//     markers.forEach(marker => marker.setMap(null));
//     markers = [];
//   }
//
//   map.addListener('click', (e) => {
//
//     removeMarkers();
//
//     map.panTo(e.latLng); // Animation pan to location clicked
//
//     placesService.nearbySearch({
//       location: e.latLng,
//       radius: 2000,
//       openNow: true,
//       type: 'bar'
//     }, (results, status) => {
//       if(status !== 'OK') return false;
//
//       markers = results.map(result => {
//         return new google.maps.Marker({
//           position: result.geometry.location,
//           map: map,
//           animation: google.maps.Animation.DROP
//         });
//       });
//     });
//   });
// });
