'use strict';

$(function(){
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.id == 'select') {
      $('#new_comment_field').val($('#new_comment_field').val() + request.data.tag);
    }
  });
});