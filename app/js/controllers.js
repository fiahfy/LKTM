'use strict';

/* Controllers */

var controllers = angular.module('controllers', []);

controllers.controller('PopupMainCtrl', ['$scope', '$window', 'KarenService', function($scope, $window, KarenService) {
  $scope.urls = [];

  $scope.init = function() {
    $scope.load();
  };

  $scope.load = function(more) {
    KarenService.getThumbnailUrls(function(urls){
      urls.forEach(function(e) {
        $scope.urls.push(e);
      });
    }, more);
  };

  $scope.select = function(url) {
    KarenService.sendTag(url);
    $window.close();
  };

  $scope.init();
}]);
