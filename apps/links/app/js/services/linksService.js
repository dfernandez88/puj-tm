'use strict';

/**
 * @ngdoc function
 * @name webApp.service:posts
 * @description
 * # MainCtrl
 * Controller of the webApp
 */

(function() {
  angular.module('webApp')
    .factory('LinksService', ['httpFilter', 'tagsFilter', function(httpFilter, tagsFilter) {
      var links = [];
      links = [
        {title:'google', url:'www.google.com', tags:['google', 'search'], date: new Date(Date.now())},
        {title:'facebook', url:'www.facebook.com', tags:['facebook', 'social'], date: new Date(Date.now())},
        {title:'whatsapp', url:'www.whatsapp.com', tags:['whatsapp', 'chat', 'social'], date: new Date(Date.now())}
      ]

      function getLinks(){
        return links;
      }

      function addLink(title, url, tags){
        //var d = new Date(1382086394000);
        links.unshift({
          title: title,
          url: httpFilter(url),
          tags: tagsFilter(tags),
          date: new Date(Date.now())
        });
      }
      
      function editLink(index, title, url, tags){
        var link = links[index];
        link.title = title;
        link.url = url;
        link.tags = tagsFilter(tags);
      }

      function deleteLink(index){
        links.splice(index, 1);
      }

      return {
        getLinks: getLinks,
        addLink: addLink,
        editLink: editLink,
        deleteLink: deleteLink
      };
    }]
  );

})();
