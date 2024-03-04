import { SxProps } from '@mui/system';
import { CommonNavBadgeType } from './CommonNavBadgeType';

/**
 * CommonNavItemType
 * A type for Common navigation item and its properties.
 */
export type CommonNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: CommonNavBadgeType;
	children?: CommonNavItemType[];
	hasPermission?: boolean;
};

export type CommonFlatNavItemType = Omit<CommonNavItemType, 'children' | 'sx'> & { children?: string[]; order: string };
