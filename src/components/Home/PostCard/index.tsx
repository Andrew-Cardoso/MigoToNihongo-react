import {keyframes} from '@stitches/react';
import {useEffect, useRef} from 'react';
import {styled} from '../../../utils/breakpoints';
import {sleep} from '../../../utils/sleep';
import {Post} from '../../../_api/models/posts';
import {Card, CardElements} from '../../Card';
import {Info} from './Info';

const showMeaning = keyframes({
	'0%': {
		opacity: 1,
		transform: 'translateX(0)',
		filter: 'blur(0)',
	},
	'10%': {
		opacity: 1,
		transform: 'translateX(2px)',
		filter: 'blur(1px)',
	},
	'20%': {
		opacity: 1,
		transform: 'translateX(-2px)',
		filter: 'blur(1px)',
	},
	'30%': {
		opacity: 1,
		transform: 'translateX(2px)',
		filter: 'blur(1px)',
	},
	'40%': {
		opacity: 0.9,
		transform: 'translateX(-2px)',
		filter: 'blur(2px)',
	},
	'50%': {
		opacity: 0.8,
		transform: 'translateX(3px)',
		filter: 'blur(2px)',
	},
	'60%': {
		opacity: 0.7,
		transform: 'translateX(-3px)',
		filter: 'blur(2px)',
	},
	'70%': {
		opacity: 0.6,
		transform: 'translateX(3px)',
		filter: 'blur(3px)',
	},
	'80%': {
		opacity: 0.5,
		transform: 'translateX(-1px)',
		filter: 'blur(3px)',
	},
	'90%': {
		opacity: 0.4,
		transform: 'translateX(1px)',
		filter: 'blur(4px)',
	},
	'100%': {
		opacity: 0,
		transform: 'translateX(0)',
		filter: 'blur(4px)',
	},
});

const CardContent = styled(CardElements.Content, {
	wordBreak: 'break-word',
	hyphens: 'auto',
	'& [data-meaning]': {
		display: 'inline-block',
	},
	'& .animate-meaning': {
		animationName: showMeaning,
		animationDuration: '500ms',
		animationIterationCount: '2',
		animationFillMode: 'forwards',
		animationTimingFunction: 'ease-in-out',
		animationDirection: 'alternate',
	},
});

type MeaningFn = (word: HTMLSpanElement) => (ev?: Event) => Promise<void>;

const toggleMeaning: MeaningFn = (word) => async () => {
	if (word.classList.contains('animate-meaning')) {
		return;
	}
	word.classList.add('animate-meaning');

	await sleep(500);

	const meaning = word.getAttribute('data-meaning')!;
	word.setAttribute('data-meaning', word.innerText);
	word.innerHTML = meaning;
	await sleep(500);

	word.classList.remove('animate-meaning');
};

const hideMeaning: MeaningFn = (word) => async (ev) => {
	if (word.classList.contains('animate-meaning')) {
		await sleep(1000);
		return hideMeaning(word)(ev);
	}

	!word.matches(':hover') && toggleMeaning(word)();

	word.addEventListener('mouseleave', hideMeaning(word), {once: true});
};

interface Props {
	post: Post;
}
export const PostCard = ({post}: Props) => {
	const postDiv = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = postDiv.current;
		if (!div) return;

		const japaneseWords = div.querySelectorAll('[data-meaning]');

		japaneseWords.forEach((word) => {
			word.addEventListener('mouseenter', toggleMeaning(word as HTMLSpanElement));
			word.addEventListener('mouseleave', hideMeaning(word as HTMLSpanElement), {once: true});
		});

		return () => {
			japaneseWords.forEach((word) => {
				console.log('removed ');
				word.removeEventListener('mouseenter', toggleMeaning(word as HTMLSpanElement));
				word.removeEventListener('mouseleave', hideMeaning(word as HTMLSpanElement));
			});
		};
	}, []);

	return (
		<Card id={post.id}>
			<CardElements.Header>
				<h1>{post.title}</h1>
			</CardElements.Header>
			<CardContent
				ref={postDiv}
				dangerouslySetInnerHTML={{__html: post.content}}
			></CardContent>
			<CardElements.Content>
				<Info author={post.author} datePosted={post.date} />
			</CardElements.Content>
			{/* <CardElements.Footer>
				<Button variant='link'>Ver comentarios...</Button>
			</CardElements.Footer> */}
		</Card>
	);
};
