var vmCookieExpiryDays = 365;
var vmCookieName = 'VM_CONSENT';
var vmCookieExpiration =  Date.now() + 7*24*60*60*1000; // Expire in 7 days

function handleConsentResult(vendorList, vendorConsents) {
	if (!vendorList) {
		// console.log('--No vendors were found.'); //Do Nothing
		return;
	} else if (!vendorConsents) {
		// console.log('--No consent data found. Showing consent tool');
		window.__cmp('showConsentTool');
		return;
	} else if (vendorList.vendorListVersion !== vendorConsents.vendorListVersion) {
		window.__cmp('showFooter');
		return;
	}

	var vmConsentCookie = getVMCookie('VM_CONSENT');
	if(vmConsentCookie && vmConsentCookie.length) {
		vmConsentCookie = JSON.parse(vmConsentCookie);
		if (vmConsentCookie && vmConsentCookie.lastPrompDate < Date.now()) { // Expired?
			window.__cmp('showFooter');
		}
	}

}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var setVMCookie = function (_consentStr, _lastPrompDate) {

	var vmCookie = getVMCookie(vmCookieName);
	var lastPrompDate;
	if (_lastPrompDate) {
		lastPrompDate = _lastPrompDate;
	} else if (vmCookie && vmCookie.length) {
		vmCookie = JSON.parse(vmCookie);
		if (vmCookie.lastPrompDate) {
			lastPrompDate = vmCookie.lastPrompDate;
		} else {
			lastPrompDate = vmCookieExpiration;
		}
	} else {
		lastPrompDate = vmCookieExpiration;
	}

	var cookieData = {
		consentStr: _consentStr,
		consentExpiryDate: Date.now() + 86400000, //Expires in 24hrs
		lastPrompDate: lastPrompDate
	};

	var cookieDataJson = JSON.stringify(cookieData);

	setCookie(vmCookieName, cookieDataJson, 365);
};

var getVMCookie = function (cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
};

(function(window, document) {
	// Add eventlistener to catch the postmessage from the iframe
	window.addEventListener('message', function (event) {
		// Only look at messages with the vendorConsent property
		var data = event.data.vmReadConsent;
		if (data) {
			clearTimeout(globalTimer);
			var consentStr = data.consentStr || '';
			// write a local cookie
			if (consentStr.length) {
				setVMCookie(consentStr);
			}
			cmpCall();
		}
	});
	var cmpCall = function () {
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
			script.src = 'https://vibrant.mgr.consensu.org/cmp.bundle.1.0.2.js';
			// script.src = '../cmp.bundle.1.0.3.js';
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
					}, 100);

					window.__cmp('getVendorConsents', null, function(vendorConsents) {
						clearTimeout(timeout);
						handleConsentResult(vendorList, vendorConsents);
					})
				});
			});

			head.appendChild(script);
		}
	}

	// Create the iframe in the correct domain to read the cookie
	var iframe = document.createElement('iframe');
	iframe.setAttribute('style', 'width:1px;height:1px;position:absolute;left:-99px;top:-99px;');
	iframe.setAttribute('src', 'https://vibrant.mgr.consensu.org/readconsent.html');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(iframe);

	// set a global timeout
	var globalTimer = setTimeout(function() {
		console.log('CMP: Global Time out');
	}, 1000);

})(window, document);
