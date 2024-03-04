import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/store';
import { selectCommonCurrentSettings, setDefaultSettings } from '@common/core/CommonSettings/store/commonSettingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@common/hooks/useThemeMediaQuery';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import { CommonSettingsConfigType } from '@common/core/CommonSettings/CommonSettings';
import { useSelector } from 'react-redux';
import { navbarToggle, navbarToggleMobile } from './store/navbarSlice';

type NavbarCloseButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar close button.
 */
function NavbarCloseButton(props: NavbarCloseButtonProps) {
	const {
		className = '',
		children = (
			<CommonSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</CommonSvgIcon>
		)
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings: CommonSettingsConfigType = useSelector(selectCommonCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarCloseButton;
