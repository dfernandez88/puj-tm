'use strict';

(function() {

  /**
   * @ngdoc function
   * @name webApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the webApp
   */
  angular.module('webApp')
    .controller('MenuCtrl', [
      '$scope',
      '$q',
      '$mdSidenav',
      '$mdMedia',
      'LinksService',
      MenuCtrl]);

  function MenuCtrl($scope, $q, $mdSidenav, $mdMedia, LinksService) {
    $scope.disableParentScroll = false;
    //$scope.links = "social";
    $scope.tagFilter = "social";

    $scope.tags = LinksService.getTags();
    $scope.tags.sort();
    //console.log($scope.links);
    /*$scope.$watch(function() { 
      console.log($mdMedia('md'));
      return $mdMedia('lg'); 
    });*/

    $scope.$watch(function() { return LinksService.getTags(); },
      function(value) {
        $scope.tags = value;
        $scope.tags.sort();
      }
    );

    $scope.getMinRes = function(){
      return $mdMedia('gt-xs');
    };

    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.searchByTag = function(tagName){
      LinksService.setSearchFilter(tagName);
      $mdSidenav('left').close();
    };

    $scope.searchByAllTags = function(){
      LinksService.setSearchFilter("*");
      $mdSidenav('left').close();
    };

    $scope.getAllLinksCount = function(){
      return LinksService.getLinks().length;
    };

    $scope.getTagsCount = function(tagName){
      return LinksService.getTagsCount(tagName);
    };
  }

})();
