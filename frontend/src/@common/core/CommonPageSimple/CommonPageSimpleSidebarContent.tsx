import CommonScrollbars from '@common/core/CommonScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the CommonPageSimpleSidebarContent component.
 */
type CommonPageSimpleSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The CommonPageSimpleSidebarContent component is a content container for the CommonPageSimpleSidebar component.
 */
function CommonPageSimpleSidebarContent(props: CommonPageSimpleSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CommonScrollbars enable={innerScroll}>
			<div className="CommonPageSimple-sidebarContent">{children}</div>
		</CommonScrollbars>
	);
}

export default CommonPageSimpleSidebarContent;
