import translations from './translations';
import config from './config';

export function findLocale() {
	let locale;

	let req = new XMLHttpRequest();
	req.open('GET', document.location, false);
	req.send(null);
	let contentLanguageHeader = req.getResponseHeader('Content-Language');
	if (config.forceLocale) {
		locale = config.forceLocale;
	} else if (contentLanguageHeader) {
		locale = contentLanguageHeader.split('-')[0];
	} else {
		locale = (navigator && (
			navigator.language ||
			navigator.browserLanguage ||
			navigator.userLanguage ||
			(navigator.languages && navigator.languages[0]) ||
			'en'
		));
	}

	return locale.toLowerCase();
}


export class Localize {
	constructor(localizedData = {...translations, ...config.localization}) {
		const localizedMap = this.processLocalized(localizedData);
		const currentLocal = findLocale();
		const [language] = currentLocal.split('-');
		this.localizedValues = {
			...localizedMap[language],
			...localizedMap[currentLocal]
		};
	}

	lookup = key => {
		return this.localizedValues[key];
	};

	processLocalized = (data = {}) => {
		const locales = Object.keys(data);
		return locales.reduce((acc, locale) => {
			const [language] = locale.toLowerCase().split('-');
			return {
				...acc,
				[locale]: {
					...acc[locale],
					...this.flattenObject(data[language]),
					...this.flattenObject(data[locale])
				}
			};
		}, {});
	};

	flattenObject = (data) => {
		const flattened = {};

		function flatten(part, prefix) {
			Object.keys(part).forEach(key => {
				const prop = prefix ? `${prefix}.${key}` : key;
				const val = part[key];

				if (typeof val === 'object') {
					return flatten(val, prop);
				}

				flattened[prop] = val;
			});
		}

		flatten(data);
		return flattened;
	};
}
