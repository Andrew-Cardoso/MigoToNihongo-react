import {keyframes, styled} from '@stitches/react';
import React from 'react';
import {ReactProps} from '../../types/helper.types';
import {FormElements} from '../Form';

const shrinkBounce = keyframes({
	'0%': {
		transform: 'scale(1)',
	},
	'33%': {
		transform: 'scale(.85)',
	},
	'100%': {
		transform: 'scale(1)',
	},
});
const checkboxCheck = keyframes({
	'0%': {
		width: '0',
		height: '0',
		borderColor: 'var(--text-light)',
		transform: 'translate3d(0,0,0) rotate(45deg)',
	},
	'33%': {
		width: '.2rem',
		height: '0',
		transform: 'translate3d(0,0,0) rotate(45deg)',
	},
	'100%': {
		width: '.2rem',
		height: '.5rem;   ',
		borderColor: 'var(--text-light)',
		transform: 'translate3d(0,-.5em,0) rotate(45deg)',
	},
});

const StyledCheckbox = styled('input', {
	height: 0,
	width: 0,

	'& + label': {
		position: 'relative',
		display: 'flex',
		margin: '.6rem 0',
		alignItems: 'center',
		color: 'var(--text-light)',
		transition: 'color 250ms cubic-bezier(.4,.0,.23,1)',
	},

	'& + label > ins': {
		position: ' absolute',
		display: ' block',
		bottom: ' 0',
		left: ' 2rem',
		height: ' 0',
		width: ' 100%',
		overflow: ' hidden',
		textDecoration: ' none',
		transition: ' height 300ms cubic-bezier(.4,.0,.23,1)',
	},
	'& + label > ins > i': {
		position: 'absolute',
		bottom: 0,
		fontStyle: 'normal',
		color: 'var(--text-light)',
	},
	'& + label > span': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: '1rem',
		width: '1rem',
		height: '1rem',
		background: 'transparent',
		border: '.125rem solid var(--text-light)',
		borderRadius: '.125rem',
		cursor: 'pointer; ',
		transition: 'all 250ms cubic-bezier(.4,.0,.23,1)',
	},

	'& + label:hover': {
		color: 'var(--text-light-secondary)',
	},
	'&:focus + label': {
		color: 'var(--text-light-secondary)',
	},
	'& + label:hover > span': {
		borderColor: 'var(--text-light-secondary)',
	},
	'&:focus + label > span': {
		borderColor: 'var(--text-light-secondary)',
	},
	'&:checked + label > ins': {
		height: '100%',
	},

	'&:checked + label > span': {
		border: '.5rem solid transparent',
		animation: `${shrinkBounce} 200ms cubic-bezier(.4,.0,.23,1)`,
	},
	'&:checked + label > span:before': {
		content: '""',
		position: 'absolute',
		top: '.6rem',
		left: '.2rem',
		borderRight: '.1875rem solid transparent',
		borderBottom: '.1875rem solid transparent',
		transform: 'rotate(45deg)',
		transformOrigin: '0% 100%',
		animation: `${checkboxCheck} 125ms 250ms cubic-bezier(.4,.0,.23,1) forwards`,
	},
});

interface Props extends Omit<ReactProps<'input'>, 'type'> {
	label: string;
}

type Input = React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;

export const Checkbox: Input = React.forwardRef(({label, ...props}, ref) => (
	<FormElements.Container style={{marginBottom: '1rem'}}>
		<StyledCheckbox type='checkbox' {...props} id={props.name} ref={ref} />
		<label htmlFor={props.name}>
			<span></span>
			{label}
			<ins>
				<i>{label}</i>
			</ins>
		</label>
	</FormElements.Container>
));
