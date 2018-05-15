/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component.
 */
export default {
	gb: {
		intro: {
			title: 'Thanks for visiting'
		},
		purposes: {
			active: '',
			inactive: '',
			showVendors: '',
			cookies: {
				menu: '',
				title: '',
				description: ''
			},
			purpose1: {
				description: 'Allow storing or accessing information on a user’s device.'
			},
			purpose2: {
				description: `Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices  for that purpose.
                Will include following Features:
                <ul>
                    <li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
                    <li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
                    <li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
                </ul>`
			},
			purpose3: {
				description: `Allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.  
                Will include following Features:
                <ul>
                    <li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
                    <li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
                    <li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
                </ul>`
			},
			purpose4: {
				description: `Allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.  
                Will include following Features:
                <ul>
                    <li>Matching Data to Offline Sources - combining data from offline sources that were initially collected in other contexts.</li>
                    <li>Linking Devices - allow processing of a user’s data to connect such user across multiple devices.</li>
                    <li>Precise Geographic Location data - allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent.</li>
                </ul>`
			},
			purpose5: {
				menu: 'Measurement',
				title: 'Measurement',
				description: 'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the content.'
			}
		}
	},
	fr: {
		intro: {
			title: 'Merci de votre visite sur',
			description: 'Afin de gérer un site Web efficacement, Vibrant Media et certains tiers utilisent des cookies, accèdent et stockent des informations sur votre appareil à diverses fins. Divers tiers collectent également des données pour vous montrer du contenu personnalisé et des publicités. Certains tiers exigent votre consentement pour collecter des données afin de vous proposer du contenu personnalisé et des annonces.',
			acceptAll: 'J\'ai compris, Merci!',
			rejectAll: 'Gérer vos choix',
			showPurposes: 'Gérer vos choix'
		},
		details: {
			title: 'PRÉFÉRENCES DE CONFIDENTIALITÉ DE L\'UTILISATEUR',
			back: 'Retour',
			save: 'Sauvegarder et quitter'
		},
		purposes: {
			active: 'Active',
			inactive: 'Inactive',
			showVendors: 'Voir la liste complète des fournisseurs.',
			cookies: {
				menu: 'Comment utilisons-nous les cookies',
				title: 'Ce site utilise des cookies',
				description: ''
			},
			purpose1: {
				menu: 'Stockage d\'informations et accès',
				title: 'Stockage d\'informations et accès',
				description: 'Autoriser le stockage ou l\'accès aux informations sur l\'appareil d\'un utilisateur.'
			},
			purpose2: {
				menu: 'Personnaliser',
				title: 'Personnaliser',
				description: 'Autoriser le traitement des données d\'un utilisateur pour la création de publicité personnalisée (y compris la diffusion, l\'analyse et la création de rapports) en fonction des préférences ou des intérêts d\'un utilisateur connus ou inférer à partir de données collectées sur plusieurs sites, applications ou appareils; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:'
			},
			purpose3: {
				menu: 'Sélection d\'annonces, diffusion, rapport',
				title: 'Sélection d\'annonces, diffusion, rapport',
				description: 'Autoriser le traitement des données d\'un utilisateur pour fournir du contenu ou des publicités et mesurer la diffusion de ces contenus ou publicités, extraire des informations et générer des rapports pour comprendre l\'utilisation des services; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:'
			},
			purpose4: {
				menu: 'Sélection de contenu, diffusion, rapport',
				title: 'Sélection de contenu, diffusion, rapport',
				description: 'Autoriser le traitement des données d\'un utilisateur pour la création de contenu personnalisé (y compris la diffusion, l\'analyse et la création de rapports) en fonction des préférences ou des intérêts d\'un utilisateur connus ou inférer à partir de données collectées sur plusieurs sites, applications ou appareils; et / ou accéder ou stocker des informations sur des dispositifs à cette fin. Inclura les caractéristiques suivantes:'
			},
			purpose5: {
				menu: 'Métriques',
				title: 'Métriques',
				description: ''
			}
		},
		vendors: {
			title: 'Nos partenaires',
			rejectAll: 'Rejeter tout',
			acceptAll: 'Accepter tout',
			company: 'Compagnie',
			offOn: 'Inactive/Active',
			description: 'Aidez-nous à vous fournir une meilleure expérience en ligne! Nos partenaires utilisent des cookies et collectent des informations à partir de votre navigateur sur le Web pour vous fournir du contenu, diffuser des publicités pertinentes et comprendre les audiences Web.',
			moreChoices: 'Faire plus de choix'
		},
		footer: {
			message: 'Vous pouvez modifier vos paramètres de confidentialité',
			consentLink: 'ici'
		}
	},
	de: {
		intro: {
			title: 'Vielen Dank für Ihren Besuch auf',
			description: 'Wir und unsere Partner verwenden sogenannte Cookies (kleine Textdateien) im Webbrowser um zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können. Zukünftig benötigen wir wahrscheinlich ihr/euer Einverständnis dazu. Ein Beispiel, wie dies aussehen könnte, finden sie/findet ihr unter dieser Erklärung.',
			acceptAll: 'Alle Cookies akzeptieren',
			rejectAll: 'Alle Cookies ablehnen',
			showPurposes: 'Verwendungszwecke zeigen'
		},
		details: {
			title: 'Datenschutzeinstellungen',
			back: 'Abbrechen',
			save: 'Sichern und Beenden'
		},
		purposes: {
			active: 'Aktiv',
			inactive: 'Inaktiv',
			showVendors: 'Vollständige Liste der Partner anzeigen',
			cookies: {
				menu: 'Wie wir Cookies einsetzen',
				title: 'Diese Website verwendet Cookies',
				description: 'Unsere Partner und wir setzen Cookies (kleine Textdateien) und sammeln Informationen während des Surfens im Web in diesem Browser. Dies dient dazu zu verstehen, was unsere Besucher interessiert und entsprechend relevante Inhalte und Werbung anbieten zu können.'
				// description: ''
			},
			purpose1: {
				menu: 'Zugriff auf ein Gerät',
				title: 'Zugriff auf ein Gerät',
				description: 'Die Erlaubnis zum Speichern und Abrufen von Informationen auf dem Gerät eines Website-Besuchers.Das ist notwendig, um Cookies im Web-Browser zu speichern und zur Anzeige relevanter Informationen und Werbung abrufen zu können.'
				// description: ''
			},
			purpose2: {
				menu: 'Persönlich angepaßte Werbung',
				title: 'Persönlich angepaßte Werbung',
				description: 'Die Erlaubnis, Besucherdaten so zu verarbeiten und/oder zu speichern und abzurufen, dass persönlich angepaßte Werbung angeboten und angezeigt werden kann (dies umfaßt die Auslieferung, Messung und die Erstellung von Berichten darüber). Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
				// description: ''
			},
			purpose3: {
				menu: 'Analysen',
				title: 'Analysen',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von Inhalten oder Werbung zu verarbeiten, und zur Messung der Auslieferung solcher Inhalte oder Werbung. Umfasst ist die Gewinnung von Erkenntnissen und die Generierung von Berichten um die Nutzung des angebotenen Service zu verstehen, und/oder das Abrufen oder Speichern von Informationen auf Geräten zu diesem Zweck.'
				// description: ''
			},
			purpose4: {
				menu: 'Persönlich angepasste Inhalte',
				title: 'Persönlich angepasste Inhalte',
				description: 'Die Erlaubnis, Besucherdaten zur Anzeige von personalisierten Inhalten zu verarbeiten, und zur Messung der Auslieferung. Umfasst ist die Gewinnung von Erkenntnissen darüber und die Generierung von Berichten dazu. Dies erfolgt auf der Basis bekannter Präferenzen oder Interessen, oder durch das Schließen auf Präferenzen oder Interessen durch die Erfassung von Daten auch über verschiedene Websites, Apps oder Geräte hinweg zu diesem Zweck.'
				// description: ''
			},
			purpose5: {
				menu: 'Messung',
				title: 'Messung',
				description: 'Die Sammlung von Informationen über Ihre Verwendung des Inhalts und die Kombination mit zuvor gesammelten Informationen, die zum Messen, Verstehen und Berichten Ihrer Nutzung des Inhalts verwendet wird.',
				// description: ''
			}
		},
		vendors: {
			title: 'Unsere Partner',
			rejectAll: 'Alle ablehnen',
			acceptAll: 'Alle akzeptieren',
			company: 'Unternehmen',
			offOn: 'Aus/An',
			description: 'Helfen Sie uns, Ihnen einen besseren Service zu bieten! Unsere Partner verwenden Cookies Ihres Browsers, um quer durch das Web zu verstehen, was Sie interessiert und Ihnen entsprechend relevante Inhalte und Werbung anzubieten.',
			moreChoices: 'Weitere Auswahlmöglichkeiten'
		},
		footer: {
			message: 'Sie können Ihre Datenschutz-Einstellungen hier',
			consentLink: 'bearbeiten'
		}
	}
};
