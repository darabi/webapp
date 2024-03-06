import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = {
	//  questionnaires which were retrieved and are 'on the stack'
	currentAssessments: []
};

/**
 * The Assessment slice
 */
export const assessmentSlice = createSlice({
	name: 'assessment',
	initialState,
	reducers: {
		addAssessment: (state, action) => {
			if (!action?.payload?.id) return;
			const id = action.payload.id;
			// if the id is already there, we don't need to add it again
			if (state.currentAssessments.some((a) => a?.id === id)) return;

			// create a new array with the old content PLUS the new questionnaire
			state.currentAssessments = [...state.currentAssessments, action.payload];
		}
	},
	selectors: {
		currentAssessments: (state) => state.currentAssessments,
		selectQuestionnaireData: (state, id) => state.currentAssessments.find((a) => a.id === id)
	}
});
/**
 * Lazy load
 * */
rootReducer.inject(assessmentSlice);
const injectedSlice = assessmentSlice.injectInto(rootReducer);
export const { addAssessment } = assessmentSlice.actions;
export const { currentAssessments, selectQuestionnaireData } = injectedSlice.selectors;
export default assessmentSlice.reducer;
