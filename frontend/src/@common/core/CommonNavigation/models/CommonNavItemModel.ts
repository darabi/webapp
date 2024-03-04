import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { CommonNavItemType } from '../types/CommonNavItemType';

/**
 *  CommonNavItemModel
 *  Constructs a navigation item based on CommonNavItemType
 */
function CommonNavItemModel(data?: PartialDeep<CommonNavItemType>) {
	data = data || {};

	return _.defaults(data, {
		id: _.uniqueId(),
		title: '',
		translate: '',
		auth: null,
		subtitle: '',
		icon: '',
		iconClass: '',
		url: '',
		target: '',
		type: 'item',
		sx: {},
		disabled: false,
		active: false,
		exact: false,
		end: false,
		badge: null,
		children: []
	});
}

export default CommonNavItemModel;
