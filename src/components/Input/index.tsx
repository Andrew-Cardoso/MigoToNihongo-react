import React from 'react';
import {ReactProps} from '../../types/helper.types';
import {FormElements} from '../Form';

interface Props extends ReactProps<'input'> {
	label: string;
	errorMessage?: string;
}

type Input = React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;

export const Input: Input = React.forwardRef(({label, errorMessage, ...props}, ref) => (
	<FormElements.Container invalid={!!errorMessage}>
		<FormElements.Label>{label}</FormElements.Label>
		<FormElements.Input {...props} ref={ref} />
		<FormElements.Error>{errorMessage ?? false}</FormElements.Error>
	</FormElements.Container>
));
