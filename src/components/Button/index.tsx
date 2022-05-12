import {styled} from '@stitches/react';
import {memo} from 'react';
import {ColorVariant, ElementSize, ReactProps} from '../../types/helper.types';

const StyledButton = styled('button', {
	color: 'var(--button-text-color)',
	display: 'flex',
	placeItems: 'center',
	gap: '1rem',
	boxShadow: 'none',
	outline: 'none',
	border: 'none',
	borderRadius: 'var(--default-border-radius)',
	transition: 'filter .2s ease',
	variants: {
		position: {
			left: {
				marginRight: 'auto',
			},
			right: {
				marginLeft: 'auto',
			},
			center: {
				margin: '0 auto',
			},
			default: {},
		},
		variant: {
			primary: {
				backgroundColor: 'var(--color-primary)',
			},
			info: {
				backgroundColor: 'var(--color-info)',
			},
			default: {
				backgroundColor: 'var(--color-default)',
			},
			success: {
				backgroundColor: 'var(--color-success)',
			},
			warning: {
				backgroundColor: 'var(--color-warning)',
			},
			danger: {
				backgroundColor: 'var(--color-danger)',
			},
		},
		size: {
			xsm: {
				padding: '.3125rem',
				display: 'inline-block',
			},
			sm: {
				fontSize: '.9rem',
				padding: '.5rem 1rem',
			},
			md: {
				fontSize: '.9rem',
				padding: '.75rem 1.88rem',
			},
			lg: {
				padding: '1rem 2.5rem',
			},
		},
		icon: {
			true: {
				paddingTop: '0',
				paddingBottom: '0',
			},
		},
	},
	'&:hover': {
		filter: 'brightness(1.1)',
	},
});

interface Props extends ReactProps<'button'> {
	position?: 'left' | 'right' | 'center';
	size?: ElementSize;
	icon?: boolean;
	variant?: ColorVariant;
}
const ButtonComponent = ({variant, size, position, icon, ...props}: Props) => (
	<StyledButton
		variant={variant ?? 'default'}
		size={size ?? 'md'}
		icon={icon}
		position={position ?? 'default'}
		{...props}
	/>
);

export const Button = memo(ButtonComponent);
