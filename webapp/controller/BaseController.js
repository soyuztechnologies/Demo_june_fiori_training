sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'tcs/fin/ap/util/formatter'
], function(Controller, Formatter) {
    'use strict';
    return Controller.extend("tcs.fin.ap.controller.BaseController",{
        //reusable variable
        formatter: Formatter,
        anubhav: 3.14,
        myReuseFunction: function(){
            alert("just for testing purpose");
        },
        onInit: function(){
            console.log("I am base class constructor");
        }
    });
});