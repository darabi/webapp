import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import CommonPageSimpleSidebarContent from './CommonPageSimpleSidebarContent';

/**
 * Props for the CommonPageSimpleSidebar component.
 */
type CommonPageSimpleSidebarProps = {
	open?: boolean;
	position?: SwipeableDrawerProps['anchor'];
	variant?: SwipeableDrawerProps['variant'];
	onClose?: () => void;
	children?: ReactNode;
};

/**
 * The CommonPageSimpleSidebar component.
 */
const CommonPageSimpleSidebar = forwardRef<{ toggleSidebar: (T: boolean) => void }, CommonPageSimpleSidebarProps>(
	(props, ref) => {
		const { open = true, position, variant, onClose = () => {} } = props;

		const [isOpen, setIsOpen] = useState(open);

		useImperativeHandle(ref, () => ({
			toggleSidebar: handleToggleDrawer
		}));

		const handleToggleDrawer = useCallback((val: boolean) => {
			setIsOpen(val);
		}, []);

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
							root: clsx('CommonPageSimple-sidebarWrapper', variant),
							paper: clsx(
								'CommonPageSimple-sidebar',
								variant,
								position === 'left' ? 'CommonPageSimple-leftSidebar' : 'CommonPageSimple-rightSidebar',
								'max-w-full'
							)
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						// container={rootRef.current}
						BackdropProps={{
							classes: {
								root: 'CommonPageSimple-backdrop'
							}
						}}
						style={{ position: 'absolute' }}
					>
						<CommonPageSimpleSidebarContent {...props} />
					</SwipeableDrawer>
				</Hidden>

				{variant === 'permanent' && (
					<Hidden lgDown>
						<Drawer
							variant="permanent"
							anchor={position}
							className={clsx(
								'CommonPageSimple-sidebarWrapper',
								variant,
								isOpen ? 'opened' : 'closed',
								position === 'left' ? 'CommonPageSimple-leftSidebar' : 'CommonPageSimple-rightSidebar'
							)}
							open={isOpen}
							onClose={onClose}
							classes={{
								paper: clsx('CommonPageSimple-sidebar border-0', variant)
							}}
						>
							<CommonPageSimpleSidebarContent {...props} />
						</Drawer>
					</Hidden>
				)}
			</>
		);
	}
);

export default CommonPageSimpleSidebar;
