'use strict';

(function() {
  angular.module('webApp')
    .filter("tags", function() {
      return function(tags) {
        var result = []
        for(var i=0; i < tags.length; i++){
          result.push(tags[i]['text']);
        }
        return result;
      }
    });

})();
