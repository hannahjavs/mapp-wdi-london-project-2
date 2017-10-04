angular
  .module('itineraryApp')
  .controller('PlansIndexCtrl', PlansIndexCtrl)
  .controller('PlansNewCtrl', PlansNewCtrl)
  .controller('PlansShowCtrl', PlansShowCtrl)
  .controller('PlansEditCtrl', PlansEditCtrl);

PlansIndexCtrl.$inject = ['Plan'];
function PlansIndexCtrl(Plan) {
  const vm        = this;
  vm.all          = [];
  vm.delete       = plansDelete;

  vm.all = Plan.query();

  function plansDelete(plan) {
    // $http
    //   .delete(`/api/plans/${plan._id}`)
    //   .then(() => {
    //     const index = vm.all.indexOf(plan);
    //     vm.all.splice(index, 1);
    //   });
  }
}

PlansNewCtrl.$inject = ['Plan', '$state'];
function PlansNewCtrl(Plan , $state) {
  const vm = this;
  vm.plan  = {};
  vm.create = plansCreate;

  function plansCreate() {
    Plan
      .save(vm.plan)
      .$promise
      .then(plan => {
        $state.go('plansEdit', { id: plan.id });
      });
  }
}

PlansShowCtrl.$inject = ['Plan', '$state'];
function PlansShowCtrl(Plan, $state) {
  console.log($state.params.id);
  const vm = this;
  vm.plan = Plan.get($state.params);
}

PlansEditCtrl.$inject = ['Plan', 'Item', '$state', '$scope'];
function PlansEditCtrl(Plan, Item, $state, $scope) {
  const vm = this;
  vm.plan = {};
  Plan.get($state.params)
    .$promise
    .then(plan => vm.plan = plan);

  $scope.$watch(() => vm.plan, () => {
    console.log(vm.plan);
  }, true);

  vm.places= {
    Bar: 'bar',
    Bowling: 'bowling_alley',
    Gallery: 'art_gallery',
    Cafe: 'cafe',
    Casino: 'casino',
    Club: 'night_club'
  };

  vm.plansUpdate = plansUpdate;

  // to be used if you want to update the name of the plan
  function plansUpdate() {
    Plan
      .update(vm.plan)
      .$promise
      .then((response) => {
        // go back to the show page
        console.log(response);
      });
  }

  // function that gets called when you click on an add button next to a google place
  function addItem(place) {
    // create an item object based on the place info from google
    const placeToAdd = {
      googlePlaceId: place.place_id,
      name: place.name,
      location: place.geometry.location.toJSON(),
      address: place.vicinity
    };

    // save the new item, and pass in the plan id that it belongs to as part of the URL
    // item is the req.body (the data)
    Item
      .save({ planId: vm.plan.id }, placeToAdd)
      .$promise
      .then((plan) => {
        // push the newly created item
        vm.plan.items = plan.items;
      });
  }

  vm.addItem = addItem;

  function deleteItem(item) {
    Item
      .delete({ planId: vm.plan.id, id: item.id })
      .$promise
      .then(() => {
        const index = vm.plan.items.indexOf(item);
        vm.plan.items.splice(index, 1);
      });
  }

  vm.deleteItem = deleteItem;

  // when you click save next to the time, update a single item
  function updateTime(item) {
    Item
      // pass in the plan id and item id as part of the url, and pass in the time as the entire req.body
      .update({ planId: vm.plan.id, id: item.id }, { time: item.time })
      .$promise
      .then((response) => {
        // call the reordering function to orderby time (orderByFilter)
        console.log(response);
      });
  }

  vm.updateTime = updateTime;
}
