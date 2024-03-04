import Dialog from '@mui/material/Dialog';
import { useAppDispatch } from 'app/store/store';
import { useSelector } from 'react-redux';
import withSlices from 'app/store/withSlices';
import { closeDialog, commonDialogSlice, selectCommonDialogProps } from '@common/core/CommonDialog/store/commonDialogSlice';

/**
 * CommonDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function CommonDialog() {
	const dispatch = useAppDispatch();
	const options = useSelector(selectCommonDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="common-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default withSlices([commonDialogSlice])(CommonDialog);
