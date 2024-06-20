sap.ui.define([
    'tcs/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController,MessageBox,MessageToast, Fragment, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("tcs.fin.ap.controller.View2",{
        onInit: function(){
            //Step 1: get my router
            this.oRouter = this.getOwnerComponent().getRouter();
            //Step 2: Register the RMH event 
            this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
        },
        herculis: function(oEvent){
            //Extract the parameter
            var fruitId = oEvent.getParameter("arguments").fruitId;
            //Build the path again
            var sPath = "/" + fruitId;
            //Perform element binding
            this.getView().bindElement(sPath,{
                expand: 'ToSupplier'
            });
            // debugger;
        },
        onSupplierSelect: function(oEvent){
            //Step 1: Extract the path of the item
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            //Step 2: get the index of supplier
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            //Step 3: Use router to navigate
            this.oRouter.navTo("supplier",{
                suppId: sIndex
            });
        },
        oSupplierPopup: null,
        onFilterSupplier: function(){
            //Promises work in SAP UI5 - https://youtu.be/zY6gnfxgb9I
            //IF lo_alv IS NOT BOUND
            if(!this.oSupplierPopup){
                Fragment.load({
                    id: 'supplier',
                    name: 'tcs.fin.ap.fragments.popup',
                    type: 'XML',
                    controller: this
                }).then(function(oFragment){
                    //set global variable when first time object is created
                    this.oSupplierPopup = oFragment;
                    //The object is acting like remote control
                    this.oSupplierPopup.setTitle("Supplier");
                    //Allowing access of all models which view has access;also to fragment
                    this.getView().addDependent(this.oSupplierPopup, this);
                    //Dynamic binding with our fragment to show suppliers
                    this.oSupplierPopup.bindAggregation("items",{
                        path: '/supplier',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{city}',
                            icon: 'sap-icon://supplier'
                        })
                    });
                    this.oSupplierPopup.setMultiSelect(true);
                    this.oSupplierPopup.open();
                    

                }
                //explicitly passing my controller object to the promise function
                .bind(this));
                

            }else{
                this.oSupplierPopup.open();
            }
            
        },
        oCityPopup: null,
        oField: null,
        onF4Help: function(oEvent){
            this.oField = oEvent.getSource();
            //Promises work in SAP UI5 - https://youtu.be/zY6gnfxgb9I
            //IF lo_alv IS NOT BOUND
            if(!this.oCityPopup){
                Fragment.load({
                    id: 'city',
                    name: 'tcs.fin.ap.fragments.popup',
                    type: 'XML',
                    controller: this
                }).then(function(oFragment){
                    //set global variable when first time object is created
                    this.oCityPopup = oFragment;
                    //The object is acting like remote control
                    this.oCityPopup.setTitle("City");
                    //Allowing access of all models which view has access;also to fragment
                    this.getView().addDependent(this.oCityPopup, this);
                    //Dynamic binding with our fragment to show suppliers
                    this.oCityPopup.bindAggregation("items",{
                        path: '/cities',
                        template: new sap.m.ObjectListItem({
                            title: '{name}',
                            intro: '{state}',
                            icon: 'sap-icon://home'
                        })
                    });
                    this.oCityPopup.open();
                    

                }
                //explicitly passing my controller object to the promise function
                .bind(this));
                

            }else{
                this.oCityPopup.open();
            }
        },
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();
            var aFilter = [];
            if(sId.indexOf("city") !== -1){
                var oSelectedItem = oEvent.getParameter("selectedItem");
                var sVal = oSelectedItem.getTitle();
                this.oField.setValue(sVal);
            }else{
                var aItems = oEvent.getParameter("selectedItems");
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    aFilter.push(new Filter("name", FilterOperator.EQ, element.getTitle()));
                }
                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                var oTable = this.getView().byId("suppliers");
                oTable.getBinding("items").filter(oFilter);
            }
            
        },
        onSave: function(){

            MessageBox.confirm("Do you want to save",{
                title: "Wow",
                onClose: function(status){
                    if(status==="OK"){
                        MessageToast.show("Your order has been saved");
                    }else{
                        MessageBox.alert("Cancelled");
                    }
                }
            });

        },
        onCancel: function(){
            MessageBox.error("Oops! action was cancelled 😒");
        },
        onBack: function(){
            //Get the object of mother (app Container control)
            var oAppCon = this.getView().getParent();
            //Navigate to second view
            oAppCon.to("idView1");

            //MessageBox.confirm("this functionality is under construction");
        }
    });
});