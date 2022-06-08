import {lazy, Suspense, useEffect, useState} from 'react';
import PostsContext from './_contexts/posts.context';
import {PostsContainer} from './PostsContainer';
import {Post} from '../../_api/models/posts';
import {usePostsApi} from '../../_api/api.hook';
import {Spinner} from '../Spinner';
import {Temporal} from '@js-temporal/polyfill';
import { TIME_ZONE } from '../../utils/temporal';

const AsideNav = lazy(() => import('./Aside'));
const HiddenNav = lazy(() => import('./HiddenNav'));

export const Home = () => {
	const api = usePostsApi();
	const [posts, setPosts] = useState<Post[]>([]);
	const [screenWidth] = useState(window.screen.availWidth);

	console.log(Temporal);

	useEffect(() => {
		// api.getPosts().then((data) => setPosts(data));
		const a = [] as Post[];
		for (let i = 0; i < 20; i++)
			a.push({
				author: {
					name: 'Andrew',
					photo: 'https://picsum.photos/200',
				},
				content: `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam beatae, ipsa illum ex commodi corrupti aspernatur eveniet facere est sequi id ut reiciendis incidunt excepturi minima doloremque tempora quas ratione distinctio inventore? Sapiente facere architecto qui neque. Perferendis, vero. Nobis, non culpa. Reiciendis eos architecto omnis perspiciatis aspernatur obcaecati? Ab accusantium ducimus illum quo blanditiis perferendis assumenda aut nostrum minus!</p>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam beatae, ipsa illum ex commodi corrupti aspernatur eveniet facere est sequi id ut reiciendis incidunt excepturi minima doloremque tempora quas ratione distinctio inventore? Sapiente facere architecto qui neque. Perferendis, vero. Nobis, non culpa. Reiciendis eos architecto omnis perspiciatis aspernatur obcaecati? Ab accusantium ducimus illum quo blanditiis perferendis assumenda aut nostrum minus!</p>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam beatae, ipsa illum ex commodi corrupti aspernatur eveniet facere est sequi id ut reiciendis incidunt excepturi minima doloremque tempora quas ratione distinctio inventore? Sapiente facere architecto qui neque. Perferendis, vero. Nobis, non culpa. Reiciendis eos architecto omnis perspiciatis aspernatur obcaecati? Ab accusantium ducimus illum quo blanditiis perferendis assumenda aut nostrum minus!</p>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam beatae, ipsa illum ex commodi corrupti aspernatur eveniet facere est sequi id ut reiciendis incidunt excepturi minima doloremque tempora quas ratione distinctio inventore? Sapiente facere architecto qui neque. Perferendis, vero. Nobis, non culpa. Reiciendis eos architecto omnis perspiciatis aspernatur obcaecati? Ab accusantium ducimus illum quo blanditiis perferendis assumenda aut nostrum minus!</p>
			`,
				date: Temporal.Now.plainDateTimeISO().toString(),
				id: i + '',
				linkText: `Link n ${i}`,
				title: `Post title ${i}`,
			});
		setPosts(a);
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
