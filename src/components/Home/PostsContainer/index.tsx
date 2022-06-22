import {styled} from '@stitches/react';
import {useContext} from 'react';
import {Spinner} from '../../Spinner';
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
	const [posts, loading] = useContext(PostsContext);
	return (
		<StyledContainer>
			{loading ? (
				<Spinner adapt={true} />
			) : (
				posts.map((post) => <PostCard key={post.id} post={post} />)
			)}
		</StyledContainer>
	);
};
