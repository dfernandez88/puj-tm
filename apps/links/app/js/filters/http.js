'use strict';

(function() {
  angular.module('webApp')
    .filter("http", function() {
      return function(link) {
        var result;
        var startingUrl = "http://";
        var httpsStartingUrl = "https://";
        if (link.startWith(startingUrl) || link.startWith(httpsStartingUrl)) {
          result = link;
        } else {
          result = startingUrl + link;
        }
        return result;
      }
    });

  String.prototype.startWith = function(str) {
    return this.indexOf(str) == 0;
  };

})();
