sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util",
    "sap/m/Dialog",
    "sap/ui/core/Fragment"
], function (Controller, util, Dialog, Fragment) {
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

        },
        showpopup: async function(oEvent){
            const line = oEvent.getSource().getParent().getBindingContext().getPath().split("/")[2];
            if(! this.detailDialog ){
                const oDialogContent = await Fragment.load({
                    "name": "MyApp.view.fragments.POdetail",
                     "type" : "XML"
                });
                  this.detailDialog = new Dialog({
                    title: "PO Details",
                    content: oDialogContent
                 });
                 this.getView().addDependent(this.detailDialog);
    
                }
                const bindingpath =  "/POLIst/" + line;
                this.detailDialog.bindElement(bindingpath);
                this.detailDialog.open();

            }
        
        
    });
});