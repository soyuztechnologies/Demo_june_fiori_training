sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    //my Component.js inherits from standard SAP UI5 class
    return UIComponent.extend("tcs.fin.ap.Component",{
        metadata: {
            manifest: "json"
        },
        init : function(){
            //here we will call base class contructor - prototype to invoke parent
            //Classname.prototype.PARENTCLASSFUNCTION
            UIComponent.prototype.init.apply(this);

            //get the router object
            var oRouter = this.getRouter();

            //call initilzation of the router
            oRouter.initialize();
        },
        // createContent: function(){

        //     //Create the object of our Root View
        //     var oView = new sap.ui.view({
        //         id:"idRoot",
        //         viewName: "tcs.fin.ap.view.App",
        //         type: "XML"
        //     });

        //     //Create Object of our Views = V1, V2
        //     var oView1 = new sap.ui.view({
        //         id:"idView1",
        //         viewName: "tcs.fin.ap.view.View1",
        //         type: "XML"
        //     });

        //     var oView2 = new sap.ui.view({
        //         id:"idView2",
        //         viewName: "tcs.fin.ap.view.View2",
        //         type: "XML"
        //     });

        //     //Get the object of container control from Root View
        //     var oAppCon = oView.byId("idAppCon");

        //     //Inculcate(Add) the view1 and view2 to the Container control
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
            
        //     return oView;

        //     //return new sap.m.Button({text: "Chala kya?"});
        // },
        destroy: function(){

        }
    });
});