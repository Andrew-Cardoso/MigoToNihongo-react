import {lazy, Suspense, useEffect, useState} from 'react';
import PostsContext from './_contexts/posts.context';
import {PostsContainer} from './PostsContainer';
import {Post} from '../../_api/models/posts';
import {usePostsApi} from '../../_api/api.hook';
import {Spinner} from '../Spinner';

const AsideNav = lazy(() => import('./Aside'));
const HiddenNav = lazy(() => import('./HiddenNav'));

export const Home = () => {
	const api = usePostsApi();
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [screenWidth] = useState(window.screen.availWidth);

	useEffect(() => {
		api.getPosts()
			.then((data) => setPosts(data))
			.finally(() => setLoading(false));
	}, []);

	return (
		<PostsContext.Provider value={[posts, loading]}>
			{screenWidth > 480 ? (
				<Suspense fallback={<Spinner size='sm' />}>
					<AsideNav />
				</Suspense>
			) : (
				<Suspense fallback={<Spinner size='xsm' />}>
					<HiddenNav />
				</Suspense>
			)}
			<PostsContainer />
		</PostsContext.Provider>
	);
};
