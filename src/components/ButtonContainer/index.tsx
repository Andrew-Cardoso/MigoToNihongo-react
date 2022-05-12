import {styled} from '@stitches/react';
import {ReactProps} from '../../types/helper.types';

const StyledButtonContainer = styled('section', {
	width: '100%',
	height: 'auto',
	display: 'flex',
	gap: '1rem',

	variants: {
		icons: {
			true: {
				gap: '.3rem',
			},
		},
	},
});

interface Props extends ReactProps<'section'> {
	icons?: boolean;
}
export const ButtonContainer = ({icons, ...props}: Props) => <StyledButtonContainer icons={icons} {...props} />;
