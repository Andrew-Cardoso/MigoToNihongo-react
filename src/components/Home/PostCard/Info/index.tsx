import {styled} from '@stitches/react';
import {memo} from 'react';
import {timeAgo} from '../../../../utils/temporal';
import {Author} from '../../../../_api/models/posts';
import {Avatar} from '../../../Avatar';

const StyledContainer = styled('div', {
	width: '100%',
	display: 'grid',
	gridTemplateAreas: '"label label" "photo name" "photo timeago"',
	gridTemplateColumns: '5rem 1fr',
	gridTemplateRows: '1fr .75fr',
	columnGap: '.75rem',
});

const StyledAvatarContainer = styled('section', {
	width: '100%',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
	gridArea: 'photo',
});


const StyledTextContainer = styled('section', {
	width: '100%',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
	justifyContent: 'flex-start',
	justifyItems: 'flex-start',
	variants: {
		area: {
			timeago: {
				gridArea: 'timeago',
			},
			name: {
				gridArea: 'name',
			},
			label: {
				gridArea: 'label',
			},
		},
	},
});

interface Props {
	author: Author;
	datePosted: string;
}
const InfoComponent = ({author, datePosted}: Props) => (
	<StyledContainer>
		<StyledTextContainer area='label'>
			<strong>Postado por:</strong>
		</StyledTextContainer>
		<StyledAvatarContainer>
			<Avatar size='md' alt={author.name} src={author.photo} />
		</StyledAvatarContainer>
		<StyledTextContainer area='name'>
			<p>{author.name}</p>
		</StyledTextContainer>
		<StyledTextContainer area='timeago'>
			<small>{timeAgo(datePosted)}</small>
		</StyledTextContainer>
	</StyledContainer>
);

export const Info = memo(InfoComponent);
