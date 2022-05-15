import {UserCircle} from 'phosphor-react';
import {Post} from '../../../models/post';
import {Button} from '../../Button';
import {Card, CardElements} from '../../Card';

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
			<CardElements.Flex.Container>
				<CardElements.Flex.Paragraph>Texto por:</CardElements.Flex.Paragraph>
				<CardElements.Flex.Paragraph>
					<UserCircle weight='bold' size='2rem' />
					Lorem, ipsum dolor.
				</CardElements.Flex.Paragraph>
				<CardElements.Flex.Paragraph>Ha:</CardElements.Flex.Paragraph>
				<CardElements.Flex.Paragraph>21 dias atras</CardElements.Flex.Paragraph>
			</CardElements.Flex.Container>
			<CardElements.Footer>
				<Button variant='link'>Ver comentarios...</Button>
			</CardElements.Footer>
		</Card>
	);
};
