sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyApp.controller.PODetail", {
        gotohome: function(){
      
            const router = this.getOwnerComponent().getRouter();
            router.navTo("HomeRoute");

        }

        
    });
});