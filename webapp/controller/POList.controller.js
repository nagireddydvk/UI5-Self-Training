sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "VNRDEMNAGI/model/util",
    "sap/m/Dialog",
    "sap/ui/core/Fragment",
    "sap/m/Button",
    "sap/m/MessageBox"
], function (Controller, util, Dialog, Fragment, Button, MessageBox) {
    "use strict";
    return Controller.extend("VNRDEMNAGI.controller.POList", {
        listOfFunctions: util,
        onInit: function(){
            this.oModel = this.getOwnerComponent().getModel();
        },
        gotoDetail: function(oEvent){
            const oSource = oEvent.getSource();
            const router = this.getOwnerComponent().getRouter();
            const sPONumber = oSource.getBindingContext().getProperty("Vbeln");
            
            router.navTo("Detail",{
                "id" : sPONumber,
            });

        },
        onCreate: async function(){
            if(! this.createDialog ){
                const oDialogContent = await Fragment.load({ 
                    "name": "VNRDEMNAGI.view.fragments.POcreate",
                     "type" : "XML"
                });
                  this.createDialog = new Dialog({
                    title: "PO Create",
                    content: oDialogContent,
                    endButton: new Button({
                          text: "Save",
                          press: this.createPO.bind(this)

                    })
                 });

                 this.getView().addDependent(this.createDialog); //link dialog with view
    
                }  

                const oContext = this.oModel.createEntry("/ORDERHEADERSet");
                this.createDialog.setBindingContext(oContext);
                this.createDialog.open();


        },
        onDelete: async function(oEvent){
                  const oContext = oEvent.getSource().getParent().getBindingContext();
                  const oResponse = await this.oModel.remove(oContext.getPath);

        },
        createPO: async function(abc){
              try {
                const oData = this.createDialog.getBindingContext().getObject();
                const oResponse = await this.oModel.create("/ORDERHEADERSet", oData);
              } catch (error) {
                MessageBox.error("Error :" + error.message);
              }finally {
                this.createDialog.close();
              }

        },
        showpopup: async function(oEvent){
            const line = oEvent.getSource().getParent().getBindingContext().getPath().split("/")[2];  // path to get the data
            if(! this.detailDialog ){
                const oDialogContent = await Fragment.load({ 
                    "name": "VNRDEMNAGI.view.fragments.POdetail",
                     "type" : "XML"
                });
                  this.detailDialog = new Dialog({
                    title: "PO Details",
                    content: oDialogContent
                 });
                 this.getView().addDependent(this.detailDialog); //link dialog with view
    
                }
                const bindingpath =  "/POLIst/" + line;
                this.detailDialog.bindElement(bindingpath);
                this.detailDialog.open();

            }
        
        
    });
});