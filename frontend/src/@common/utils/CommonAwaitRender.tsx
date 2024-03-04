import { useEffect, useState } from 'react';

type CommonAwaitRenderProps = {
	delay?: number;
	children: React.ReactNode;
};

function CommonAwaitRender(props: CommonAwaitRenderProps) {
	const { delay = 0, children } = props;
	const [awaitRender, setAwaitRender] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAwaitRender(false);
		}, delay);
	}, [delay]);

	return awaitRender ? null : children;
}

export default CommonAwaitRender;
