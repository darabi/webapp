import CommonScrollbars from '@common/core/CommonScrollbars';
import { ReactNode } from 'react';

/**
 * Props for the CommonPageCardedSidebarContent component.
 */
type CommonPageCardedSidebarContentProps = {
	innerScroll?: boolean;
	children?: ReactNode;
};

/**
 * The CommonPageCardedSidebarContent component is a content container for the CommonPageCardedSidebar component.
 */
function CommonPageCardedSidebarContent(props: CommonPageCardedSidebarContentProps) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<CommonScrollbars enable={innerScroll}>
			<div className="CommonPageCarded-sidebarContent">{children}</div>
		</CommonScrollbars>
	);
}

export default CommonPageCardedSidebarContent;
