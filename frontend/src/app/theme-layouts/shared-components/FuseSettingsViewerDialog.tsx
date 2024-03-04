import { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { selectCommonCurrentSettings } from '@common/core/CommonSettings/store/commonSettingsSlice';
import CommonHighlight from '@common/core/CommonHighlight';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import qs from 'qs';
import Typography from '@mui/material/Typography';

type CommonSettingsViewerDialogProps = {
	className?: string;
};

/**
 * The settings viewer dialog.
 */
function CommonSettingsViewerDialog(props: CommonSettingsViewerDialogProps) {
	const { className = '' } = props;

	const [openDialog, setOpenDialog] = useState(false);
	const settings = useSelector(selectCommonCurrentSettings);

	const jsonStringifiedSettings = JSON.stringify(settings);
	const queryString = qs.stringify({
		defaultSettings: jsonStringifiedSettings,
		strictNullHandling: true
	});

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<div className={clsx('', className)}>
			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				onClick={handleOpenDialog}
				startIcon={<CommonSvgIcon>heroicons-solid:code</CommonSvgIcon>}
			>
				View settings as json/query params
			</Button>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Common Settings Viewer</DialogTitle>
				<DialogContent>
					<Typography className="mb-16 mt-24 text-16 font-bold">JSON</Typography>

					<CommonHighlight
						component="pre"
						className="language-json"
					>
						{JSON.stringify(settings, null, 2)}
					</CommonHighlight>

					<Typography className="mb-16 mt-24 text-16 font-bold">Query Params</Typography>

					{queryString}
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="contained"
						onClick={handleCloseDialog}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CommonSettingsViewerDialog;
