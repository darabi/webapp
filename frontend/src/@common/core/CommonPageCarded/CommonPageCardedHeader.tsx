import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the CommonPageCardedHeader component.
 */
type CommonPageCardedHeaderProps = {
	header?: ReactNode;
};

/**
 * The CommonPageCardedHeader component is a header for the CommonPageCarded component.
 */
function CommonPageCardedHeader(props: CommonPageCardedHeaderProps) {
	const { header = null } = props;

	return <div className={clsx('CommonPageCarded-header', 'container')}>{header}</div>;
}

export default CommonPageCardedHeader;
