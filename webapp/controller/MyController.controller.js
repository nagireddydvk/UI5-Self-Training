sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyController", {
        onInit: function () {
            var oData = {
                field1: "Buhler",
                field2: ""
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        calculate: function () {
            const input1 = this.getView().getModel().getData().field1;
            const input2 = this.getView().getModel().getData().field2;
            const operator = this.getView().getModel().getData().operator;

            let output = 0;
            if (operator === "+"){
                output = parseInt(input1) + parseInt(input2);
            }else if (operator === "*"){
                output = parseInt(input1) * parseInt(input2);
            }

            const model = this.getView().getModel();
            let data = model.getData();
            data.output = output;
            model.setData(data);
        }
    });
});
