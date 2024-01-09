sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util"
], function (Controller,util) {
    "use strict";
    return Controller.extend("MyApp.controller.POList", {
        listOfFunctions: util,
        gotoDetail: function(oEvent){
            const oSource = oEvent.getSource();
            const sPath = oSource.getBindingContext().getPath();
            const lineClicked = sPath.split("/")[2];
            const router = this.getOwnerComponent().getRouter();
            router.navTo("Detail",{
                "line" : lineClicked,
            });

        }

        
    });
});