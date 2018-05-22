function handleConsentResult(vendorList, vendorConsents) {
	if (!vendorList) {
		console.log('--No vendors were found.'); //Do Nothing
		return
	} else if (!vendorConsents) {
		console.log('--No consent data found. Showing consent tool');
		window.__cmp('showConsentTool');
		return
	}

	var vendorConsentsExpirationDate = new Date(vendorConsents.lastUpdated); //Creates date with last updated date
	vendorConsentsExpirationDate.setDate(vendorConsentsExpirationDate.getDate()+7); //adds 7 days to it
	//If version is different or it's been past 7 days since last update

	if ((vendorList.vendorListVersion !== vendorConsents.vendorListVersion) ||
		(new Date() > vendorConsentsExpirationDate)) {
		console.log('Consent was found for a different version ');
		window.__cmp('showFooter');
	}
}

(function(window, document) {
	if (!window.__cmp) {
		window.__cmp = (function() {
			var listen = window.attachEvent || window.addEventListener;
			listen('message', function(event) {
				window.__cmp.receiveMessage(event);
			}, false);

			function addLocatorFrame() {
				if (!window.frames['__cmpLocator']) {
					if (document.body) {
						var frame = document.createElement('iframe');
						frame.style.display = 'none';
						frame.name = '__cmpLocator';
						document.body.appendChild(frame);
					} else {
						setTimeout(addLocatorFrame, 5);
					}
				}
			}
			addLocatorFrame();

			var commandQueue = [];
			var cmp = function(command, parameter, callback) {
				if (command === 'ping') {
					if (callback) {
						callback({
							gdprAppliesGlobally: !!(window.__cmp && window.__cmp.config && window.__cmp.config.storeConsentGlobally),
							cmpLoaded: false
						});
					}
				} else {
					commandQueue.push({
						command: command,
						parameter: parameter,
						callback: callback
					});
				}
			};
			cmp.commandQueue = commandQueue;
			cmp.receiveMessage = function(event) {
				var data = event && event.data && event.data.__cmpCall;
				if (data) {
					commandQueue.push({
						callId: data.callId,
						command: data.command,
						parameter: data.parameter,
						event: event
					});
				}
			};
			cmp.config = {
				//
				// Modify config values here
				//
				globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
				customPurposeListLocation: 'https://vibrant.mgr.consensu.org/purposes.json',
				globalConsentLocation: 'https://vibrant.mgr.consensu.org/portal.html',
				storeConsentGlobally: true,
				logging: "debug"
			};
			return cmp;
		}());

		var script = document.createElement('script');
		script.async = false;
		script.src = 'https://vibrant.mgr.consensu.org/cmp.bundle.1.0.0.js';
		script.charset = 'utf-8';
		var head = document.getElementsByTagName('head')[0];

		window.__cmp('addEventListener', 'cmpReady', function(result) {
			//If cookies are not enabled, there's nothing we can do.
			if (!window.navigator.cookieEnabled) {
				console.log('--cookies are not enabled');
				return
			}

			window.__cmp('getVendorList', null, function(vendorList) {
				var timeout = setTimeout(function() {
					handleConsentResult(vendorList);
					console.log('timeout');
				}, 100);

				window.__cmp('getVendorConsents', null, function(vendorConsents) {
					clearTimeout(timeout);
					handleConsentResult(vendorList, vendorConsents);
				})
			});
		});

		head.appendChild(script);
	}
})(window, document);
