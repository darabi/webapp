import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState, ReactNode } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import CommonPageCardedSidebarContent from './CommonPageCardedSidebarContent';

/**
 * Props for the CommonPageCardedSidebar component.
 */
type CommonPageCardedSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The CommonPageCardedSidebar component is a sidebar for the CommonPageCarded component.
 */
const CommonPageCardedSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, CommonPageCardedSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

		useEffect(() => {
			handleToggleDrawer(open);
		}, [handleToggleDrawer, open]);

		return (
			<>
				<Hidden lgUp={variant === 'permanent'}>
					<SwipeableDrawer
						variant="temporary"
						anchor={position}
						open={isOpen}
						onOpen={() => {}}
						onClose={() => onClose()}
						disableSwipeToOpen
						classes={{
							root: clsx('CommonPageCarded-sidebarWrapper', variant),
							paper: clsx(
								'CommonPageCarded-sidebar',
								variant,
								position === 'left' ? 'CommonPageCarded-leftSidebar' : 'CommonPageCarded-rightSidebar'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						BackdropProps={{
							classes: {
								root: 'CommonPageCarded-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<CommonPageCardedSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>
				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'CommonPageCarded-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'CommonPageCarded-leftSidebar' : 'CommonPageCarded-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('CommonPageCarded-sidebar', variant)
							}}
						>
							<CommonPageCardedSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default CommonPageCardedSidebar;
