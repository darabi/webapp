import { CommonNavItemType } from './types/CommonNavItemType';

const components: { [key: string]: React.FC<unknown> } = {};

/**
 * Register a component to CommonNavItem.
 */
export function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
	components[name] = Component as React.FC<unknown>;
}

export type CommonNavItemComponentProps = {
	type: string;
	item: CommonNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: CommonNavItemType) => void;
	checkPermission?: boolean;
};

/**
Component to render NavItem depending on its type.
*/
export default function CommonNavItem(props: CommonNavItemComponentProps) {
	const { type } = props;

	const C = components[type];

	return C ? <C {...(props as object)} /> : null;
}
