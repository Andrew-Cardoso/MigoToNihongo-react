import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {styled} from '@stitches/react';
import {FormElements} from '../../Form';
import {QuillHandler, useQuill} from './Toolbar/quill.hook';
import {Modal} from '../../Modal';
import {Input} from '../../Input';

const StyledEditorContainer = styled('div', {
	width: '100%',
	height: '100%',
	padding: 0,
	margin: 0,
	backgroundColor: 'var(--main-light)',
	color: 'var(--text-dark)',
});

export interface EditorHandle {
	getValue(): string;
	setValue(value: string): void;
}

interface Props {
	label: string;
}
export const Editor = forwardRef(({label}: Props, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [quill, setQuill] = useState<QuillHandler>();
	const [showModal, toggleModal] = useState(false);
	const [meaning, setMeaning] = useState('');

	const modalClosed = (saved: boolean) => {
		saved && quill?.translate.add(meaning);
		toggleModal(false);
		setMeaning('');
	};

	useEffect(() => {
		const quillHandler = useQuill('editor');
		setQuill(quillHandler);
		quillHandler.translate.onClick(() => toggleModal(true));
	}, []);

	useImperativeHandle(ref, () => ({
		getValue() {
			return quill?.value.get();
		},
		setValue(value: string) {
			quill?.value.set(value);
		},
	}));

	return (
		<>
			<FormElements.Container>
				<FormElements.Label>{label}</FormElements.Label>
				<StyledEditorContainer id='editor'></StyledEditorContainer>
			</FormElements.Container>
			<Modal
				title='Significado'
				onClose={modalClosed}
				show={showModal}
				saveButtonText='Salvar'
			>
				<>
					<Input
						ref={inputRef}
						label='Digite o significado da palavra/frase'
						onChange={(ev) => setMeaning(ev.currentTarget.value)}
						value={meaning}
					/>
				</>
			</Modal>
		</>
	);
});
