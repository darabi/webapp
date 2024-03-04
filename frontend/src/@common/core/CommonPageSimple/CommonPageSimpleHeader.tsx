import clsx from 'clsx';
import { ReactNode } from 'react';

/**
 * Props for the CommonPageSimpleHeader component.
 */
type CommonPageSimpleHeaderProps = {
	className?: string;
	header?: ReactNode;
};

/**
 * The CommonPageSimpleHeader component is a sub-component of the CommonPageSimple layout component.
 * It provides a header area for the layout.
 */
function CommonPageSimpleHeader(props: CommonPageSimpleHeaderProps) {
	const { header = null, className } = props;
	return (
		<div className={clsx('CommonPageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default CommonPageSimpleHeader;
