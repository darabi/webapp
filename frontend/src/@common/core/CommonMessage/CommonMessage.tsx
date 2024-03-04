import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import {
	hideMessage,
	commonMessageSlice,
	selectCommonMessageOptions,
	selectCommonMessageState
} from '@common/core/CommonMessage/store/commonMessageSlice';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import CommonSvgIcon from '../CommonSvgIcon';

export type CommonMessageVariantType = 'success' | 'error' | 'warning' | 'info';

type StyledSnackbarProps = {
	variant?: CommonMessageVariantType;
};

const StyledSnackbar = styled(Snackbar)<StyledSnackbarProps>(({ theme, variant }) => ({
	'& .CommonMessage-content': {
		...(variant === 'success' && {
			backgroundColor: green[600],
			color: '#FFFFFF'
		}),

		...(variant === 'error' && {
			backgroundColor: theme.palette.error.dark,
			color: theme.palette.getContrastText(theme.palette.error.dark)
		}),

		...(variant === 'info' && {
			backgroundColor: blue[600],
			color: '#FFFFFF'
		}),

		...(variant === 'warning' && {
			backgroundColor: amber[600],
			color: '#FFFFFF'
		})
	}
}));

const variantIcon = {
	success: 'check_circle',
	warning: 'warning',
	error: 'error_outline',
	info: 'info'
};

/**
 * CommonMessage
 * The CommonMessage component holds a snackbar that is capable of displaying message with 4 different variant. It uses the @mui/material React packages to create the components.
 */
function CommonMessage() {
	const dispatch = useAppDispatch();
	const state = useSelector(selectCommonMessageState);
	const options = useSelector(selectCommonMessageOptions);

	return (
		<StyledSnackbar
			{...options}
			open={state}
			onClose={() => dispatch(hideMessage())}
		>
			<SnackbarContent
				className="CommonMessage-content"
				message={
					<div className="flex items-center">
						{variantIcon[options.variant] && (
							<CommonSvgIcon color="inherit">{variantIcon[options.variant]}</CommonSvgIcon>
						)}
						<Typography className="mx-8">{options.message}</Typography>
					</div>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={() => dispatch(hideMessage())}
						size="large"
					>
						<CommonSvgIcon>heroicons-outline:x</CommonSvgIcon>
					</IconButton>
				]}
			/>
		</StyledSnackbar>
	);
}

export default withSlices([commonMessageSlice])(memo(CommonMessage));
