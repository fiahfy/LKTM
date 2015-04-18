'use strict';

/* Services */

var services = angular.module('services', []);

services.service('KarenService', ['$http', function($http) {
  this.page = 1;
  this.perPage = 10;
  this.url = 'http://fiahfy.tumblr.com/tagged/kujo+karen/page/';
  this.urls = [];
  this.noMoreLoad = false;
  this.isLoading = false;

  var me = this;
  this.loadUrls = function(callback, more) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    more = more || false;
    if (more) {
      if (this.noMoreLoad) {
        return;
      }
      this.page++;
    } else {
      this.noMoreLoad = false;
    }

    $http.get(this.url + this.page).then(function(data) {
      me.isLoading = false;
      $(data.data).find('.post img').each(function() {
        me.urls.push($(this).attr('src'));
      });
      if (me.urls.length < me.page * me.perPage) {
        console.log('no');
        me.noMoreLoad = true;
      }
      callback();
    });
  };

  this.sendTagToContentScript = function(url) {
    url = this.convertUrlWithSize(url, 500);
    var tag = this.getMarkdownWithImageUrl(url);
    chrome.windows.getCurrent(function(window) {
      chrome.tabs.query({'windowId': window.id, 'active': true}, function(result) {
        chrome.tabs.sendRequest(result[0].id, {
          'id': 'select',
          'data': {'tag': tag}
        }, function(response) {});
      });
    });
  };

  this.getMarkdownWithImageUrl = function(url) {
    return '![LKTM](' + url + ')';
  };

  this.convertUrlWithSize = function(url, size) {
    var matches = url.match(/^(.+_)\d+(\.[0-9a-z]+)$/i);
    return matches[1] + size + matches[2];
  };
}]);
