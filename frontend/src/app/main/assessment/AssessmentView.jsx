import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
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
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const assessments = useAppSelector(currentAssessments);

	function handleChangeTab(event, value) {
		setSelectedTabIndex(value);
	}

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

	function CustomTabPanel(props) {
		const { children, value, index, assessmentId, ...other } = props;
		console.log(`CustomTP, value=${value}, index=${index}, assessmentId=${assessmentId}`);
		return (
			<div
				key={`${assessmentId}`}
				role="tabpanel"
				hidden={value !== index}
				id={`tabpanel-${index}`}
				aria-labelledby={`tab-${index}`}
				{...other}
			>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		);
	}
	console.log('Assessments var contains \n' + JSON.stringify(assessments, null, 2));
	return (
		<Root
			header={<AssessmentViewHeader />}
			content={
				<div className="w-full flex p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					<div className="flex flex-col basis-4/6">
						<Tabs
							value={selectedTabIndex}
							onChange={handleChangeTab}
							indicatorColor="secondary"
							textColor="inherit"
							variant="scrollable"
							scrollButtons={true}
							className="w-full px-24 -mx-4 min-h-40 border"
							classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
							TabIndicatorProps={{
								children: (
									<Box
										sx={{ bgcolor: 'text.disabled' }}
										className="w-full h-full rounded-full opacity-20"
									/>
								)
							}}
						>
							{assessments.map((assessment, idx) => (
								<Tab
									key={assessment.id}
									id={`tab-${idx}`}
									label={assessment.name}
									aria-controls={`tabpanel-${idx}`}
									className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
									disableRipple
								/>
							))}
						</Tabs>
						{assessments.map((assessment, idx) => (
							<CustomTabPanel
								key={`${assessment.id}`}
								assessmentId={assessment.id}
								value={selectedTabIndex}
								index={idx}
							>
								<JsonFormsWidget assessmentId={assessment.id} />
							</CustomTabPanel>
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
