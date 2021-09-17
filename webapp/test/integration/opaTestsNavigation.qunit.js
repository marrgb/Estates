/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"sap/ui/test/Opa5",
		"com/ordago/estates/test/integration/arrangements/Startup",
		"com/ordago/estates/test/integration/NavigationJourney"
	], function (Opa5, Startup) {

		Opa5.extendConfig({
			arrangements: new Startup(),
			viewNamespace: "com.ordago.estates.view.",
			autoWait: true
		});

		QUnit.start();
	});
});