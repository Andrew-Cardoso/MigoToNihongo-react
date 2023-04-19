import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Inline = Quill.import('blots/inline');

class TranslateBlot extends Inline {
	static create(value: string) {
		const node = super.create();
		node.setAttribute('data-meaning', value);
		return node;
	}

	static formats(node: HTMLSpanElement) {
		return node.getAttribute('data-meaning');
	}
}
TranslateBlot.blotName = 'translate';
TranslateBlot.tagName = 'span';

Quill.register(TranslateBlot);

const editorDiv = document.createElement('div');
const toolbarDiv = document.createElement('div');
toolbarDiv.id = 'toolbar';
toolbarDiv.innerHTML = `
  <span class='ql-formats'>
    <select class='ql-font'></select>
    <select class='ql-size'></select>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-bold'></button>
    <button type="button" class='ql-italic'></button>
    <button type="button" class='ql-underline'></button>
    <button type="button" class='ql-strike'></button>
  </span>
  <span class='ql-formats'>
    <select class='ql-color'></select>
    <select class='ql-background'></select>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-script' value='sub'></button>
    <button type="button" class='ql-script' value='super'></button>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-header' value='1'></button>
    <button type="button" class='ql-header' value='2'></button>
    <button type="button" class='ql-blockquote'></button>
    <button type="button" class='ql-code-block'></button>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-list' value='ordered'></button>
    <button type="button" class='ql-list' value='bullet'></button>
    <button type="button" class='ql-indent' value='-1'></button>
    <button type="button" class='ql-indent' value='+1'></button>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-direction' value='rtl'></button>
    <select class='ql-align'></select>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-link'></button>
    <button type="button" class='ql-image'></button>
    <button type="button" class='ql-video'></button>
    <button type="button" class='ql-formula'></button>
  </span>
  <span class='ql-formats'>
    <button type="button" class='ql-clean'></button>
  </span>

  <span class="ql-formats">
    <button class="ql-translate">
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11 4V6H4V8H15.36C15.13 8.87 14.63 9.77 13.88 10.69C13.35 11.35 12.71 12 12 12.67C11.29 12 10.65 11.35 10.12 10.69C9.65 10.12 9.3 9.55 9.03 9H6.85C7.21 10.05 7.82 11.03 8.56 11.95C9.13 12.66 9.79 13.34 10.5 14L5.36 18.23L6.64 19.77L12 15.34L17.36 19.77L18.64 18.23L13.5 14C14.21 13.34 14.87 12.66 15.44 11.95C16.41 10.74 17.16 9.43 17.4 8H20V6H13V4Z"
        />
      </svg>
    </button>
  </span>
`;

const qlTranslateBtn = toolbarDiv.querySelector<HTMLButtonElement>('.ql-translate')!;

const quill = new Quill(editorDiv, {
	modules: {
		toolbar: toolbarDiv,
	},
	theme: 'snow',
});

export interface QuillHandler {
	value: {
		get: () => string;
		set: (value: string) => void;
	};
	translate: {
		onClick: (handler: () => void) => void;
		add: (value: string) => void;
		clear: () => void;
	};
}

type UseQuill = (id: string) => QuillHandler;

export const useQuill: UseQuill = (id) => {
	const container = document.getElementById(id)!;
	container.innerHTML = '';

	container.appendChild(toolbarDiv);
	container.appendChild(editorDiv);

	return {
		value: {
			get: () => quill.root.innerHTML,
			set: (value: string) => quill.setText(value),
		},
		translate: {
			onClick: (handler: () => void) => (qlTranslateBtn.onclick = handler),
			add: (value: string) => {
				quill.format('translate', value);
			},
			clear: () => {
				quill.root.querySelectorAll('span[data-meaning=undefined]').forEach((node) => {
					const text = (node as HTMLSpanElement).innerText;
					node.insertAdjacentText('afterend', text);
					node.remove();
				});
			},
		},
	};
};
