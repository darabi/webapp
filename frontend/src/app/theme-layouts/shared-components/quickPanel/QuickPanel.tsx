import CommonScrollbars from '@common/core/CommonScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/store/store';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { selectQuickPanelData } from './store/dataSlice';
import { selectQuickPanelState, toggleQuickPanel } from './store/stateSlice';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
	'& .MuiDrawer-paper': {
		width: 280
	}
}));

/**
 * The quick panel.
 */
function QuickPanel() {
	const dispatch = useAppDispatch();

	const data = useSelector(selectQuickPanelData);
	const state = useSelector(selectQuickPanelState);

	const [checked, setChecked] = useState<string[]>(['notifications']);

	const handleToggle = (value: string) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<StyledSwipeableDrawer
			open={state}
			anchor="right"
			onOpen={() => {}}
			onClose={() => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<CommonScrollbars>
				<ListSubheader component="div">Right Panel</ListSubheader>

				<Divider />
				<List>
					<ListSubheader component="div">Events</ListSubheader>
					{data &&
						data.events.map((event) => (
							<ListItem key={event.id}>
								<ListItemText
									primary={event.title}
									secondary={event.detail}
								/>
							</ListItem>
						))}
				</List>
				<Divider />
				<List>
					<ListSubheader component="div">Notes</ListSubheader>
					{data &&
						data.notes.map((note) => (
							<ListItem key={note.id}>
								<ListItemText
									primary={note.title}
									secondary={note.detail}
								/>
							</ListItem>
						))}
				</List>
				<Divider />
				<List>
					<ListSubheader component="div">Quick Settings</ListSubheader>
					<ListItem>
						<ListItemIcon className="min-w-40">
							<CommonSvgIcon>material-outline:notifications</CommonSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Notifications" />
						<ListItemSecondaryAction>
							<Switch
								color="primary"
								onChange={handleToggle('notifications')}
								checked={checked.indexOf('notifications') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon className="min-w-40">
							<CommonSvgIcon>material-outline:cloud</CommonSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Cloud Sync" />
						<ListItemSecondaryAction>
							<Switch
								color="secondary"
								onChange={handleToggle('cloudSync')}
								checked={checked.indexOf('cloudSync') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem>
					<ListItem>
						<ListItemIcon className="min-w-40">
							<CommonSvgIcon>material-outline:brightness_high</CommonSvgIcon>
						</ListItemIcon>
						<ListItemText primary="Retro Thrusters" />
						<ListItemSecondaryAction>
							<Switch
								color="primary"
								onChange={handleToggle('retroThrusters')}
								checked={checked.indexOf('retroThrusters') !== -1}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</CommonScrollbars>
		</StyledSwipeableDrawer>
	);
}

export default withReducer('quickPanel', reducer)(QuickPanel);
