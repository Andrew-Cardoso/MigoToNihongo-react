import {useEffect, useState} from 'react';
import {Post} from '../../models/post';
import {AsideNav} from './Aside';
import PostsContext from './_contexts/posts.context';
import {PostsContainer} from './PostsContainer';
// import {getPosts} from '../../services/api.service';

export const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		// getPosts().then(setPosts);
	}, []);

	return (
		<PostsContext.Provider value={posts}>
			<AsideNav />
			<PostsContainer />
		</PostsContext.Provider>
	);
};
