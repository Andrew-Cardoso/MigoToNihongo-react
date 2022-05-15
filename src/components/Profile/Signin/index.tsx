import {GoogleLogo} from 'phosphor-react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAuthApi} from '../../../_api/api.hook';
import {Credentials} from '../../../_api/models/auth';
import {useAuth} from '../../../_auth/hook';
import {useToast} from '../../../_toast/hook';
import {Button} from '../../Button';
import {ButtonContainer} from '../../ButtonContainer';
import {Checkbox} from '../../Checkbox';
import {Form, FormElements} from '../../Form';
import {Input} from '../../Input';
import {Modal} from '../../Modal';

type FormSignin = Credentials & {rememberMe: boolean};

export const Signin = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const {register, handleSubmit, formState, getValues} = useForm<FormSignin>();

	const auth = useAuth();
	const api = useAuthApi();
	const toast = useToast();

	const [email, setEmail] = useState('');
	const [showModal, toggleModal] = useState(false);

	const signinLocal = async ({email, password, rememberMe}: FormSignin) => {
		const jwt = await api.signinLocal({email, password});

		if (!jwt) return;

		auth.signin(jwt.token, rememberMe);
		const redirectPath = searchParams.get('redirectPath');

		navigate(`/${redirectPath ?? ''}`);
	};

	const forgotPassword = () => {
		setEmail(getValues('email'));
		toggleModal(true);
	};

	const clearModal = () => {
		setEmail('');
		toggleModal(false);
	};

	const onClosePasswordRecoveryModal = async (saved: boolean) => {
		if (!saved) return clearModal();

		const success = await api.forgotPassword(email);
		if (!success) return;

		toast('success', <p>Link para redefinição de senha enviado, verifique seu email</p>);
		clearModal();
	};

	return (
		<>
			<Form style={{paddingBottom: '0'}} onSubmit={handleSubmit(signinLocal)}>
				<Input
					label='email'
					type='email'
					autoComplete='email'
					{...register('email', {required: {value: true, message: 'Digite seu email'}})}
					errorMessage={formState.errors.email?.message}
				/>
				<Input
					label='password'
					type='password'
					autoComplete='current-password'
					{...register('password', {
						required: {value: true, message: 'Digite sua senha'},
					})}
					errorMessage={formState.errors.password?.message}
				/>
				<Checkbox
					label='Lembrar de mim'
					{...register('rememberMe')}
					defaultChecked={true}
				/>

				<FormElements.Container>
					<ButtonContainer>
						<Button variant='success' type='submit'>
							Entrar
						</Button>
						<Button
							variant='invert'
							type='button'
							role='button'
							onClick={forgotPassword}
						>
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
				</FormElements.Container>
			</Form>
			<Modal
				title='Recuperar Senha'
				onClose={onClosePasswordRecoveryModal}
				show={showModal}
				saveButtonText='Redefinir senha'
			>
				<>
					<Input
						label='Confirme seu email'
						onChange={(ev) => setEmail(ev.currentTarget.value)}
						value={email}
					/>
					<p>
						Clicando em <strong>Redefinir senha</strong> você receberá um email com um
						link para redefinir sua senha, ele ficará ativo por 20 minutos.
					</p>
					<br />
					<small style={{color: 'var(--text-light-secondary)'}}>
						Caso não tenha recebido o email verifique sua caixa de spam
					</small>
				</>
			</Modal>
		</>
	);
};
