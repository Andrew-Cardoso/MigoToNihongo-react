import {keyframes, styled} from '@stitches/react';

const StyledContainer = styled('label', {
	display: 'flex',
	gap: '.5rem',
	alignItems: 'center',
	justifyContent: 'flex-start',
});

const SwitchContainer = styled('div', {
	position: 'relative',
	width: '3rem',
	height: '1.25rem',
	borderRadius: '1rem',
	backgroundColor: 'var(--color-danger)',

	'& > *:first-child': {
		opacity: 0,
	},

	'& > *:last-child': {
		opacity: 1,
	},

	'&::after': {
		content: '',
		position: 'absolute',
		width: '1.35rem',
		height: '1.35rem',
		backgroundColor: 'var(--main-light)',
		borderRadius: '50%',
		top: '-.05rem',
		left: 0,
		transition: 'left 100ms ease-out',
	},

	variants: {
		checked: {
			true: {
				backgroundColor: 'var(--color-success)',
				'&::after': {
					left: 'calc(100% - 1.35rem)',
				},
				'& > *:first-child': {
					opacity: '1',
				},
				'& > *:last-child': {
					opacity: 0,
				},
			},
		},
		loading: {
			true: {
				filter: 'brightness(0.75)',
			},
		},
	},
});

const spin = keyframes({
	from: {
		transform: 'rotateZ(0)',
	},
	to: {
		transform: 'rotateZ(360deg)',
	},
});
const SwitchSvg = styled('svg', {
	width: '1rem',
	height: '1rem',
	position: 'absolute',
	top: '.125rem',
	left: '.35rem',
	transition: 'opacity 100ms ease',

	'&:last-child': {
		left: 'unset',
		right: '.35rem',
	},

	variants: {
		spin: {
			true: {
				animation: `${spin} 400ms linear infinite`,
			},
		},
	},
});

interface Props {
	label: string;
	value: boolean;
	onChange: (checked: boolean) => any;
	loading?: boolean;
}

export const Switch = ({value, onChange, label, loading}: Props) => (
	<StyledContainer>
		<SwitchContainer
			role='button'
			onClick={() => !loading && onChange(!value)}
			checked={value}
			loading={loading}
		>
			{loading ? (
				<>
					<SwitchSvg viewBox='0 0 24 24' spin={true}>
						<path fill='currentColor' d='M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z' />
					</SwitchSvg>
					<SwitchSvg viewBox='0 0 24 24' spin={true}>
						<path fill='currentColor' d='M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z' />
					</SwitchSvg>
				</>
			) : (
				<>
					<SwitchSvg viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z'
						/>
					</SwitchSvg>
					<SwitchSvg viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z'
						/>
					</SwitchSvg>
				</>
			)}
		</SwitchContainer>
		<span>{label}</span>
	</StyledContainer>
);
