import {styled} from '@stitches/react';
import {isNullOrEmpty} from '../../utils/string-methods';

import defaultUserImage from './user.png';

const StyledImageContainer = styled('div', {
	width: '6rem',
	height: '6rem',
	borderRadius: '50%',
	border: '1px solid var(--text-light)',
});

const StyledImage = styled('img', {
	width: '100%',
	height: '100%',
	borderRadius: '50%',
	variants: {
		isDefault: {
			true: {
				borderRadius: 'unset',
			},
		},
	},
});

interface Props {
	alt: string;
	src?: string;
}
export const Avatar = ({src, alt}: Props) => (
	<StyledImageContainer>
		<StyledImage
			src={isNullOrEmpty(src) ? defaultUserImage : src}
			alt={alt ?? 'Avatar image'}
			isDefault={!src}
		/>
	</StyledImageContainer>
);
