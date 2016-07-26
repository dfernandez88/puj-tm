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
    .controller('MainCtrl', [
      '$scope',
      '$q',
      '$mdSidenav',
      '$mdPanel',
      '$mdMedia',
      'LinksService',
      'httpFilter',
      MainCtrl])
    .controller('AddLinkDialogCtrl', [
      '$scope',
      'mdPanelRef',
      AddLinkDialogCtrl]);

  function MainCtrl($scope, $q, $mdSidenav, $mdPanel, $mdMedia, LinksService, httpFilter) {
    $scope._mdPanel = $mdPanel;
    $scope.disableParentScroll = false;

    $scope.links = LinksService.getLinks();
    console.log($scope.links);
    /*$scope.$watch(function() { 
      console.log($mdMedia('md'));
      return $mdMedia('lg'); 
    });*/

    $scope.getMinRes = function(){
      return $mdMedia('gt-xs');
    };

    
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.getPanelConfig = function() {
      var position = $scope._mdPanel.newPanelPosition()
        .absolute()
        .center();
      var config = {
        attachTo: angular.element(document.body),
        controller: AddLinkDialogCtrl,
        controllerAs: 'ctrl',
        disableParentScroll: $scope.disableParentScroll ,
        templateUrl: 'views/panel.tmpl.html',
        hasBackdrop: true,
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        locals: {
          'type': 'new',
          'index': 0,
          'title':'',
          'url': '',
          'tags': '',
          'LinksService':LinksService
        }
      };
      return config;
    };

    $scope.newLink = function() {
      var config = $scope.getPanelConfig();
      $scope._mdPanel.open(config);
    };

    $scope.editLink = function(index) {
      var edit = $scope.links[index];
      var config = $scope.getPanelConfig();
      config["locals"] = {
        'type': 'edit',
        'index': index,  
        'title': edit.title,
        'url': httpFilter(edit.url),
        'tags': edit.tags,
        'LinksService':LinksService
      }
      $scope._mdPanel.open(config);
    };

    $scope.deleteLink = function(index) {
      LinksService.deleteLink(index);
    };
  }

  function AddLinkDialogCtrl($scope, mdPanelRef) {
    this._mdPanelRef = mdPanelRef;
  }

  AddLinkDialogCtrl.prototype.addLink = function() {
    this.LinksService.addLink(this.title, this.url, this.tags);
    this.closeDialog();
  };

  AddLinkDialogCtrl.prototype.editLink = function() {
    this.LinksService.editLink(this.index, this.title, this.url, this.tags);
    this.closeDialog();
  };

  AddLinkDialogCtrl.prototype.closeDialog = function() {
    this._mdPanelRef && this._mdPanelRef.close().then(function() {
      angular.element(document.querySelector('.demo-dialog-open-button')).focus();
    });
  };

})();
