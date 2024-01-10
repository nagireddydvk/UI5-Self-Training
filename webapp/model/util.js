sap.ui.define([], function() {
    'use strict';
    return {
        toTwoDecimals: function(num,currency){
            const output = parseInt(num).toFixed(2);
            return output + " " + currency;
        }
    }
});