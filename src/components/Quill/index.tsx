import {styled} from '@stitches/react';
import {Card, CardElements} from '../Card';
import {PostData} from '../../_api/models/posts';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Editor, EditorHandle} from './Editor';
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
	const editorRef = useRef<EditorHandle>(null);
	const [post, setPost] = useState<Omit<PostData, 'content'>>({title: '', linkText: ''});

	const resetPost = () => {
		setPost({linkText: '', title: ''});
		editorRef.current?.setValue('');
	};

	const handleChange =
		(key: keyof PostData) =>
		({target}: ChangeEvent<HTMLInputElement>) =>
			setPost({...post, [key]: target.value});

	const isInvalid = () => {
		const div = document.createElement('div');
		div.innerHTML = editorRef.current?.getValue() ?? '';

		const {linkText, title} = post;
		const content = div.innerText;

		const errors: JSX.Element[] = [];

		if (isNullOrEmpty.String(linkText))
			errors.push(<p key='invalid_link'>O link não pode estar vazio</p>);
		if (isNullOrEmpty.String(title))
			errors.push(<p key='invalid_title'>O título não pode estar vazio</p>);
		if (isNullOrEmpty.String(content))
			errors.push(<p key='invalid_content'>O conteúdo não pode estar vazio</p>);

		const hasErrors = errors.length !== 0;

		hasErrors && toast('warning', <div>{errors}</div>);

		return hasErrors;
	};

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault();

		if (isInvalid()) return;

		const content = editorRef.current!.getValue();

		api.createPost({...post, content}).then(() => {
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
						<Editor label='conteúdo' ref={editorRef} />

						<FormElements.Container style={{marginTop: '1rem'}}>
							<ButtonContainer>
								<Button type='submit' variant='primary' disabled={false}>
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
