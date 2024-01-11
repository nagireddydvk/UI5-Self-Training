sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyApp.controller.POList", {
        onInit: function(){
             const router =this.getOwnerComponent().getRouter();
             router.getRoute("Detail").attachPatternMatched(this._routeMatched,this);

        },

        _routeMatched: function(oEvent){
            const sMaterialGroupId = oEvent.getParameter("arguments").id;
            const oModel = this.getView().getModel();
            const sPath = oModel.createKey("/C_MM_MaterialGroupValueHelp", {
                "MaterialGroup": sMaterialGroupId
            });
            this.getView().bindElement(sPath);
        },
        gotohome: function(){
      
            const router = this.getOwnerComponent().getRouter();
            router.navTo("HomeRoute");

        }

        
    });
});