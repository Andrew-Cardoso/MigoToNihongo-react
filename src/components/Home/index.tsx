import {styled} from '@stitches/react';
import {AsideNav} from './Aside';
import {PostsContainer} from './PostsContainer';

const StyledContainer = styled('div', {
	width: '100%',
	display: 'flex',
	gap: '1rem',
	padding: '1rem',
});

export const Home = () => {
	return (
		<StyledContainer>
			<AsideNav />
			<PostsContainer />
		</StyledContainer>
	);
};
