sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("VNRDEMNAGI.controller.POList", {
        onInit: function(){
             const router =this.getOwnerComponent().getRouter();
             router.getRoute("Detail").attachPatternMatched(this._routeMatched,this);

        },

        _routeMatched: function(oEvent){
            const sMaterialGroupId = oEvent.getParameter("arguments").id;
            const oModel = this.getView().getModel();
            const sPath = oModel.createKey("/ORDERHEADERSet", {
                "Vbeln": sMaterialGroupId
            });
            this.getView().bindElement(sPath);
        },
        gotohome: function(){
      
            const router = this.getOwnerComponent().getRouter();
            router.navTo("HomeRoute");

        },
        goSave: function(){
           const oModel = this.getView().getModel();
           oModel.submitChanges({     success: function(oData) {   
                  // Success callback - handle successful submission        
                  sap.m.MessageToast.show("Changes submitted successfully!");    
                  this.getOwnerComponent().getRouter().navTo("Home");
                }.bind(this) ,    
                error: function(oError) {         
                    // Error callback - handle errors        
                    sap.m.MessageToast.show("Error while submitting changes");    
                 } 
                
        });
        }

        
    });
});