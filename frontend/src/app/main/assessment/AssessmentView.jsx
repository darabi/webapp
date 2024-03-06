import { useEffect } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseLoading from '@fuse/core/FuseLoading';

import AssessmentViewHeader from './AssessmentViewHeader';
import JsonFormsWidget from './widgets/JsonFormsWidget';
import { GraphWidget } from './widgets/GraphWidget';
import { useAppSelector } from 'app/store/hooks';
import { selectQuestionnaires, useGetMoviesQuery, useGetQuestionnaireQuery } from './AssessmentApi';
import { currentAssessments } from './assessmentSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
	}
}));

/**
 * The AssessmentView page.
 */
function AssessmentView() {
	const assessments = useAppSelector(currentAssessments);

	return (
		<Root
			header={<AssessmentViewHeader />}
			content={
				<div className="w-full h-full flex p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					<div className="flex flex-col basis-4/6">
						{assessments.map((assessment, idx) => (
							<Accordion
								key={assessment.id}
								defaultExpanded={assessments.length == 1}
								className="border-0 shadow-0 overflow-hidden"
								sx={{ backgroundColor: 'background.default', borderRadius: '12px!important' }}
							>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography className="font-semibold">{assessment.name}</Typography>
								</AccordionSummary>
								<AccordionDetails className="flex flex-col md:flex-row">
									<div className="w-full h-320 rounded-16 overflow-hidden mx-8">
										<JsonFormsWidget
											schema={assessment.schema}
											uischema={assessment.uischema}
											data={assessment.data}
										/>
									</div>
								</AccordionDetails>
							</Accordion>
						))}
					</div>
					<div className="flex flex-col basis-2/6 gap-y-24">
						<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
							<span>Graph 1</span>
						</Typography>
						<GraphWidget
							query={useGetMoviesQuery}
							queryArgs={[10]}
							width="100%"
							height="300px"
							className="flex basis-3/12"
						/>
					</div>
				</div>
			}
		/>
	);
}

export default AssessmentView;
