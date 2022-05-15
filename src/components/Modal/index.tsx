import {styled} from '@stitches/react';

const ModalContainer = styled('div', {
	position: 'fixed',
	inset: '0',
	background: 'transparent',
	zIndex: 9,
	backdropFilter: 'blur(4px) brightness(.7)',
	display: 'grid',
	placeItems: 'center',
	transform: 'scale(0)',
	transition: 'transform 200ms ease',
	variants: {
		show: {
			true: {
				transform: 'scale(1)',
			},
		},
	},
});

interface ModalProps {
	children: JSX.Element | string;
	title: string;
	onClose: (saved: boolean) => any;
	show?: boolean;
	saveButtonText?: string;
	closeButtonText?: string;
	disableSaveButton?: boolean;
	size?: 'sm' | 'md' | 'lg',
}

import {createPortal} from 'react-dom';
import {Button} from '../Button';
import {ButtonContainer} from '../ButtonContainer';
import {Card, CardElements} from '../Card';

export const Modal = ({
	title,
	show,
	children,
	onClose,
	saveButtonText,
	closeButtonText,
	disableSaveButton,
	size,
}: ModalProps) => {
	const handleClose = (saved?: boolean) => () => onClose(saved ?? false);
	return createPortal(
		<ModalContainer show={show}>
			<Card role='modal' size={size}>
				<CardElements.Header>
					<h1>{title}</h1>
				</CardElements.Header>
				<CardElements.Content>{children}</CardElements.Content>
				<CardElements.Footer>
					<ButtonContainer align='right'>
						<Button onClick={handleClose(true)} variant='success' disabled={disableSaveButton}>
							{saveButtonText ?? 'Salvar'}
						</Button>
						<Button onClick={handleClose()} variant='default'>
							{closeButtonText ?? 'Voltar'}
						</Button>
					</ButtonContainer>
				</CardElements.Footer>
			</Card>
		</ModalContainer>,
		document.getElementById('root')!,
	);
};
