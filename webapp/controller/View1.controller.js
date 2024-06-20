sap.ui.define([
    'tcs/fin/ap/controller/BaseController',
    'sap/m/MessageBox',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, MessageBox, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("tcs.fin.ap.controller.View1",{
        onInit: function(){
            //this is how you obtain the router object inside a controller
            this.oRouter = this.getOwnerComponent().getRouter();

            this.oRouter.getRoute("detail").attachMatched(this.herculis.bind(this));
        },
        herculis: function(oEvent){
            //Extract the parameter
            var fruitId = oEvent.getParameter("arguments").fruitId;
            //Build the path again
            var sPath = "/fruits/" + fruitId;
            //Perform element binding
            var oList = this.getView().byId("idList");
            var aItems = oList.getItems();
            for (let i = 0; i < aItems.length; i++) {
                const element = aItems[i];
                var sItemPath = element.getBindingContextPath();
                if(sItemPath === sPath){
                    oList.setSelectedItem(element);
                    return;
                }
            }
            
            // debugger;
        },
        onGoTo: function(sIndex){
            this.oRouter.navTo("detail",{
                fruitId: sIndex
            });
            //Get the object of mother (app Container control)
            //var oAppCon = this.getView().getParent();
            //Navigate to second view
            //oAppCon.to("idView2");
            // IF watermelone
            //     oAppCon.to(V4)
            // else
            //     oAppCon.to(v2)
            // endif
            //MessageBox.confirm("this functionality is under construction");
        },
        onItemPress: function(oEvent){

            //Just like last time we had a table (now a list) and a simple form (view 2)
            //acts as a source and target for element binding to transfer selected record by user
            //Step 1: Which item was selected by user
            var oSelectedItem = oEvent.getParameter("listItem");
            //Step 2: Get the path of the element of the seleected item
            //debugger;
            var sPath = oSelectedItem.getBindingContextPath();
            //Step 3: Get the object of target which is V2
            //var oView2 = this.getView().getParent().getPages()[1];

            //var oView2 = this.getView().getParent().getParent().getDetailPages()[0];

            //Step 4: Perform element binding with V2
            //oView2.bindElement(sPath);

            //Usually my path look like this - /fruits/index
            //extract the index which is unique for every fruit
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];

            this.onGoTo(sIndex);
        },
        onItemsDelete: function(){
            //Step 1: get the list object
            var oList = this.getView().byId("idList");
            //Step 2: get all the selected items on that list
            var aSelItems = oList.getSelectedItems();
            //Step 3: Loop at all these items
            for (let i = 0; i < aSelItems.length; i++) {
                const element = aSelItems[i];
                //Step 4: Delete each item one by one
                oList.removeItem(element);
            }
            
        },
        onSearch: function(oEvent){
            //Step 1: What is the value user is searching
            var sVal = oEvent.getParameter("query");
            //Step 2: Constrcust a filter object using model class
            //like a IF condition OP1 operator OP2 - name CONTAINS search_string
            var oFilter = new Filter("CATEGORY", FilterOperator.Contains, sVal);
            // var oFilterCat = new Filter("taste", FilterOperator.Contains, sVal);
            // //Step 3: It is mandatory to add this filter or Multiple filter in an array
            // var aFilter = [oFilter, oFilterCat];
            // //Construct a special OR filter
            // var oFilterMain = new Filter({
            //     filters: aFilter,
            //     and: false
            // });
            //Step 4: Get the filtering of list for items
            var oBinding = this.getView().byId("idList").getBinding("items");
            //Step 5: Apply the filtering on our binding
            oBinding.filter(oFilter);
        },
        onAddProduct: function(){
            this.oRouter.navTo("add");
        },
        onItemDelete: function(oEvent){
            //Step 1: get the object of the item on which user did a delete
            var oItemToBeDeleted = oEvent.getParameter("listItem");
            //Step 2: Get the list control object
            //this.getView().byId("idList")
            var oList = oEvent.getSource();
            //Step 3: Perform a deletion of the item
            oList.removeItem(oItemToBeDeleted);
        }
    });
});


