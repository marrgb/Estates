sap.ui.define([
	"sap/ui/test/Opa5",
	"com/ordago/estates/localService/mockserver"
], function (Opa5, mockserver) {
	"use strict";

	return Opa5.extend("com.ordago.estates.test.integration.pages.Common", {

		getEntitySet: function  (sEntitySet) {
			return mockserver.getMockServer().getEntitySetData(sEntitySet);
		}

	});

});
