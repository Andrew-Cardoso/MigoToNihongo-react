import {styled} from '@stitches/react';
import {Scroll} from 'phosphor-react';
import {useContext, useEffect, useRef} from 'react';
import PostsContext from '../_contexts/posts.context';

const StyledAside = styled('aside', {
	display: 'block',
	width: '30rem',
	maxHeight: 'calc(100vh - 4rem)',
	position: 'sticky',
	top: '2rem',
	overflowY: 'auto',
	padding: '2rem',
	backgroundColor: 'var(--red-shade)',

	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#FFFFCCCC',
	},

	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: 'var(--text-light)',
	},
});

const StyledList = styled('section', {
	display: 'flex',
	flexFlow: 'column',
	width: '100%',
	overflow: 'hidden',
	gap: '.5rem',
});

const StyledLinkContainer = styled('a', {
	width: '100%',
	height: '2rem',
	display: 'grid',
	gridTemplateColumns: '2rem 1fr',
	gridTemplateRows: '1fr',
	alignContent: 'center',
	alignItems: 'center',
	justifyContent: 'flex-start',
	justifyItems: 'flex-start',
	transition: 'color 150ms ease, transform 150ms ease',
	color: 'var(--text-light-secondary)',
	textDecoration: 'none',

	'&:hover': {
		color: 'var(--text-light)',
		transform: 'scale(1.05) translateX(.75rem)',
	},
});

const StyledLinkTitle = styled('span', {
	fontSize: '.9rem',
	color: 'CurrentColor',
	textTransform: 'capitalize',
	textDecoration: 'none',
});

const calculateAsideHeight = (el: HTMLElement | null) => {
	if (!el) return;
	const {top} = el.getBoundingClientRect();
	el.style.height = `calc(100vh - ${top}px - 2rem)`;
};

export const AsideNav = () => {
	const posts = useContext(PostsContext);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		calculateAsideHeight(asideRef.current);

		const app = document.getElementById('App')!;
		const fn = (_: Event) => calculateAsideHeight(asideRef.current);

		window.addEventListener('resize', fn);
		app.addEventListener('scroll', fn);

		return () => {
			window.removeEventListener('resize', fn);
			app.removeEventListener('scroll', fn);
		};
	}, []);

	return (
		<StyledAside ref={asideRef} data-shadow>
			<StyledList>
				{posts.map((post) => (
					<StyledLinkContainer key={post.id} href={`#${post.id}`}>
						<Scroll size='1.1rem' color='currentColor' />
						<StyledLinkTitle>{post.linkText}</StyledLinkTitle>
					</StyledLinkContainer>
				))}
			</StyledList>
		</StyledAside>
	);
};
