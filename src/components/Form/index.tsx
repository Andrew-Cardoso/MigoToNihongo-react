import {styled} from '@stitches/react';
import {ReactProps} from '../../types/helper.types';

export const FormElements = {
	Container: styled('section', {
		width: '100%',
		height: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: '.5rem',
		variants: {
			invalid: {
				true: {
					'& > input': {
						borderWidth: 'thin thin thin .85rem',
						borderColor: 'var(--color-danger)',
            backgroundColor: 'var(--color-danger-light)',
					},
					'& > label': {
						color: 'var(--color-danger)',
					},
					'& > span': {
						transform: 'translateX(0)',
						filter: 'opacity(1)',
					},
				},
			},
		},
	}),

	Input: styled('input', {
		borderRadius: 'var(--default-border-radius)',
		borderStyle: 'solid',
		backgroundColor: '#FFF0',
		fontSize: '1rem',
		padding: '.6rem 1rem',
		width: '100%',
		transition: 'border-width 150ms ease, border-color 150ms ease, background-color 150ms ease',
		borderWidth: 'thin',
		borderColor: 'var(--color-success)',
		color: 'var(--color-input)',
	}),

	Label: styled('label', {
		fontSize: '.85rem',
		transition: 'color 150ms ease',
		color: 'var(--color-success)',
		'&::first-letter': {
			textTransform: 'capitalize',
		},
	}),

	Error: styled('span', {
		fontSize: '.8rem',
		color: 'var(--color-danger)',
		transition: 'transform 150ms ease, filter 100ms ease',
		minHeight: '1.25rem',
		transform: 'translateX(-2rem)',
		filter: 'opacity(.1)',
	}),
};

const StyledForm = styled('form', {
	backgroundColor: '#FFF0',
	width: '100%',
	height: 'auto',
	padding: '2rem',
	display: 'flex',
	flexFlow: 'column',
	gap: '1rem',
	borderRadius: 'var(--default-border-radius)',
});

interface Props extends ReactProps<'form'> {}
export const Form = (props: Props) => <StyledForm {...props} />;
