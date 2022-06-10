import {styled} from '../../../utils/breakpoints';
import {Post} from '../../../_api/models/posts';
import {Card, CardElements} from '../../Card';
import {Info} from './Info';

const CardContent = styled(CardElements.Content, {
	wordBreak: 'break-word',
	hyphens: 'auto',
});

interface Props {
	post: Post;
}
export const PostCard = ({post}: Props) => {
	return (
		<Card id={post.id}>
			<CardElements.Header>
				<h1>{post.title}</h1>
			</CardElements.Header>
			<CardContent dangerouslySetInnerHTML={{__html: post.content}}></CardContent>
			<CardElements.Content>
				<Info author={post.author} datePosted={post.date} />
			</CardElements.Content>
			{/* <CardElements.Footer>
				<Button variant='link'>Ver comentarios...</Button>
			</CardElements.Footer> */}
		</Card>
	);
};
