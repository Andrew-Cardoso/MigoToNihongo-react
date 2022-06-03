import {styled} from '../../utils/breakpoints';
import {ReactProps} from '../../types/helper.types';

const StyledButtonContainer = styled('section', {
	width: '100%',
	height: 'auto',
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',

	'@smartphone': {
		gap: '.5rem',
		justifyContent: 'space-between'
	},
	variants: {
		icons: {
			true: {
				gap: '.3rem',
			},
		},
		align: {
			right: {
				justifyContent: 'flex-end',
			},
			center: {
				justifyContent: 'flex-start',
			},
			left: {
				justifyContent: 'center',
			},
		},
	},
});

interface Props extends ReactProps<'section'> {
	icons?: boolean;
	align?: 'right' | 'center' | 'left';
}
export const ButtonContainer = (props: Props) => <StyledButtonContainer {...props} />;
