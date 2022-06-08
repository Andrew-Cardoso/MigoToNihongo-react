import {styled} from '@stitches/react';
import {Card, CardElements} from '../Card';
import {PostData} from '../../_api/models/posts';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Editor} from './Editor';
import {usePostsApi} from '../../_api/api.hook';
import {Form, FormElements} from '../Form';
import {Input} from '../Input';
import {ButtonContainer} from '../ButtonContainer';
import {Button} from '../Button';
import {isNullOrEmpty} from '../../utils/check-null';
import {useToast} from '../../_toast/hook';

const StyledContainer = styled('div', {
	width: '100%',
	maxWidth: '1024px',
});

const Quill = () => {
	const api = usePostsApi();
	const toast = useToast();
	const [post, setPost] = useState<PostData>({content: '', title: '', linkText: ''});
	const [isDisabled, setDisabled] = useState(true);

	useEffect(() => {
		setDisabled(Object.values(post).some((value) => isNullOrEmpty.String(value as string)));
	}, [post]);

	const resetPost = () => setPost({content: '', linkText: '', title: ''});

	const handleChange =
		(key: keyof PostData) =>
		({target}: ChangeEvent<HTMLInputElement>) =>
			setPost({...post, [key]: target.value});

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault();

		api.createPost(post).then(() => {
			toast('success', 'Postado!');
			resetPost();
		});
	};

	return (
		<StyledContainer>
			<Card>
				<CardElements.Header>Criar Post</CardElements.Header>
				<CardElements.Content>
					<Form onSubmit={handleSubmit}>
						<Input label='título' value={post.title} onChange={handleChange('title')} />
						<Input
							label='link'
							value={post.linkText}
							onChange={handleChange('linkText')}
						/>
						<Editor
							label='conteúdo'
							value={post.content}
							onChange={(content) => setPost({...post, content})}
						/>

						<FormElements.Container style={{marginTop: '1rem'}}>
							<ButtonContainer>
								<Button type='submit' variant='primary' disabled={isDisabled}>
									Salvar e postar
								</Button>
								<Button position='right' onClick={resetPost}>
									Limpar tudo
								</Button>
							</ButtonContainer>
						</FormElements.Container>
					</Form>
				</CardElements.Content>
			</Card>
		</StyledContainer>
	);
};

export default Quill;
