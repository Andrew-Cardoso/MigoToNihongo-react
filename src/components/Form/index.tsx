import {styled} from '@stitches/react';
import {ReactProps} from '../../types/helper.types';

const StyledForm = styled('form', {
	width: '100%',
	height: 'auto',
	padding: '0 2rem',
	display: 'flex',
	flexFlow: 'column',
	gap: '1rem',
	borderRadius: 'var(--default-border-radius)',

	variants: {
		standalone: {
			true: {
				padding: '2rem',
			},
		},
	},
});

interface Props extends ReactProps<'form'> {
	standalone?: boolean;
}
export const Form = (props: Props) => <StyledForm {...props} />;

const StyledContainer = styled('section', {
	width: '100%',
	height: 'auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '.5rem',
	variants: {
		invalid: {
			true: {},
			false: {},
		},
		file: {
			true: {
				width: 'fit-content',
				marginBottom: '2rem',
			},
		},
		disabled: {
			true: {
				'& > input': {
					color: 'var(--input-disabled-color)',
					backgroundColor: 'var(--input-disabled-bg)',
					cursor: 'not-allowed',
					borderColor: 'var(--input-disabled-color)'
				},
			},
			false: {},
		},
	},

	compoundVariants: [
		{
			disabled: false,
			invalid: true,
			css: {
				'& > input': {
					borderWidth: 'thin thin thin .85rem',
					borderColor: 'var(--text-danger)',
				},
				'& > label': {
					color: 'var(--text-danger)',
				},
				'& > span': {
					transform: 'translateX(0)',
					filter: 'opacity(1)',
				},
			},
		},
		{
			disabled: false,
			css: {
				'&:focus-within > label': {
					color: 'var(--text-light-secondary)',
				},
				'&:focus-within > input': {
					borderWidth: 'thin thin thin .85rem',
					borderColor: 'var(--text-light-secondary)',
				},
			},
		},
	],
});

const StyledInput = styled('input', {
	borderRadius: 'var(--default-border-radius)',
	borderStyle: 'solid',
	backgroundColor: '#FFF',
	fontSize: '1rem',
	padding: '.6rem 1rem',
	width: '100%',
	transition: 'border-width 150ms ease, border-color 150ms ease',
	borderWidth: 'thin',
	borderColor: 'var(--text-light)',
	color: 'var(--text-darker)',
});

const StyledLabel = styled('label', {
	fontSize: '.85rem',
	transition: 'color 150ms ease',
	color: 'var(--text-light)',
	'&::first-letter': {
		textTransform: 'capitalize',
	},
});

const StyledError = styled('span', {
	fontSize: '.8rem',
	color: 'var(--text-danger)',
	transition: 'transform 150ms ease, filter 100ms ease',
	minHeight: '1.25rem',
	transform: 'translateX(-2rem)',
	filter: 'opacity(.1)',
});

export const FormElements = {
	Container: StyledContainer,
	Input: StyledInput,
	Label: StyledLabel,
	Error: StyledError,
};
