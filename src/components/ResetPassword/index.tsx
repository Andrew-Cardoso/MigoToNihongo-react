import {styled} from '@stitches/react';
import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useAuthApi} from '../../_api/api.hook';
import {ResetPasswordData} from '../../_api/models/auth';
import {useAuth} from '../../_auth/hook';
import {Button} from '../Button';
import {ButtonContainer} from '../ButtonContainer';
import {Card, CardElements} from '../Card';
import {Form, FormElements} from '../Form';
import {Input} from '../Input';
import {Spinner} from '../Spinner';

const StyledContainer = styled('div', {
	width: '100%',
	maxWidth: '700px',
});

const LoadingContainer = styled('section', {
	width: '100%',
	padding: '2rem 0',
	display: 'grid',
	placeItems: 'center',
});

interface ResetPasswordForm {
	password: string;
	confirmPassword: string;
}
export const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const {register, handleSubmit, formState, getValues, watch, trigger} =
		useForm<ResetPasswordForm>();
	const [canActivate, toggleActivate] = useState(false);
	const [userInfo, setUserInfo] = useState<Omit<ResetPasswordData, 'password'>>();
	const auth = useAuth();
	const api = useAuthApi();

	useEffect(() => {
		const email = searchParams.get('email');
		const token = searchParams.get('resettoken');
		if (!email || !token) return navigate('/auth');

		api.validateResetToken(email, token).then((isValid) =>
			isValid ? toggleActivate(true) : navigate('/auth'),
		);

		setUserInfo({email, token});
	}, []);

	watch((_, {name}) => {
		if (!['password', 'confirmPassword'].includes(name ?? '')) return;
		formState.touchedFields.confirmPassword && trigger('confirmPassword');
	});

	const resetPassword = async ({password}: ResetPasswordForm) => {
		const {email, token} = userInfo!;
		const jwt = await api.resetPassword({email, password, token});
		if (!jwt) return;

		auth.signin(jwt.token, true);
		navigate('/auth');
	};

	return (
		<StyledContainer>
			<Card>
				<CardElements.Header>Redefinição de senha</CardElements.Header>
				<CardElements.Content>
					{canActivate ? (
						<Form onSubmit={handleSubmit(resetPassword)}>
							<Input
								label='nova senha'
								type='password'
								autoComplete='new-password'
								{...register('password', {
									required: {value: true, message: 'Defina sua nova senha'},
								})}
								errorMessage={formState.errors.password?.message}
							/>
							<Input
								label='confirmar senha'
								type='password'
								autoComplete='new-password'
								{...register('confirmPassword', {
									validate: (value) => value === getValues('password'),
								})}
								errorMessage={
									formState.errors.confirmPassword
										? 'Senhas não coincidem'
										: undefined
								}
							/>
							<FormElements.Container>
								<ButtonContainer>
									<Button type='submit' variant='primary'>
										Redefinir senha
									</Button>
								</ButtonContainer>
							</FormElements.Container>
						</Form>
					) : (
						<Spinner size='sm' adapt></Spinner>
					)}
				</CardElements.Content>
			</Card>
		</StyledContainer>
	);
};
