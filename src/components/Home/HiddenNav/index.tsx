import {CaretLeft, Scroll} from 'phosphor-react';
import {useContext, useState} from 'react';
import {styled} from '../../../utils/breakpoints';
import PostsContext from '../_contexts/posts.context';

const StyledContainer = styled('aside', {
	zIndex: '10',
	width: '80vw',
	height: '92vh',
	backgroundColor: 'var(--red-shade)',
	position: 'fixed',
	top: '4vh',
	overflow: 'hidden',
	transition: 'left 100ms ease-in-out',
	left: '-85vw',

	padding: '1rem',
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: '#FFFFCCCC',
	},

	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: 'var(--text-light)',
	},

	variants: {
		open: {
			true: {
				left: 0,
			},
		},
	},
});

const AttachedButton = styled('button', {
	position: 'fixed',
	backgroundColor: 'var(--red-shade)',
	color: 'var(--text-light-secondary)',
	padding: '2rem .5rem',
	transition: 'all 100ms ease-in-out',
	left: '-.5rem',
	top: '204px',
	opacity: '.5',
	borderRadius: 'var(--default-border-radius)',

	'&:hover': {
		color: 'var(--text-light)',
	},

	'& > svg': {
		transition: 'transform 100ms ease-in-out',
		transform: 'scaleY(1.5) rotateZ(180deg)'
	},

	variants: {
		open: {
			true: {
				left: '80vw',
				opacity: '1',
				'& > svg': {
					transform: 'scaleY(1.5) rotateZ(0)'
				},
			},
		},
	},
});

const FlexContainer = styled('article', {
	width: '100%',
	height: '100%',
	position: 'relative',
	display: 'flex',
	flexFlow: 'column',
	overflowY: 'auto',
	gap: '.4rem',
});

const StyledLink = styled('a', {
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

const HiddenNav = () => {
	const posts = useContext(PostsContext);
	const [isOpen, toggle] = useState(false);

	return (
		<StyledContainer open={isOpen} data-shadow>
			<AttachedButton open={isOpen} onClick={() => toggle(!isOpen)}>
				<CaretLeft size='1.5rem' color='currentColor' />
			</AttachedButton>
			<FlexContainer>
				{posts.map((post) => (
					<StyledLink key={post.id} href={`#${post.id}`} onClick={() => toggle(false)}>
						<Scroll size='1.1rem' color='currentColor' />
						<StyledLinkTitle>{post.linkText}</StyledLinkTitle>
					</StyledLink>
				))}
			</FlexContainer>
		</StyledContainer>
	);
};

export default HiddenNav;
