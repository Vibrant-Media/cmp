const COOKIE_NAME = 'euconsent';
const value = '; ' + document.cookie;
const parts = value.split('; ' + COOKIE_NAME + '=');
let consentStr = '';
if (parts.length === 2) {
	consentStr = parts.pop().split(';').shift();
}
window.parent.postMessage({ vmReadConsent: { consentStr, consentData: {}} }, '*');
