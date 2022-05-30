import {styled} from '@stitches/react';
import {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FormElements} from '../../Form';

const QuillEditor = ReactQuill as any;

const StyledEditorContainer = styled('div', {
	width: '100%',
	height: '100%',
	padding: 0,
	margin: 0,
	backgroundColor: 'var(--main-light)',
	color: 'var(--text-dark)',
});

interface Props {
	value: string;
	label: string;
	onChange: (value: string) => any;
}
export const Editor = ({onChange, value, label}: Props) => {
	useEffect(() => {
		// Quill has a bug that creates two toolbars
		setTimeout(() => {
			const toolbars = document.querySelectorAll('.ql-toolbar.ql-snow');
			toolbars.length > 1 && toolbars[0].remove();
		});
	}, []);

	return (
		<FormElements.Container>
			<FormElements.Label>{label}</FormElements.Label>
			<StyledEditorContainer>
				<QuillEditor theme='snow' value={value} onChange={onChange} />
			</StyledEditorContainer>
		</FormElements.Container>
	);
};
