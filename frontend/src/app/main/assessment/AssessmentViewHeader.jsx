import { useState } from 'react';
import _ from '@lodash';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';

import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';

import { useAppDispatch } from 'app/store/hooks';
import AssessmentApi, { useGetAssessmentsQuery } from './AssessmentApi';

/**
 * The AssessmentViewHeader page.
 */
function AssessmentViewHeader() {
	const { data: assessments, isLoading } = useGetAssessmentsQuery();

	const [selectedAssessment, setSelectedAssessment] = useState({
		id: 1,
		menuEl: null
	});

	const dispatch = useAppDispatch();

	function handleChangeAssessment(id) {
		setSelectedAssessment({
			id,
			menuEl: null
		});
		dispatch(AssessmentApi.endpoints.getQuestionnaire.initiate(id));
	}

	function handleOpenAssessmentMenu(event) {
		setSelectedAssessment({
			id: selectedAssessment.id,
			menuEl: event.currentTarget
		});
	}

	function handleCloseAssessmentMenu() {
		setSelectedAssessment({
			id: selectedAssessment.id,
			menuEl: null
		});
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex flex-col w-full px-24 sm:px-32">
			<div className="flex items-center">
				<Button
					onClick={handleOpenAssessmentMenu}
					className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
					sx={{
						backgroundColor: (theme) => theme.palette.background.default,
						borderColor: (theme) => theme.palette.divider
					}}
					endIcon={
						<FuseSvgIcon
							size={20}
							color="action"
						>
							heroicons-solid:chevron-down
						</FuseSvgIcon>
					}
				>
					{_.find(assessments, ['id', selectedAssessment.id])?.name}
				</Button>
				<Menu
					id="assessments-menu"
					anchorEl={selectedAssessment.menuEl}
					open={Boolean(selectedAssessment.menuEl)}
					onClose={handleCloseAssessmentMenu}
				>
					{assessments &&
						assessments.map((ass) => (
							<MenuItem
								key={ass.id}
								onClick={() => {
									handleChangeAssessment(ass.id);
								}}
							>
								{ass.name}
							</MenuItem>
						))}
				</Menu>
			</div>
		</div>
	);
}

export default AssessmentViewHeader;
