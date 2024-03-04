import { styled } from '@mui/material/styles';
import CommonPageSimple from '@common/core/CommonPageSimple';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

const Root = styled(CommonPageSimple)(({ theme }) => ({
	'& .CommonPageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .CommonPageSimple-toolbar': {},
	'& .CommonPageSimple-content': {},
	'& .CommonPageSimple-sidebarHeader': {},
	'& .CommonPageSimple-sidebarContent': {}
}));

/**
 * The SimpleFullWidthContentScroll page.
 */
function SimpleFullWidthContentScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="content"
		/>
	);
}

export default SimpleFullWidthContentScrollComponent;
