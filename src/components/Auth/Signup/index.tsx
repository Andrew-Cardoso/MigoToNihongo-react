import {GoogleLogo} from 'phosphor-react';
import {useForm} from 'react-hook-form';
import {useAuthApi} from '../../../_api/api.hook';
import {UserData} from '../../../_api/models/auth';
import {useToast} from '../../../_toast/hook';
import {Button} from '../../Button';
import {ButtonContainer} from '../../ButtonContainer';
import {FileInput} from '../../FileInput';
import {Form, FormElements} from '../../Form';
import {Input} from '../../Input';

type SignupForm = UserData & {confirmPassword: string};

export const Signup = () => {
	const {register, handleSubmit, formState, getValues, setValue, watch, trigger, reset} =
		useForm<SignupForm>();
	const api = useAuthApi();
	const toast = useToast();

	watch((_, {name}) => {
		if (!['password', 'confirmPassword'].includes(name ?? '')) return;
		formState.touchedFields.confirmPassword && trigger('confirmPassword');
	});

	const signupLocal = async ({name, email, password, photo}: SignupForm) => {
		if (await api.signupLocal({name, email, password, photo})) {
			toast(
				'info',
				<div>
					<h4>Sua conta foi criada!</h4> <br />
					<p>
						Por favor, confirme sua conta pelo email que acabamos de enviar para{' '}
						<strong>{email}</strong>
					</p>
					<br />
					<small>Se não encontrar nosso email verifique sua caixa de spam</small>
				</div>,
				25,
			);
			reset();
		}
	};

	const photoChanged = (src?: string) => setValue('photo', src ?? '');

	return (
		<Form onSubmit={handleSubmit(signupLocal)}>
			<Input
				label='email'
				type='email'
				autoComplete='email'
				{...register('email', {required: {value: true, message: 'Digite seu email'}})}
				errorMessage={formState.errors.email?.message}
			/>
			<Input
				label='nome'
				type='text'
				autoComplete='name'
				{...register('name', {required: {value: true, message: 'Digite seu nome'}})}
				errorMessage={formState.errors.name?.message}
			/>
			<Input
				label='senha'
				type='password'
				autoComplete='new-password'
				{...register('password', {required: {value: true, message: 'Defina uma senha'}})}
				errorMessage={formState.errors.password?.message}
			/>
			<Input
				label='Confirmar senha'
				type='password'
				autoComplete='new-password'
				{...register('confirmPassword', {
					validate: (value) => value === getValues('password'),
				})}
				errorMessage={formState.errors.confirmPassword ? 'Senhas não coincidem' : undefined}
			/>

			<FileInput
				label='Foto'
				cropImage={true}
				onChange={photoChanged}
				value={getValues('photo')}
				accept='image/*'
			/>

			<FormElements.Container>
				<ButtonContainer>
					<Button variant='success' type='submit'>
						Criar conta
					</Button>

					<Button
						type='button'
						role='button'
						icon
						variant='primary'
						position='right'
						onClick={() => api.signinGoogle()}
					>
						<GoogleLogo size='1rem' />
					</Button>
				</ButtonContainer>
			</FormElements.Container>
		</Form>
	);
};
