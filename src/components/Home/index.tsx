import {lazy, Suspense, useEffect, useState} from 'react';
import PostsContext from './_contexts/posts.context';
import {PostsContainer} from './PostsContainer';
import {Post} from '../../_api/models/posts';
import {usePostsApi} from '../../_api/api.hook';
import {Spinner} from '../Spinner';
import {Temporal} from '@js-temporal/polyfill';

const AsideNav = lazy(() => import('./Aside'));
const HiddenNav = lazy(() => import('./HiddenNav'));

export const Home = () => {
	const api = usePostsApi();
	const [posts, setPosts] = useState<Post[]>([]);
	const [screenWidth] = useState(window.screen.availWidth);

	console.log(Temporal);

	useEffect(() => {
		api.getPosts().then((data) => setPosts(data));
	}, []);

	return (
		<PostsContext.Provider value={posts}>
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
