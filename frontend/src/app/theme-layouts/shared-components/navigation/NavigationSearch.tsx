import { useSelector } from 'react-redux';
import CommonSearch from '@common/core/CommonSearch';
import withSlices from 'app/store/withSlices';
import { navigationSlice, selectFlatNavigation } from './store/navigationSlice';

type NavigationSearchProps = {
	className?: string;
	variant?: 'basic' | 'full';
};

/**
 * The navigation search.
 */
function NavigationSearch(props: NavigationSearchProps) {
	const { variant, className } = props;

	const navigation = useSelector(selectFlatNavigation);

	return (
		<CommonSearch
			className={className}
			variant={variant}
			navigation={navigation}
		/>
	);
}

export default withSlices<NavigationSearchProps>([navigationSlice])(NavigationSearch);
