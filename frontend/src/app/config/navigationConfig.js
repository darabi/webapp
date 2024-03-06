import i18next from 'i18next';
import de from './navigation-i18n/de';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('de', 'navigation', de);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'assessment',
		title: 'Assessment',
		translate: 'menu_assessment',
		type: 'item',
		icon: 'heroicons-outline:pencil-alt',
		url: 'assess'
	},
	{
		id: 'example-component',
		title: 'Hilfe',
		translate: 'menu_help',
		type: 'item',
		icon: 'heroicons-outline:question-mark-circle',
		url: 'example'
	}
];
export default navigationConfig;
