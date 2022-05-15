import {styled} from '@stitches/react';
import React, {BaseSyntheticEvent, ChangeEventHandler, useState} from 'react';
import {ReactProps} from '../../types/helper.types';
import {toBase64} from '../../utils/image';
import {Avatar} from '../Avatar';
import {CropImage} from '../Crop';
import {FormElements} from '../Form';

interface FileInputProps {
	label: string;
	onChange: (image: string) => any;
	value: string;
	errorMessage?: string;
	cropImage?: boolean;
}

type FileInput = React.ForwardRefExoticComponent<
	FileInputProps & React.RefAttributes<HTMLInputElement>
>;

const StyledFileInput = styled('input', {
	all: 'unset',
	background: 'Red',
	position: 'absolute',
	inset: '0',
	zIndex: 1,
	opacity: 0,
	cursor: 'pointer',
});

const StyledFileContainer = styled('div', {
	width: '100%',
	height: 'auto',
	position: 'relative',
});

export const FileInput: FileInput = React.forwardRef(
	({label, cropImage, value, onChange, ...props}, ref) => {
		const [imageSrc, setImageSrc] = useState<string | undefined>(value);
		const [imageToCrop, setImageToCrop] = useState<string | boolean>(false);

		const handleUpload = async ({target}: BaseSyntheticEvent) => {
			if (!target.files?.[0]) return;

			const image = await toBase64(target.files[0]);

			if (!image) return;

			setImageSrc(image);

			cropImage ? setImageToCrop(image) : onChange(image);
		};

		const onCropped = (src?: string) => {
			setImageSrc(src);
			setImageToCrop(false);
			if (src) onChange(src);
		};

		return (
			<>
				<FormElements.Container file>
					<FormElements.Label>{label}</FormElements.Label>
					<StyledFileContainer>
						<Avatar alt={label} src={imageSrc} />
						<StyledFileInput
							{...props}
							ref={ref}
							type='file'
							title='teste'
							onChange={handleUpload}
						/>
					</StyledFileContainer>
				</FormElements.Container>
				{cropImage && (
					<CropImage
						show={!!imageToCrop}
						onClose={onCropped}
						src={imageToCrop as string}
					/>
				)}
			</>
		);
	},
);
