sap.ui.define([
    'tcs/fin/ap/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("tcs.fin.ap.controller.App",{
        onInit: function(){
           //if we want to call base class constructor
           BaseController.prototype.onInit.apply(this);
        }
    });
});