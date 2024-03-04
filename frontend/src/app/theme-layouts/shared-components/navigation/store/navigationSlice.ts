import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootStateType } from 'app/store/types';
import { PartialDeep } from 'type-fest';
import { CommonFlatNavItemType, CommonNavItemType } from '@common/core/CommonNavigation/types/CommonNavItemType';
import { selectUserRole, userSliceType } from 'app/auth/user/store/userSlice';
import CommonNavigationHelper from '@common/utils/CommonNavigationHelper';
import i18next from 'i18next';
import CommonNavItemModel from '@common/core/CommonNavigation/models/CommonNavItemModel';
import CommonUtils from '@common/utils';
import navigationConfig from 'app/config/navigationConfig';
import { selectCurrentLanguageId } from 'app/store/i18nSlice';

type AppRootStateType = RootStateType<[navigationSliceType, userSliceType]>;

const navigationAdapter = createEntityAdapter<CommonFlatNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	CommonNavigationHelper.flattenNavigation(navigationConfig)
);

/**
 * Redux Thunk actions related to the navigation store state
 */
/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: CommonNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = CommonNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CommonNavigationHelper.appendNavItem(navigation, CommonNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: CommonNavItemType, parentId?: string | null): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = CommonNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CommonNavigationHelper.prependNavItem(navigation, CommonNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<CommonNavItemType>): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = CommonNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CommonNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = CommonNavigationHelper.unflattenNavigation(selectNavigationAll(AppState));

		dispatch(setNavigation(CommonNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: AppRootStateType) => state.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation(state, action: PayloadAction<CommonNavItemType[]>) {
			return navigationAdapter.setAll(state, CommonNavigationHelper.flattenNavigation(action.payload));
		},
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigationSimple, userRole) => {
		const navigation = CommonNavigationHelper.unflattenNavigation(navigationSimple);

		function setAdditionalData(data: CommonNavItemType[]): CommonNavItemType[] {
			return data?.map((item) => ({
				hasPermission: Boolean(CommonUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item?.translate && item?.title ? { title: i18next.t(`navigation:${item?.translate}`) } : {}),
				...(item?.children ? { children: setAdditionalData(item?.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(navigation);

		return translatedValues;
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) => {
	return CommonNavigationHelper.flattenNavigation(navigation);
});

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
