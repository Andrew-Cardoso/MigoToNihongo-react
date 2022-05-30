import {styled} from '@stitches/react';
import {ElementSize} from '../../types/helper.types';
import {isNullOrEmpty} from '../../utils/check-null';

import defaultUserImage from './user.png';

const StyledImageContainer = styled('div', {
	borderRadius: '50%',
	border: '1px solid var(--text-light)',
	variants: {
		size: {
			sm: {
				width: '3rem',
				height: '3rem',
			},
			md: {
				width: '4.5rem',
				height: '4.5rem',
			},
			lg: {
				width: '6rem',
				height: '6rem',
			},
		},
	},
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
	size?: Exclude<ElementSize, 'xsm'>;
	src?: string;
}
export const Avatar = ({src, alt, size}: Props) => (
	<StyledImageContainer size={size ?? 'lg'}>
		<StyledImage
			src={isNullOrEmpty.String(src) ? defaultUserImage : src}
			alt={alt ?? 'Avatar image'}
			isDefault={!src}
		/>
	</StyledImageContainer>
);
