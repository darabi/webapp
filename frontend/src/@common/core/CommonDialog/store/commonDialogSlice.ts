import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { ReactElement } from 'react';

type AppRootStateType = RootStateType<dialogSliceType>;

type InitialStateProps = {
	open: boolean;
	children: ReactElement | string;
};

/**
 * The initial state of the dialog slice.
 */
const initialState: InitialStateProps = {
	open: false,
	children: ''
};

/**
 * The Common Dialog slice
 */
export const commonDialogSlice = createSlice({
	name: 'commonDialog',
	initialState,
	reducers: {
		openDialog: (state, action: PayloadAction<{ children: InitialStateProps['children'] }>) => {
			state.open = true;
			state.children = action.payload.children;
		},
		closeDialog: () => initialState
	}
});

export const { closeDialog, openDialog } = commonDialogSlice.actions;

export const selectCommonDialogState = appSelector((state: AppRootStateType) => state.commonDialog.open);

export const selectCommonDialogProps = appSelector((state: AppRootStateType) => state.commonDialog);

export type dialogSliceType = typeof commonDialogSlice;

export default commonDialogSlice.reducer;
