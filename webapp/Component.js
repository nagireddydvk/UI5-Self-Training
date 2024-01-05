sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";
    return UIComponent.extend("MyApp.Component", {
        metadata : {
            manifest: "json"      //read manifest file
        },
         init: function () {
        //     // call the base component's init function. In ABAP we have this.super()
             UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

         }        
    });
});
