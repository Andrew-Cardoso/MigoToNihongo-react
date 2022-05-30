import {useEffect, useState} from 'react';
import {AsideNav} from './Aside';
import PostsContext from './_contexts/posts.context';
import {PostsContainer} from './PostsContainer';
import {Post} from '../../_api/models/posts';
import {usePostsApi} from '../../_api/api.hook';

export const Home = () => {
	const api = usePostsApi();
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		api.getPosts().then((data) => setPosts(data));
	}, []);

	return (
		<PostsContext.Provider value={posts}>
			<AsideNav />
			<PostsContainer />
		</PostsContext.Provider>
	);
};
