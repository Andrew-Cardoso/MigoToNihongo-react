import {GoogleLogo} from 'phosphor-react';
import {useForm} from 'react-hook-form';
import {useAuthApi} from '../../../_api/api.hook';
import {UserData} from '../../../_api/models/auth';
import {useAuth} from '../../../_auth/hook';
import {useToast} from '../../../_toast/hook';
import {Button} from '../../Button';
import {ButtonContainer} from '../../ButtonContainer';
import {Checkbox} from '../../Checkbox';
import {Form, FormElements} from '../../Form';
import {Input} from '../../Input';

export const Signup = () => {
	const {register, handleSubmit, formState} = useForm<UserData>();

	const auth = useAuth();
	const api = useAuthApi();
	const toast = useToast();

	const signupLocal = (form: UserData) => {
		console.log(form);
	};

	return (
		<Form style={{paddingBottom: '0'}} onSubmit={handleSubmit(signupLocal)}>
			{/* <Input
				label='email'
				type='email'
				{...register('email', {required: {value: true, message: 'Digite seu email'}})}
				errorMessage={formState.errors.email?.message}
			/>
			<Input
				label='password'
				type='password'
				{...register('password', {
					required: {value: true, message: 'Digite sua senha'},
				})}
				errorMessage={formState.errors.password?.message}
			/>
			<Checkbox label='Lembrar de mim' {...register('rememberMe')} defaultChecked={true} />

			<FormElements.Container>
				<ButtonContainer>
					<Button variant='success' type='submit'>
						Entrar
					</Button>
					<Button variant='invert' type='button' role='button' onClick={forgotPassword}>
						Esqueci minha senha
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
			</FormElements.Container> */}
		</Form>
	);
};
