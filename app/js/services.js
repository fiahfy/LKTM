'use strict';

/* Services */

var services = angular.module('services', []);

services.service('KarenService', ['$http', function($http) {
  this.page = 1;
  this.url = 'http://fiahfy.tumblr.com/tagged/kujo+karen/page/';

  this.getThumbnailUrls = function(callback, more) {
    more = more || false;
    if (more) {
      this.page++;
    }
    $http.get(this.url + this.page).then(function(data) {
      var urls = []
      $(data.data).find('.post img').each(function() {
        urls.push($(this).attr('src'));
      });
      callback(urls);
    });
  };

  this.sendTag = function(url) {
    url = this.convertUrlWithSize(url, 500);
    var tag = this.getMarkdown(url);
    chrome.windows.getCurrent(function(window) {
      chrome.tabs.query({'windowId': window.id, 'active': true}, function(result) {
        chrome.tabs.sendRequest(result[0].id, {
          'id': 'select',
          'data': {'tag': tag}
        }, function(response) {});
      });
    });
  };

  this.getMarkdown = function(url) {
    return '![LKTM](' + url + ')';
  };

  this.convertUrlWithSize = function(url, size) {
    var matches = url.match(/^(.+_)\d+(\.[0-9a-z]+)$/i);
    return matches[1] + size + matches[2];
  };
}]);
