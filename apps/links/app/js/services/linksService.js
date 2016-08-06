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
      var tags = [];
      var search = "*";

      links = [
        {id: 0, title:'google', url:'www.google.com', tags:['google', 'search'], date: new Date(Date.now())},
        {id: 1, title:'facebook', url:'www.facebook.com', tags:['facebook', 'social'], date: new Date(Date.now())},
        {id: 2, title:'whatsapp', url:'www.whatsapp.com', tags:['whatsapp', 'chat', 'social'], date: new Date(Date.now())},
        {id: 3, title:'netflix', url:'www.netflix.com', tags:['netflix', 'video', 'social'], date: new Date(Date.now())}
      ];

      tags = ['google','search','facebook','social','whatsapp','chat', 'netflix', 'video'];
      tags.sort();

      function getLinks(){
        return links;
      };

      function getTags(){
        return tags;
      };

      function getSearchFilter(){
        return search;
      };

      function setSearchFilter(value){
        search = value;
      };

      function getLinkById(id){
        return  _.find(links,function(rw){ return rw.id == id });
      };

      function addLink(title, url, _tags){
        var tagsfil = tagsFilter(_tags);

        //var d = new Date(1382086394000);
        links.unshift({
          id: links.length + 1,
          title: title,
          url: httpFilter(url),
          tags: tagsfil,
          date: new Date(Date.now())
        });

        updateTags();
      };
      
      function editLink(id, title, url, _tags){
        var link = getLinkById(id);
        var tagsfil = tagsFilter(_tags);

        link.title = title;
        link.url = url;
        link.tags = tagsfil;

        updateTags();
      };

      function deleteLink(id){
        var index = _.findIndex(links,function(rw){ return rw.id == id });
        links.splice(index, 1);
        updateTags();
      };

      function updateTags(){
        tags = [];
        _.each(links, function(link){
          _.each(link.tags, function(tag){
            if(tags.indexOf(tag) == -1) {
              tags.push(tag);
            }
          });
        });
      };

      function getTagsCount(tagName){
        var result = 0;
        _.each(links, function(link){
          if(link.tags.indexOf(tagName) !== -1) {
            result++;
          }
        });
        return result;
      };

      function getLinksByTag(tagName){
        links = [];
        return links;
      };

      return {
        getLinks: getLinks,
        getTags: getTags,
        getSearchFilter: getSearchFilter,
        setSearchFilter: setSearchFilter,
        getLinkById: getLinkById,
        addLink: addLink,
        editLink: editLink,
        deleteLink: deleteLink,
        getTagsCount: getTagsCount,
        getLinksByTag: getLinksByTag
      };
    }]
  );

})();
