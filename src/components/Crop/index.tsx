import {useRef, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import {Modal} from '../Modal';

import 'react-image-crop/dist/ReactCrop.css';
import {styled} from '@stitches/react';

const GridContainer = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
});

const croppedImageToBase64 = (image: HTMLImageElement, crop: Crop) => {
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = crop.width;
	canvas.height = crop.height;
	const ctx = canvas.getContext('2d')!;
	const pixelRatio = window.devicePixelRatio;
	canvas.width = crop.width * pixelRatio;
	canvas.height = crop.height * pixelRatio;
	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	ctx.imageSmoothingQuality = 'high';

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height,
	);
	const base64Image = canvas.toDataURL('image/jpeg');
	canvas.remove();
	return base64Image;
};

interface Props {
	show: boolean;
	onClose: (src?: string) => any;
	src?: string;
}
export const CropImage = ({show, src, onClose}: Props) => {
	if (!src) return null;
	const imgRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState<Crop>();
	const cropImage = (saved: boolean) => {
		if (!crop || !saved) return onClose();

		const croppedImage = croppedImageToBase64(imgRef.current!, crop);
		onClose(croppedImage);
	};

	return (
		<Modal
			title='Cortar imagem'
			onClose={cropImage}
			show={show}
			saveButtonText='Cortar'
			disableSaveButton={!crop}
			size='md'
		>
			<GridContainer>
				<ReactCrop crop={crop} onChange={setCrop} aspect={1 / 1} circularCrop={true}>
					<img src={src} ref={imgRef} />
				</ReactCrop>
			</GridContainer>
		</Modal>
	);
};
