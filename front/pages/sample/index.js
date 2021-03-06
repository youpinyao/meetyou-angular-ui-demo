import routerConfig from '../../js/routerConfig.js';

const controller = 'sampleCtrl';

angular.module('app').controller(controller, mainCtrl);

mainCtrl.$inject = ['$scope', '$state'];

function mainCtrl($scope, $state) {
  angular.each(routerConfig, router => {
    if ($state.current.name === router.state || $state.current.name.indexOf(router.state + '.') !==
      -1) {
      $scope.routerConfig = router.routers;
      $scope.siderMenuTitle = router.title;
    }
  });
}

export default {
  template: require('./index.html'),
  controller,
};
