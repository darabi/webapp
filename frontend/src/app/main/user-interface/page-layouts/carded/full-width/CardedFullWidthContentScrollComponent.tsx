import { styled } from '@mui/material/styles';
import CommonPageCarded from '@common/core/CommonPageCarded';
import DemoHeader from '../../shared-components/DemoHeader';
import DemoContent from '../../shared-components/DemoContent';

const Root = styled(CommonPageCarded)({
	'& .CommonPageCarded-header': {},
	'& .CommonPageCarded-toolbar': {},
	'& .CommonPageCarded-content': {},
	'& .CommonPageCarded-sidebarHeader': {},
	'& .CommonPageCarded-sidebarContent': {}
});

/**
 * The CardedFullWidthContentScroll page.
 */
function CardedFullWidthContentScrollComponent() {
	return (
		<Root
			header={<DemoHeader />}
			content={<DemoContent />}
			scroll="content"
		/>
	);
}

export default CardedFullWidthContentScrollComponent;
