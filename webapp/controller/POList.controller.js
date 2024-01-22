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

                    }),
                    beginButton: new Button({
                      text: "Close",
                      press: function(){
                        this.getParent().close();
                      }

                   }),                    
                 });

                 this.getView().addDependent(this.createDialog); //link dialog with view
    
                }  

                const oContext = this.oModel.createEntry("/ORDERHEADERSet");
                this.createDialog.setBindingContext(oContext);
                this.createDialog.open();


        },
        onDelete: async function(oEvent){
                  const oContext = oEvent.getSource().getParent().getBindingContext();
                  this.getView().setBusy(true);
                  const oResponse = await this.oModel.remove(oContext.getPath(), {
                    success: function(){
                      this.getView().setBusy(false);
                      MessageBox.success("Success");
                    }.bind(this),
                    error: function(oError){
                      this.getView().setBusy(false);
                      const sError = JSON.parse(oError.responseText).error.message.value;
                      MessageBox.error("Error occurred " + sError) ;
                    }.bind(this)
                  });

        },
        createPO: async function(abc){
            const oMessageManager = sap.ui.getCore().getMessageManager();
            const oMessageModel = oMessageManager.getMessageModel();
            
            const aMessages = oMessageModel.getData();
            if (aMessages.length > 0){
              MessageBox.error("Please fix errors in the dialog");
              return;
            }

            const mandatoryControl = sap.ui.getCore().byId("value3");
            const value = mandatoryControl.getValue();
            if (value == ""){
              mandatoryControl.setValueState("Error");
              mandatoryControl.setValueStateText("required field");
              return;
            }else {
              mandatoryControl.setValueState();
              mandatoryControl.setValueText();              
            }
            
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
                // const oDialogContent = await Fragment.load({ 
                //     "name": "VNRDEMNAGI.view.fragments.POdetail",
                //      "type" : "XML"
                // });
                const oDialogContent = await this.loadFragment({ 
                  "name": "VNRDEMNAGI.view.fragments.POdetail",
                   "autoPrefixId": true
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