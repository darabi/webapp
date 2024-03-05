import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['auth_user', 'auth_something_else'];
const AssessmentApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAssessmentWidgets: build.query({
				query: () => ({ url: `/auth/user` }),
				providesTags: ['auth_user']
			}),
			getAssessmentProjects: build.query({
				query: () => ({ url: `/auth/user` }),
				providesTags: ['auth_something_else']
			})
		}),
		overrideExisting: false
	});
export default AssessmentApi;
export const { useGetAssessmentWidgetsQuery, useGetAssessmentProjectsQuery } = AssessmentApi;
export const selectAssessmentWidgets = createSelector(
	AssessmentApi.endpoints.getAssessmentWidgets.select(),
	(results) => results.data
);
export const selectWidget = (id) =>
	createSelector(selectAssessmentWidgets, (widgets) => {
		return widgets?.[id];
	});
