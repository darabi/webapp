import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'app/store/types';
import { appSelector } from 'app/store/store';
import { ReactElement } from 'react';

type AppRootStateType = RootStateType<messageSliceType>;

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
	state: boolean;
	options: {
		variant: 'success' | 'error' | 'warning' | 'info';
		anchorOrigin: {
			vertical: 'top' | 'bottom';
			horizontal: 'left' | 'center' | 'right';
		};
		autoHideDuration: number | null;
		message: ReactElement | string;
	};
};

/**
 * The initial state of the message slice.
 */
const initialState: initialStateProps = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};

/**
 * The Message slice.
 */
export const commonMessageSlice = createSlice({
	name: 'commonMessage',
	initialState,
	reducers: {
		showMessage(state, action: PayloadAction<Partial<initialStateProps['options']>>) {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			};
		},
		hideMessage(state) {
			state.state = false;
		}
	}
});

export const { hideMessage, showMessage } = commonMessageSlice.actions;

export const selectCommonMessageState = appSelector((state: AppRootStateType) => state.commonMessage.state);

export const selectCommonMessageOptions = appSelector((state: AppRootStateType) => state.commonMessage.options);

export type messageSliceType = typeof commonMessageSlice;

export default commonMessageSlice.reducer;
