import {styled} from '@stitches/react';
import {ReactProps} from '../../types/helper.types';

const StyledCard = styled('div', {
	width: '100%',
	height: 'auto',
	borderRadius: 'var(--default-border-radius)',
	padding: '2rem',
	display: 'flex',
	flexFlow: 'column',
	gap: '2rem',
	backgroundColor: 'var(--main-brand)',
	color: 'var(--text-light)',

	'& > footer': {
		marginTop: 'auto',
	},

	variants: {
		role: {
			modal: {
				width: 'clamp(20rem, 35rem, 96vw)',
			},
		},
		size: {
			sm: {
				width: 'clamp(25rem, 35rem, 96vw)',
			},
			md: {
				width: 'clamp(40rem, 60rem, 96vw)',
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
