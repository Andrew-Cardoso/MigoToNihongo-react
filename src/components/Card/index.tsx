import {styled} from '../../utils/breakpoints';
import {ReactProps} from '../../types/helper.types';

const StyledCard = styled('div', {
	width: '100%',
	height: 'auto',
	borderRadius: 'var(--default-border-radius)',
	display: 'flex',
	flexFlow: 'column',
	backgroundColor: 'var(--main-brand)',
	color: 'var(--text-light)',
	padding: '2rem',
	gap: '2rem',

	'@smartphone': {
		padding: '1rem',
		gap: '1rem',
	},

	'& > footer': {
		marginTop: 'auto',
	},

	variants: {
		role: {
			modal: {
				width: 'clamp(20rem, 35rem, 96vw)',
				'@smartphone': {
					width: '98vw'
				}
			},
		},
		size: {
			sm: {
				width: 'clamp(10rem, 35rem, 96vw)',
			},
			md: {
				width: 'clamp(20rem, 60rem, 96vw)',
			},
			lg: {
				width: '96vw',
			},
		},
	},
});
interface Props extends Omit<ReactProps<'div'>, 'role'> {
	role?: 'modal';
	size?: 'sm' | 'md' | 'lg';
}
export const Card = (props: Props) => <StyledCard {...props} data-shadow />;

const StyledHeader = styled('header', {
	paddingBottom: '2rem',
	position: 'relative',

	'&:after': {
		content: '""',
		background: 'linear-gradient(to left, #fff0, var(--text-light), #fff0)',
		position: 'absolute',
		bottom: '0',
		left: '10%',
		height: '.06rem',
		width: '80%',
	},

	'& > h1': {
		textAlign: 'center',
		fontSize: '1.6rem',
	},

	'@smartphone': {
		paddingBottom: '1rem',
		'& > h1': {
			fontSize: '1.4rem',
		},
	},
});

const StyledMainContent = styled('div', {
	width: '100%',
	height: 'auto',
	padding: '1rem 0',
});

const StyledFooter = styled('footer', {
	width: '100%',
	height: 'auto',
	paddingTop: '2rem',
	position: 'relative',

	'&:before': {
		content: '""',
		background: 'linear-gradient(to left, #fff0, var(--text-light), #fff0)',
		position: 'absolute',
		top: '0',
		left: '10%',
		height: '.06rem',
		width: '80%',
	},
});

export const CardElements = {
	Header: StyledHeader,
	Content: StyledMainContent,
	Footer: StyledFooter,
};
