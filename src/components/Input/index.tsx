import React from 'react';
import {ReactProps} from '../../types/helper.types';
import {FormElements} from '../Form';

interface InputProps extends Omit<ReactProps<'input'>, 'readOnly'> {
	label: string;
	errorMessage?: string;
}

type Input = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export const Input: Input = React.forwardRef(({label, errorMessage, disabled, ...props}, ref) => (
	<FormElements.Container invalid={!!errorMessage} disabled={!!disabled}>
		<FormElements.Label>{label}</FormElements.Label>
		<FormElements.Input {...props} disabled={!!disabled} readOnly={!!disabled} ref={ref} />
		<FormElements.Error>{errorMessage ?? false}</FormElements.Error>
	</FormElements.Container>
));
