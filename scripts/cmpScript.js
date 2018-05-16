function handleConsentResult(vendorList, vendorConsents) {
    if (!vendorList) {
        console.log('--No vendors were found.'); //Do Nothing
        return
    } else if (!vendorConsents) {
        console.log('--No consent data found. Showing consent tool');
        window.__cmp('showConsentTool');
    } else if (vendorList.vendorListVersion !== vendorConsents.vendorListVersion) {
        console.log('Consent was found for a different version ');

        let vendorConsentsExpirationDate = new Date(vendorConsents.lastUpdated); //Creates date with last updated date
        vendorConsentsExpirationDate.setDate(vendorConsentsExpirationDate.getDate()+30); //adds 30 days to it

        if (new Date() > vendorConsentsExpirationDate) {
            console.log('--And this version is older than 30 days. Showing Footer');
            window.__cmp('showFooter');
        }
    }
}

(function(window, document) {
    if (!window.__cmp) {
        window.__cmp = (function() {
            let listen = window.attachEvent || window.addEventListener;
            listen('message', function(event) {
                window.__cmp.receiveMessage(event);
            }, false);

            function addLocatorFrame() {
                if (!window.frames['__cmpLocator']) {
                    if (document.body) {
                        let frame = document.createElement('iframe');
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

            var _themeColor;
            var _customLogo;

            if(window.__vibrantGdprWidgetCustomizer) {
                _themeColor = window.__vibrantGdprWidgetCustomizer.getCustomThemeColor() ? window.__vibrantGdprWidgetCustomizer.getCustomThemeColor() : null
                _customLogo = window.__vibrantGdprWidgetCustomizer.getCustomImage() ? window.__vibrantGdprWidgetCustomizer.getCustomImage() : null
            }
            cmp.config = {
                //
                // Modify config values here
                //
                globalVendorListLocation: 'https://vendorlist.consensu.org/vendorlist.json',
                customPurposeListLocation: 'http://mymachine.intellitxt.com:8088/docs/purposes.json',
                globalConsentLocation: 'http://mymachine.intellitxt.com:8088/docs/portal.html',
                storeConsentGlobally: true,
                // storePublisherData: false,
                logging: 'debug',
                // localization: {},
                // forceLocale: 'en-us',
                themeColor: _themeColor,
                customLogo: _customLogo
            };
            return cmp;
        }());

        var script = document.createElement('script');
        script.async = false;
        script.src = '//localhost:8088/cmp.complete.bundle.js';
        var head = document.getElementsByTagName('head')[0];

        window.__cmp('addEventListener', 'cmpReady', function(result) {
            //If cookies are not enabled, there's nothing we can do.

            document.cookie="testcookie";
            var cookieEnabled = (document.cookie.indexOf("testcookie") !== -1);


            if (!window.navigator.cookieEnabled || !cookieEnabled) {
                console.log('--cookies are not enabled');
                // window.__cmp('showConsentTool', null, function(result) {}); // Should we still display the consent tool?
                return
            }

            window.__cmp('getVendorList', null, function(vendorList) {
                var timeout = setTimeout(() => {
                    handleConsentResult(vendorList);
                    console.log('timeout');
                }, 100);

                window.__cmp('getVendorConsents', null, function(vendorConsents) {
                    console.log('getVendorConsents');
                    clearTimeout(timeout);
                    handleConsentResult(vendorList, vendorConsents);
                })
            });
        });

        head.append(script);
    }
})(window, document);
