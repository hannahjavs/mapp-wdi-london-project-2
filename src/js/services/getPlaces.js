// angular
//   .module('itineraryApp')
//   .service('getPlaces', getPlaces);
//
// getPlaces.$inject = ['$scope']
// function getPlaces(latLng, $scope, markers, populateImages){
//   console.log('hola');
//   removeMarkers();
//   if(!$scope.venue) return false;
//   placesService.nearbySearch({ // search places with the filters on the page
//     location: latLng,
//     radius: $scope.radius,
//     openNow: true,
//     type: $scope.venue,
//     maxPriceLevel: $scope.price
//   }, (results) => {
//     populateImages(results);
//     markers = results.map(result => { // Set markers on map with the result of the search
//
//       const marker = new google.maps.Marker({
//         position: result.geometry.location,
//         map: map,
//         animation: google.maps.Animation.DROP
//       });
//
//       // INFO LABEL ON MARKER
//       marker.addListener('mouseover', () => {
//         toggleInfoWindow(marker, result);
//       });
//       marker.addListener('mouseout', () => {
//         toggleInfoWindow();
//       });
//
//       // marker.addListener('click', () => {
//       //   directionsService.route({
//       //     origin: geolocationMarker.getPosition(),
//       //     destination: marker.getPosition(),
//       //     travelMode: 'WALKING'
//       //   }, response => {
//       //     directionsDisplay.setDirections(response);
//       //   }, true);
//       // });
//
//       return marker;
//     });
//   });
// }
