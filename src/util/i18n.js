import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
	// we init with resources
	resources: {
		en: {
			translations: {
				AppTitle: 'QR code participation service',
				'Clear data': 'Clear data',
			},
		},
		de: {
			translations: {
				AppTitle: 'QR Code Teilnehmererfassung',
				'Clear data': 'Zurücksetzen',
				'Generate code': 'Code generieren',
				'Create new data': 'Neue Erfassung',
				'Save the Image or make a screenshot to make the Code reusable.':
					'Speicher das Bild oder mache einen Screenshot um den Code weiter zu benutzen.',
				'Fill out the form': 'Füll das Formular aus',
				'First name': 'Vorname',
				'Last name': 'Nachname',
				Street: 'Straße',
				ZIP: 'PLZ',
				City: 'Stadt',
				Phone: 'Telefon',
				'Generate another code': 'Weiteren Code generieren',
				'Add customer': 'Kunde hinzufügen',
				'Add customers': 'Kunden hinzufügen',
				'Send summary': 'Zusammenfassung senden',
				remove: 'entfernen',
				Success: 'Erfolgreich',
				'Your summary has succesfully been send to':
					'Deine Zusammenfassung wurde erfolgreich versandt an',
				'Scan again': 'Nochmal scannen',
				Settings: 'Einstellungen',
				'E-mail adress': 'E-Mail-Adresse',
				'Custom fields': 'Zusatzfelder',
				Add: '+',
				'Start scanning': 'Scannen starten',
				Customer: 'Kunde',
				Customers: 'Kunden',
				'New data has been submitted on': 'Neuer Eintrag wurde gemacht am',
			},
		},
	},
	fallbackLng: 'en',
	debug: true,

	// have a common namespace used around the full app
	ns: ['translations'],
	defaultNS: 'translations',

	keySeparator: false, // we use content as keys

	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ',',
	},

	react: {
		wait: true,
	},
});

export default i18n;
