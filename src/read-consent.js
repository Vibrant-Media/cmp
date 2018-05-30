var COOKIE_NAME = 'euconsent';
var value = '; ' + document.cookie;
var parts = value.split('; ' + COOKIE_NAME + '=');
var consentStr = '';
if (parts.length === 2) {
	consentStr = parts.pop().split(';').shift();
}
window.parent.postMessage({ vmReadConsent: { consentStr: consentStr, consentData: {} } }, '*');
