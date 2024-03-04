import { styled } from '@mui/material/styles';
import CommonPageCarded from '@common/core/CommonPageCarded';
import { useEffect, useState } from 'react';
import useThemeMediaQuery from '@common/hooks/useThemeMediaQuery';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';
import DemoSidebar from '../../shared-components/DemoSidebar';

const Root = styled(CommonPageCarded)(() => ({
	'& .CommonPageCarded-header': {},
	'& .CommonPageCarded-toolbar': {},
	'& .CommonPageCarded-content': {},
	'& .CommonPageCarded-sidebarHeader': {},
	'& .CommonPageCarded-sidebarContent': {}
}));

/**
 * The CardedWithSidebarsContentScroll page.
 */
function CardedWithSidebarsPageScrollComponent() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);

	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
		setRightSidebarOpen(!isMobile);
	}, [isMobile]);

	return (
		<Root
			header={
				<DemoHeader
					leftSidebarToggle={() => {
						setLeftSidebarOpen(!leftSidebarOpen);
					}}
					rightSidebarToggle={() => {
						setRightSidebarOpen(!rightSidebarOpen);
					}}
				/>
			}
			content={<DemoContent />}
			leftSidebarOpen={leftSidebarOpen}
			leftSidebarOnClose={() => {
				setLeftSidebarOpen(false);
			}}
			leftSidebarContent={<DemoSidebar />}
			rightSidebarOpen={rightSidebarOpen}
			rightSidebarOnClose={() => {
				setRightSidebarOpen(false);
			}}
			rightSidebarContent={<DemoSidebar />}
			scroll="page"
		/>
	);
}

export default CardedWithSidebarsPageScrollComponent;
