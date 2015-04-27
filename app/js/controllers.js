'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('PopupMainCtrl', ['$scope', '$window', 'KarenService', function($scope, $window, KarenService) {
  $scope.urls = [];
  $scope.isFirstLoading = true;
  $scope.canMoreLoad = false;

  $scope.init = function() {
    $scope.load();
  };

  $scope.load = function(more) {
    KarenService.loadUrls(function() {
      $scope.isFirstLoading = false;
      $scope.urls = KarenService.urls;
      $scope.canMoreLoad = KarenService.canMoreLoad;
    }, more);
  };

  $scope.select = function(url) {
    KarenService.sendTagToContentScript(url);
    $window.close();
  };

  $scope.init();
}]);
