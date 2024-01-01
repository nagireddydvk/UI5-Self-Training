sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyController", {
        onInit: function () {
            var oData = {
                field1: 2,
                field2: 5,
                operator: null,
                parent: {
                operations: [
                    {id: "", text:""},
                    {id: "+", text:"Plus"},
                    {id: "*", text:"Multiply"}]
                }
            };
            //var oModel = new JSONModel(oData);
            var oModel = this.getOwnerComponent().getModel();
            oModel.setData(oData);
            //this.getView().setModel(oModel);
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
