import { createSelector } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import { addAssessment } from './assessmentSlice';

export const addTagTypes = ['assessment_list', 'assessment', 'movies'];

// the cache tag for assessment
const assessmentTagFn = (result, error, arg) => {
	// result is the fetched assessment object
	return result ? [{ type: 'assessment', id: result.id }] : ['assessment'];
};

const AssessmentApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAssessments: build.query({
				query: (limit = 10) => ({ url: `/questionnaire/assessments?limit=${limit}` }),
				providesTags: ['assessment_list']
			}),
			getMovies: build.query({
				query: (limit = 10) => ({ url: `/questionnaire/movies?limit=${limit}` }),
				providesTags: ['movies']
			}),
			getQuestionnaire: build.query({
				query: (id) => ({ url: `/questionnaire/assessment/${id}` }),
				providesTags: assessmentTagFn,
				// cf. https://redux-toolkit.js.org/rtk-query/api/createApi#onquerystarted
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					// `onStart` side-effect
					// dispatch(messageCreated('Fetching post...'))
					try {
						const { data } = await queryFulfilled;
						// `onSuccess` side-effect
						dispatch(addAssessment(data));
					} catch (err) {
						console.log(err);
						// `onError` side-effect
						// dispatch(messageCreated('Error fetching post!'))
					}
				}
			}),
			updateAnswers: build.mutation({
				query: ({ id, data }) => ({
					url: `questionnaire/assessment/${id}/data`,
					method: 'PUT',
					body: data
				}),
				// Pick out data and prevent nested properties in a hook or selector
				transformResponse: (response, meta, arg) => response.data,
				// Pick out errors and prevent nested properties in a hook or selector
				transformErrorResponse: (response, meta, arg) => response.status,
				invalidatesTags: assessmentTagFn,
				// onQueryStarted is useful for optimistic updates
				// The 2nd parameter is the destructured `MutationLifecycleApi`
				async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {},
				// The 2nd parameter is the destructured `MutationCacheLifecycleApi`
				async onCacheEntryAdded(
					arg,
					{ dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }
				) {}
			})
		}),
		overrideExisting: false
	});

export default AssessmentApi;

export const { useGetAssessmentsQuery, useGetMoviesQuery, useGetQuestionnaireQuery, useUpdateAnswersMutation } =
	AssessmentApi;

export const selectAssessments = createSelector(
	AssessmentApi.endpoints.getAssessments.select(),
	(results) => results.data
);

// select one (already retrieved) questionnaire by id
export const selectQuestionnaire = (id) =>
	createSelector(AssessmentApi.endpoints.getQuestionnaire.select(id), (q) => q.data);

// select all questionnaires which were already retrieved
export const selectQuestionnaires = createSelector(
	AssessmentApi.endpoints.getQuestionnaire.select(),
	(results) => results.data
);
