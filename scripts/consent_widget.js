var synchedCookie;

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

	if (synchedCookie && synchedCookie.lastPrompDate) {
		var expirationDate = parseInt(synchedCookie.lastPrompDate)+(7*24*60*60); //7 Days
		var date = Date.now();
		if (expirationDate < date) {
			window.__cmp('showFooter');
		}
	}
}

window.cookieSyncCallback = function (data) {
	synchedCookie = data;
	clearTimeout(window.consentTimeout);
	window.cmpCall();
};

var callConsentSync = function (_consentString, _lastPrompDate) {
	window.consentTimeout = setTimeout(function () {
		console.log('sync consent timeout');
		window.cmpCall();
	}, 500);

	var script = document.createElement('script');
	if (_consentString && _lastPrompDate) {
		script.setAttribute('src', 'http://k.intellitxt.com/csync/0?callback=cookieSyncCallback&consentStr='+_consentString+'&lastPrompDate='+_lastPrompDate);
	} else if (_consentString) {
		script.setAttribute('src', 'http://k.intellitxt.com/csync/0?callback=cookieSyncCallback&consentStr='+_consentString);
	} else {
		script.setAttribute('src', 'http://k.intellitxt.com/csync/0?callback=cookieSyncCallback&consentStr=undefined&lastPrompDate=undefined');
	}

	document.getElementsByTagName('head')[0].appendChild(script);
};

(function(window, document) {
	// Add eventlistener to catch the postmessage from the iframe
	window.addEventListener('message', function (event) {
		// Only look at messages with the vendorConsent property
		var data = event.data.vmReadConsent;
		if (event.data.vmReadConsent) {
			var consentStr = data.consentStr || '';
			if (consentStr.length) {
				callConsentSync(consentStr);
			} else {
				window.cmpCall();
			}
		}
	});

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
					storeConsentGlobally: true,
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
				var consentDataTimeout = setTimeout(function () {
					console.log('timeout');
				}, 200);
				window.__cmp('getConsentData', null, function(data) {
					clearTimeout(consentDataTimeout);
					callConsentSync(data.consentData, Date.now());
				});
			});

			//OnFooter Close
			window.__cmp('addEventListener', 'onClose', function (data) {
				var consentDataTimeout = setTimeout(function () {
					console.log('timeout');
				}, 200);
				window.__cmp('getConsentData', null, function(data) {
					clearTimeout(consentDataTimeout);
					callConsentSync(data.consentData, Date.now());
				});
			});
		}
	};

	// Create the iframe in the correct domain to read the cookie
	var iframe = document.createElement('iframe');
	iframe.setAttribute('style', 'width:1px;height:1px;position:absolute;left:-99px;top:-99px;');
	iframe.setAttribute('src', 'https://vibrant.mgr.consensu.org/readconsent.html');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(iframe);

	// set a global timeout
	var globalTimer = setTimeout(function() {
		// console.log('CMP: Global timeout');
	}, 1000);

})(window, document);
