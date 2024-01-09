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
            const line = oEvent.getParameter("arguments").line;
            const bindingpath =  "/POLIst/" + line;
            this.getview().bindElement(bindingpath);
        },
        gotohome: function(){
      
            const router = this.getOwnerComponent().getRouter();
            router.navTo("HomeRoute");

        }

        
    });
});