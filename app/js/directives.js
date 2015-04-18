'use strict';

/* Directives */

var directives = angular.module('directives', []);

directives.directive('whenScrolled', function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    angular.element(raw).bind('scroll load', function(evt) {
      var rect = raw.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 5) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});
