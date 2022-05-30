import {Post} from '../../../_api/models/posts';
import {Card, CardElements} from '../../Card';
import {Info} from './Info';

interface Props {
	post: Post;
}
export const PostCard = ({post}: Props) => {
	return (
		<Card id={post.id}>
			<CardElements.Header>
				<h1>Titulo</h1>
			</CardElements.Header>
			<CardElements.Content
				dangerouslySetInnerHTML={{__html: post.content}}
			></CardElements.Content>
			<CardElements.Content>
				<Info author={post.author} datePosted={post.date} />
			</CardElements.Content>
			{/* <CardElements.Footer>
				<Button variant='link'>Ver comentarios...</Button>
			</CardElements.Footer> */}
		</Card>
	);
};
