import { useEffect, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { motion } from 'framer-motion';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectQuestionnaire, useUpdateAnswersMutation } from '../AssessmentApi';
import { selectQuestionnaireData } from '../assessmentSlice';
/**
 * Component for showing a form and updating the answer data on backend side
 */
function JsonFormsWidget({ assessmentId }) {
	const questionnaire = useAppSelector(selectQuestionnaire(assessmentId));
	const questionnaireData = useAppSelector(() => selectQuestionnaireData(assessmentId));

	const [formData, setFormData] = useState({});

	// set the relation between redux questionnaire and local state
	useEffect(() => {
		setFormData(questionnaire?.data);
	}, [questionnaire]);

	const [schema, setSchema] = useState({});

	// set the relation between redux questionnaire and local state
	useEffect(() => {
		setSchema(questionnaire?.schema);
	}, [questionnaire]);

	const [uischema, setUischema] = useState({});

	// set the relation between redux questionnaire and local state
	useEffect(() => {
		setUischema(questionnaire?.uischema);
	}, [questionnaire]);

	// mutation for sending updates to backend
	const [updateAnswers, { isLoading: isUpdating }] = useUpdateAnswersMutation();

	const dispatch = useAppDispatch();

	function handleChange(data) {
		setFormData(data);
		// dispatch(updateAnswers(assessmentId, data));
	}

	const clearData = () => {
		setFormData({});
	};

	const renderers = [
		...materialRenderers
		//register custom renderers
		// { tester: ratingControlTester, renderer: RatingControl },
	];

	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-6 gap-24 w-full min-w-0 p-24"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div
				variants={item}
				className="sm:col-span-3 lg:col-span-4 border"
			>
				<JsonForms
					schema={schema}
					uischema={uischema}
					data={formData}
					renderers={renderers}
					cells={materialCells}
					onChange={({ errors, data }) => handleChange(data)}
				/>
			</motion.div>
		</motion.div>
	);
}

export default JsonFormsWidget;
