import {styled} from '@stitches/react';
import {useEffect, useRef} from 'react';

const StyledAside = styled('aside', {
	display: 'block',

	width: '350px',
	height: 'auto',
	maxHeight: 'calc(100vh - 2rem)',

	position: 'sticky',
	top: '1rem',

	overflowY: 'auto',
});

const calculateAsideHeight = (el: HTMLElement | null) => {
  if (!el) return;

  const rect = el.getBoundingClientRect();

  console.log(el);
}

export const AsideNav = () => {
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
    calculateAsideHeight(asideRef.current);
  }, []);

	return (
		<StyledAside ref={asideRef}>
			<h1>teste</h1>
		</StyledAside>
	);
};
