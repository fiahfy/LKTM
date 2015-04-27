'use strict';

/* Directives */

var directives = angular.module('directives', []);

directives.directive('whenScrolled', function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    angular.element(raw).bind('scroll load', function(evt) {
      var rect = raw.getBoundingClientRect();
      if (raw.scrollTop + raw.clientHeight >= raw.scrollHeight - 90) {
        scope.$apply(attr.whenScrolled);
      }
    });
  };
});
