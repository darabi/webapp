import CommonLoading from '@common/core/CommonLoading';
import { ReactNode, Suspense } from 'react';
import { CommonLoadingProps } from '@common/core/CommonLoading/CommonLoading';

type CommonSuspenseProps = {
	loadingProps?: CommonLoadingProps;
	children: ReactNode;
};

/**
 * The CommonSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function CommonSuspense(props: CommonSuspenseProps) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<CommonLoading {...loadingProps} />}>{children}</Suspense>;
}

export default CommonSuspense;
