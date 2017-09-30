/* global google */
angular
  .module('itineraryApp')
  .controller('PlacesIndexCtrl', PlacesIndexCtrl);

function PlacesIndexCtrl() {
  const vm = this;

  vm.search = search;

  function search(){

    document.addEventListener('DOMContentLoaded', () => {
      const input = document.querySelector('#place');
      const autocomplete = new google.maps.places.Autocomplete(input, { types: ['establishment'] });

      autocomplete.addListener('place_changed', () => {
        console.log(autocomplete.getPlace());
      });
    });
  }
}
