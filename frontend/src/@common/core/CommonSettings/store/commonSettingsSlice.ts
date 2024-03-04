import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions
} from '@common/default-settings';
import settingsConfig from 'app/config/settingsConfig';
import themeLayoutConfigs from 'app/theme-layouts/themeLayoutConfigs';
import { resetUser, setUser, setUserSettings } from 'app/auth/user/store/userSlice';
import { darkPaletteText, lightPaletteText } from 'app/config/themesConfig';
import { AppThunk, RootStateType } from 'app/store/types';
import { CommonSettingsConfigType, CommonThemesType, CommonThemeType } from '@common/core/CommonSettings/CommonSettings';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { PartialDeep } from 'type-fest';
import { appSelector } from 'app/store/store';
import { showMessage } from '@common/core/CommonMessage/store/commonMessageSlice';

type AppRootStateType = RootStateType<settingsSliceType>;

export const changeCommonTheme =
	(theme: CommonThemesType): AppThunk<void> =>
	(dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const settings = AppState.commonSettings;

		const { navbar, footer, toolbar, main } = theme;

		const newSettings: CommonSettingsConfigType = {
			...settings.current,
			theme: {
				main,
				navbar,
				toolbar,
				footer
			}
		};

		dispatch(setDefaultSettings(newSettings)).then(() => {
			dispatch(showMessage({ message: 'User theme selection saved with the api' }));
		});
	};

type layoutProps = {
	style: string;
	config: unknown;
};

/**
 * Gets the initial settings for the application.
 */
function getInitialSettings(): CommonSettingsConfigType {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';

	const layout: layoutProps = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults
	};

	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

/**
 * Generates the settings object by merging the default settings with the new settings.
 */
export function generateSettings(
	_defaultSettings: PartialDeep<CommonSettingsConfigType>,
	_newSettings: CommonSettingsConfigType
) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings
	);
}

const initialSettings = getInitialSettings();

/**
 * The type definition for the initial state.
 */
type initialStateProps = {
	initial: CommonSettingsConfigType;
	defaults: CommonSettingsConfigType;
	current: CommonSettingsConfigType;
};

/**
 * The initial state.
 */
const initialState: initialStateProps = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings)
};

/**
 * Sets the default settings for the application.
 */
export const setDefaultSettings = createAsyncThunk(
	'commonSettings/setDefaultSettings',
	async (val: PartialDeep<CommonSettingsConfigType>, { dispatch, getState }) => {
		const AppState = getState() as AppRootStateType;

		const settings = AppState.commonSettings;

		const defaults = generateSettings(settings.defaults, val as CommonSettingsConfigType);

		dispatch(setUserSettings(defaults));

		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults)
		};
	}
);

/**
 * The settings slice.
 */
export const commonSettingsSlice = createSlice({
	name: 'commonSettings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<CommonSettingsConfigType>) => {
			const current = generateSettings(state.defaults, action.payload);

			return {
				...state,
				current
			};
		},

		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults)
		})
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(
					state.defaults,
					action.payload?.data?.settings as CommonSettingsConfigType
				);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults)
				};
			})
			.addCase(resetUser.fulfilled, (state) => {
				return {
					...state,
					defaults: _.merge({}, initialSettings),
					current: _.merge({}, initialSettings)
				};
			});
	}
});

type directionType = 'ltr' | 'rtl';

const getDirection = appSelector((state: AppRootStateType) => state.commonSettings.current.direction);
const getMainTheme = appSelector((state: AppRootStateType) => state.commonSettings.current.theme.main);
const getNavbarTheme = appSelector((state: AppRootStateType) => state.commonSettings.current.theme.navbar);
const getToolbarTheme = appSelector((state: AppRootStateType) => state.commonSettings.current.theme.toolbar);
const getFooterTheme = appSelector((state: AppRootStateType) => state.commonSettings.current.theme.footer);

/**
 * Generates the MUI theme object.
 */
function generateMuiTheme(theme: CommonThemeType, direction: directionType) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions) as ThemeOptions;

	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction
		} as ThemeOptions)
	);
}

/**
 * Selects the contrast theme based on the background color.
 */
export const selectContrastMainTheme = (bgColor: string) => {
	function isDark(color: string) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}

	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

/**
 * Changes the theme mode.
 */
function changeThemeMode(theme: CommonThemeType, mode: 'dark' | 'light'): CommonThemeType {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};

	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectCommonCurrentSettings = appSelector((state: AppRootStateType) => state.commonSettings.current);

export const selectCommonCurrentLayoutConfig = appSelector(
	(state: AppRootStateType) => state.commonSettings.current.layout.config
);

export const selectCommonDefaultSettings = appSelector((state: AppRootStateType) => state.commonSettings.defaults);

export const selectCustomScrollbarsEnabled = appSelector(
	(state: AppRootStateType) => state.commonSettings.current.customScrollbars
);

// export const selectCommonThemesSettings = (state: RootState) => state.commonSettings.themes;

export const { resetSettings, setInitialSettings, setSettings } = commonSettingsSlice.actions;

export type settingsSliceType = typeof commonSettingsSlice;

export default commonSettingsSlice.reducer;
