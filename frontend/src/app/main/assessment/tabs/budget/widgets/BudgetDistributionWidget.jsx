import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetAssessmentWidgetsQuery } from '../../../AssessmentApi';

/**
 * The BudgetDistributionWidget widget.
 */
function BudgetDistributionWidget() {
	const { data: widgets, isLoading } = useGetAssessmentWidgetsQuery();

	if (isLoading) {
		return <FuseLoading />;
	}

	const widget = widgets.budgetDistribution;

	if (!widget) {
		return null;
	}

	const { categories, series } = widget;
	const theme = useTheme();
	const chartOptions = {
		chart: {
			fontFamily: 'inherit',
			foreColor: 'inherit',
			height: '100%',
			type: 'radar',
			sparkline: {
				enabled: true
			}
		},
		colors: [theme.palette.secondary.main],
		dataLabels: {
			enabled: true,
			formatter: (val) => `${val}%`,
			textAnchor: 'start',
			style: {
				fontSize: '13px',
				fontWeight: 500
			},
			background: {
				borderWidth: 0,
				padding: 4
			},
			offsetY: -15
		},
		markers: {
			strokeColors: theme.palette.primary.main,
			strokeWidth: 4
		},
		plotOptions: {
			radar: {
				polygons: {
					strokeColors: theme.palette.divider,
					connectorColors: theme.palette.divider
				}
			}
		},
		stroke: {
			width: 2
		},
		tooltip: {
			theme: 'dark',
			y: {
				formatter: (val) => `${val}%`
			}
		},
		xaxis: {
			labels: {
				show: true,
				style: {
					fontSize: '12px',
					fontWeight: '500'
				}
			},
			categories
		},
		yaxis: {
			max: (max) => parseInt((max + 10).toFixed(0), 10),
			tickAmount: 7
		}
	};
	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
			<Typography className="text-lg font-medium tracking-tight leading-6 truncate">Budget Distribution</Typography>

			<div className="flex flex-col flex-auto">
				<Typography
					className="font-medium flex-auto w-full h-320"
					color="text.secondary"
				>
					PLACEHOLDER FOR CHART
				</Typography>
			</div>
		</Paper>
	);
}

export default memo(BudgetDistributionWidget);
