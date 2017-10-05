/* global google */

angular
  .module('itineraryApp')
  .directive('googleMap', googleMap);

googleMap.inject = ['$window', 'snazzymap', 'debounce'];
function googleMap($window, snazzymap, debounce) {

  return {
    restrict: 'E',
    template: '<div class="map">Google map div</div>',
    replace: true,
    scope: {
      center: '=',
      placesResults: '=',
      venue: '=',
      radius: '=',
      price: '=',
      user: '=' // Drawing route line
    },
    link(scope, element) {
      let infowindow = null;
      // let geolocationMarker = null;
      // const colorArray = ['green'];


      // GEOLOCATION
      const options = {
        enableHighAccuracy: true
      };
      function success(pos) {

        new $window.google.maps.Marker({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          map: map,
          title: 'You\'re here',
          // Green user location custom marker
          icon: {
            url: 'http://icon-park.com/imagefiles/location_map_pin_light_green7.png',
            scaledSize: new google.maps.Size(40,45)
          }
        });

        // circle.setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        // circle.setRadius(scope.radius);
      }



      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);

      const map = new google.maps.Map(element[0], {
        center: { lat: 51.52, lng: -0.082 },
        zoom: 13,
        styles: snazzymap
      });
      const placesService = new google.maps.places.PlacesService(map);


      // // DRAWING ROUTE LINE
      // // const directionsService = new google.maps.DirectionsService(); // invoking line func.
      // // const directionsDisplay = new google.maps.DirectionsRenderer({
      // //   polylineOptions: {
      // //     strokeColor: colorArray[0],
      // //     strokeOpacity: 1.0
      // //   },
      // //   suppressMarkers: true
      // // });
      //
      // directionsDisplay.setMap(map);

      // scope.placesResults = [];

      let markers = [];

      function removeMarkers() {
        markers.forEach(marker => marker.setMap(null));
        markers = [];
      }

      function toggleInfoWindow(marker, place) {
        if(infowindow) infowindow.close();
        // const description = scope.description;
        // const images = scope.images;
        if(!marker) return false;
        infowindow = new google.maps.InfoWindow({
          content: `
          <div class="infowindow">
            <h2><strong>${place.name}</strong></h2>
          </div>
          `
        });
        infowindow.open(map, marker);
      }

      // Creating circle
      const circle = new google.maps.Circle({
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        draggable: true,
        map: map
      });
      circle.addListener('dragend', () => {
        getPlaces(circle.getCenter());
      });

      circle.addListener('change', () => {
        console.log('changed');
        // get the center of the circle
        // call a fuction and pass in latlng
      });

      map.addListener('click', mapClicked);
      circle.addListener('click', mapClicked);

      function mapClicked(e) {
        if(!e) return false;
        getPlaces(e.latLng);

        circle.setCenter(e.latLng); // Creating circle radius - setting center point
        circle.setRadius(scope.radius); // Setting the circle radius
        // map.panTo(e.latLng); // Animation pan to location clicked
      }

      function getPlaces(latLng){
        console.log('hola');
        removeMarkers();
        if(!scope.venue) return false;
        placesService.nearbySearch({ // search places with the filters on the page
          location: latLng,
          radius: scope.radius,
          openNow: true,
          type: scope.venue,
          maxPriceLevel: scope.price
        }, (results) => {
          populateImages(results);
          markers = results.map(result => { // Set markers on map with the result of the search

            const marker = new google.maps.Marker({
              position: result.geometry.location,
              map: map,
              animation: google.maps.Animation.DROP
            });

            // INFO LABEL ON MARKER
            marker.addListener('mouseover', () => {
              toggleInfoWindow(marker, result);
            });
            marker.addListener('mouseout', () => {
              toggleInfoWindow();
            });

            // marker.addListener('click', () => {
            //   directionsService.route({
            //     origin: geolocationMarker.getPosition(),
            //     destination: marker.getPosition(),
            //     travelMode: 'WALKING'
            //   }, response => {
            //     directionsDisplay.setDirections(response);
            //   }, true);
            // });

            return marker;
          });
        });
      }

      function populateImages(results) { // function to get the image of the objects (places) recieved by using the function getUrl() within the object (place)
        results.forEach((result) => {
          result.imageUrl = result.photos ? result.photos[0].getUrl({maxHeight: 200}) : null; //if the object (place) doesn't have any image it will return NULL
        });
        scope.placesResults = results;
        scope.$apply();
      }

      scope.$watch('center', () => { // get the center when you click
        if(!scope.center) return false;
        map.setCenter(scope.center);
        circle.setCenter(scope.center); // Creating circle radius - setting center point
        circle.setRadius(scope.radius); // Setting the circle radius
      });

      scope.$watch('radius', () => circle.setRadius(scope.radius));

      scope.$watch('radius', debounce(() => getPlaces(circle.getCenter()), 1500));
      scope.$watch('price', debounce(() => getPlaces(circle.getCenter()), 1500));

      scope.$watch('venue', () => {
        getPlaces(circle.getCenter());
      });



    }
  };

} // Closing google map function
