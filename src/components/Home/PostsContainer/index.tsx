import {styled} from '@stitches/react';
import {useContext} from 'react';
import {PostCard} from '../PostCard';
import PostsContext from '../_contexts/posts.context';

const StyledContainer = styled('div', {
	width: '100%',
	height: 'auto',
	display: 'flex',
	flexFlow: 'column',
	gap: '2rem',
});

export const PostsContainer = () => {
	const posts = useContext(PostsContext);
	return (
		<StyledContainer>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</StyledContainer>
	);
};
