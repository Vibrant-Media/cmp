
function handleConsentResult(vendorList, vendorConsents) {
	if (!vendorList) {
		return;
	} else if (!vendorConsents) {
		window.__cmp('showConsentTool');
		return;
	} else if (vendorList.vendorListVersion !== vendorConsents.vendorListVersion) {
		window.__cmp('showFooter');
		return;
	}
	var lastPrompDate = getLastPrompDate();
	if (lastPrompDate) {
		var expirationDate = parseInt(lastPrompDate)+(7*24*60*60); //7 Days
		var today = Date.now();
		if (expirationDate < today) {
			window.__cmp('showFooter');
		}
	}
}

var setLastPrompDate = function (lastPrompDate) {
	window.localStorage.setItem('lastPrompDate', lastPrompDate);
};

var getLastPrompDate = function () {
	return localStorage.getItem('lastPrompDate');
};

(function(window, document) {

	window.cmpCall = function () {
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
					storeConsentGlobally: false,
					logging: 'debug'
				};
				return cmp;
			}());

			var script = document.createElement('script');
			script.async = false;
			script.src = 'https://vibrant.mgr.consensu.org/cmp.bundle.1.0.4.js';
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
					}, 300);

					window.__cmp('getVendorConsents', null, function(vendorConsents) {
						clearTimeout(timeout);
						handleConsentResult(vendorList, vendorConsents);
					})
				});
			});

			head.appendChild(script);

			window.__cmp('addEventListener', 'onSubmit', function(result) {
				setLastPrompDate(Date.now());
			});

			//OnFooter Close
			window.__cmp('addEventListener', 'onClose', function (data) {
				setLastPrompDate(Date.now());
			});
		}
	};
	window.cmpCall();

	// set a global timeout
	var globalTimer = setTimeout(function() {
		// console.log('CMP: Global timeout');
	}, 1000);

})(window, document);
