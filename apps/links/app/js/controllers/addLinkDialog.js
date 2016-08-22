'use strict';

(function() {

  /**
   * @ngdoc function
   * @name webApp.controller:AddLinkDialogCtrl
   * @description
   * # AddLinkDialogCtrl
   * Controller of the webApp
   */
  angular.module('webApp')
    .controller('AddLinkDialogCtrl', [
      '$scope',
      'mdPanelRef',
      'LinksService',
      AddLinkDialogCtrl]);

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
