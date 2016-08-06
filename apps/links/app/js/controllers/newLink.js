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
    .controller('NewLinkCtrl', [
      '$scope',
      '$q',
      '$mdPanel',
      '$mdMedia',
      NewLinkCtrl])
    .controller('AddLinkDialogCtrl', [
      '$scope',
      'mdPanelRef',
      'LinksService',
      AddLinkDialogCtrl]);

  function NewLinkCtrl($scope, $q, $mdPanel, $mdMedia) {
    $scope._mdPanel = $mdPanel;
    
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
          'id': 0,
          'title':'',
          'url': '',
          'tags': ''
        }
      };
      return config;
    };

    $scope.newLink = function() {
      var config = $scope.getPanelConfig();
      $scope._mdPanel.open(config);
    };
  };

  function AddLinkDialogCtrl($scope, mdPanelRef, LinksService) {
    this._mdPanelRef = mdPanelRef;
    this.LinksService = LinksService;
  };

  AddLinkDialogCtrl.prototype.addLink = function() {
    this.LinksService.addLink(this.title, this.url, this.tags);
    this.closeDialog();
  };

  AddLinkDialogCtrl.prototype.editLink = function() {
    this.LinksService.editLink(this.id, this.title, this.url, this.tags);
    this.closeDialog();
  };

  AddLinkDialogCtrl.prototype.deleteLink = function() {
    this.LinksService.deleteLink(this.id, this.title, this.url, this.tags);
    this.closeDialog();
    this.LinksService.setSearchFilter("*");
  };

  AddLinkDialogCtrl.prototype.closeDialog = function() {
    this._mdPanelRef && this._mdPanelRef.close().then(function() {
      angular.element(document.querySelector('.demo-dialog-open-button')).focus();
    });
  };

})();
