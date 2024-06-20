sap.ui.define([
    'tcs/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/routing/History"
], function(BaseController,MessageBox,MessageToast,History) {
    'use strict';
    return BaseController.extend("tcs.fin.ap.controller.View3",{
        onInit: function(){
            //Step 1: get my router
            this.oRouter = this.getOwnerComponent().getRouter();
            //Step 2: Register the RMH event 
            this.oRouter.getRoute("supplier").attachMatched(this.herculis.bind(this));
        },
        herculis: function(oEvent){
            //Extract the parameter
            var suppId = oEvent.getParameter("arguments").suppId;
            //Build the path again
            var sPath = "/supplier/" + suppId;
            //Perform element binding
            this.getView().bindElement(sPath);
            // debugger;
        },
        onBack: function(){
            const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("detail", {fruitId: 0}, true);
			}
        }
    });
});