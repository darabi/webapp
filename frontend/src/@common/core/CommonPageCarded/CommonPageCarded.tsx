import CommonScrollbars from '@common/core/CommonScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { forwardRef, memo, ReactNode, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { SystemStyleObject } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system';
import CommonPageCardedSidebar from './CommonPageCardedSidebar';
import CommonPageCardedHeader from './CommonPageCardedHeader';

const headerHeight = 120;
const toolbarHeight = 64;

/**
 * Props for the CommonPageCarded component.
 */
type CommonPageCardedProps = SystemStyleObject<Theme> & {
	className?: string;
	leftSidebarContent?: ReactNode;
	leftSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	rightSidebarContent?: ReactNode;
	rightSidebarVariant?: 'permanent' | 'persistent' | 'temporary';
	header?: ReactNode;
	content?: ReactNode;
	scroll?: 'normal' | 'page' | 'content';
	leftSidebarOpen?: boolean;
	rightSidebarOpen?: boolean;
	leftSidebarWidth?: number;
	rightSidebarWidth?: number;
	rightSidebarOnClose?: () => void;
	leftSidebarOnClose?: () => void;
};

const Root = styled('div')<CommonPageCardedProps>(({ theme, ...props }) => ({
	display: 'flex',
	flexDirection: 'column',
	minWidth: 0,
	minHeight: '100%',
	position: 'relative',
	flex: '1 1 auto',
	width: '100%',
	height: 'auto',
	backgroundColor: theme.palette.background.default,

	'& .CommonPageCarded-scroll-content': {
		height: '100%'
	},

	'& .CommonPageCarded-wrapper': {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.paper,

		...(props.scroll === 'content' && {
			position: 'absolute',
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
			overflow: 'hidden'
		})
	},

	'& .CommonPageCarded-header': {
		display: 'flex',
		flex: '0 0 auto'
	},

	'& .CommonPageCarded-contentWrapper': {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		zIndex: 9999
	},

	'& .CommonPageCarded-toolbar': {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},

	'& .CommonPageCarded-content': {
		flex: '1 0 auto'
	},

	'& .CommonPageCarded-sidebarWrapper': {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative',
				marginLeft: 0,
				marginRight: 0,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				'&.closed': {
					transition: theme.transitions.create('margin', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),

					'&.CommonPageCarded-leftSidebar': {
						marginLeft: -props.leftSidebarWidth
					},
					'&.CommonPageCarded-rightSidebar': {
						marginRight: -props.rightSidebarWidth
					}
				}
			}
		}
	},

	'& .CommonPageCarded-sidebar': {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,

		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative'
			}
		},
		maxWidth: '100%',
		height: '100%'
	},

	'& .CommonPageCarded-leftSidebar': {
		width: props.leftSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			// borderRight: `1px solid ${theme.palette.divider}`,
			// borderLeft: 0,
		}
	},

	'& .CommonPageCarded-rightSidebar': {
		width: props.rightSidebarWidth,

		[theme.breakpoints.up('lg')]: {
			// borderLeft: `1px solid ${theme.palette.divider}`,
			// borderRight: 0,
		}
	},

	'& .CommonPageCarded-sidebarHeader': {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},

	'& .CommonPageCarded-sidebarHeaderInnerSidebar': {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},

	'& .CommonPageCarded-sidebarContent': {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%'
	},

	'& .CommonPageCarded-backdrop': {
		position: 'absolute'
	}
}));

/**
 * The CommonPageCarded component is a carded page layout with left and right sidebars.
 */
const CommonPageCarded = forwardRef<
	{ toggleLeftSidebar: (T: boolean) => void; toggleRightSidebar: (T: boolean) => void },
	CommonPageCardedProps
>((props, ref) => {
	const {
		scroll = 'page',
		className,
		header,
		content,
		leftSidebarContent,
		rightSidebarContent,
		leftSidebarOpen = false,
		rightSidebarOpen = false,
		rightSidebarWidth = 240,
		leftSidebarWidth = 240,
		leftSidebarVariant = 'permanent',
		rightSidebarVariant = 'permanent',
		rightSidebarOnClose,
		leftSidebarOnClose
	} = props;

	const leftSidebarRef = useRef<{ toggleSidebar: (T: boolean) => void }>(null);
	const rightSidebarRef = useRef<{ toggleSidebar: (T: boolean) => void }>(null);
	const rootRef = useRef(null);

	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: (val: boolean) => {
			leftSidebarRef.current.toggleSidebar(val);
		},
		toggleRightSidebar: (val: boolean) => {
			rightSidebarRef.current.toggleSidebar(val);
		}
	}));

	return (
		<>
			<GlobalStyles
				styles={() => ({
					...(scroll !== 'page' && {
						'#common-toolbar': {
							position: 'static'
						},
						'#common-footer': {
							position: 'static'
						}
					}),
					...(scroll === 'page' && {
						'#common-toolbar': {
							position: 'sticky',
							top: 0
						},
						'#common-footer': {
							position: 'sticky',
							bottom: 0
						}
					})
				})}
			/>
			<Root
				className={clsx('CommonPageCarded-root', `CommonPageCarded-scroll-${props.scroll}`, className)}
				ref={rootRef}
				scroll={scroll}
				leftSidebarWidth={leftSidebarWidth}
				rightSidebarWidth={rightSidebarWidth}
			>
				{header && <CommonPageCardedHeader header={header} />}

				<div className="container relative z-10 flex h-full flex-auto flex-col overflow-hidden rounded-t-16 shadow-1">
					<div className="CommonPageCarded-wrapper">
						{leftSidebarContent && (
							<CommonPageCardedSidebar
								position="left"
								variant={leftSidebarVariant}
								ref={leftSidebarRef}
								open={leftSidebarOpen}
								onClose={leftSidebarOnClose}
							>
								{leftSidebarContent}
							</CommonPageCardedSidebar>
						)}
						<CommonScrollbars
							className="CommonPageCarded-contentWrapper"
							enable={scroll === 'content'}
						>
							{content && <div className={clsx('CommonPageCarded-content')}>{content}</div>}
						</CommonScrollbars>
						{rightSidebarContent && (
							<CommonPageCardedSidebar
								position="right"
								variant={rightSidebarVariant || 'permanent'}
								ref={rightSidebarRef}
								open={rightSidebarOpen}
								onClose={rightSidebarOnClose}
							>
								{rightSidebarContent}
							</CommonPageCardedSidebar>
						)}
					</div>
				</div>
			</Root>
		</>
	);
});

export default memo(styled(CommonPageCarded)``);
