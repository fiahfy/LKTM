'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('PopupMainCtrl', ['$scope', '$window', 'KarenService', function($scope, $window, KarenService) {
  $scope.urls = [];
  $scope.isLoading = true;

  $scope.init = function() {
    $scope.load();
  };

  $scope.load = function(more) {
    KarenService.loadUrls(function() {
      $scope.isLoading = false;
      $scope.urls = KarenService.urls;
    }, more);
  };

  $scope.select = function(url) {
    KarenService.sendTagToContentScript(url);
    $window.close();
  };

  $scope.init();
}]);
