import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';

/**
 * The HomeTab component.
 */
function HomeTab() {
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
				<Typography className="font-medium text-sm text-secondary leading-none whitespace-nowrap">
					<span>Form questions</span>
				</Typography>
			</motion.div>
		</motion.div>
	);
}

export default HomeTab;
