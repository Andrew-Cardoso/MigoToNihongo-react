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

const StyledFlexContent = styled('section', {
	display: 'grid',
	justifyContent: 'left',
	placeItems: 'left',
	rowGap: '.5rem',
	columnGap: '1rem',
	padding: '1rem 0',
	gridTemplateColumns: 'max-content 1fr',
});

const StyledFlexParagraph = styled('p', {
	color: 'var(--text-light)',
	fontSize: '1.1rem',
	display: 'flex',
	gap: '.5rem',
	width: '100%',
	height: '100%',
	alignContent: 'center',
	alignItems: 'center',
	justifyContent: 'flex-start',
	justifyItems: 'flex-start',

	'&:nth-child(odd)': {
		fontWeight: 'bold',
	},
});

export const CardElements = {
	Header: StyledHeader,
	Content: StyledMainContent,
	Flex: {
		Container: StyledFlexContent,
		Paragraph: StyledFlexParagraph,
	},
	Footer: StyledFooter,
};
