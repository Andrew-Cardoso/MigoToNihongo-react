import {getRolesView, SignInTypeEnum, SignInTypeView} from '../../_api/models/admin';
import {JWT, UpdatedUser} from '../../_api/models/auth';
import {useAuth} from '../../_auth/hook';
import {Button} from '../Button';
import {ButtonContainer} from '../ButtonContainer';
import {Card, CardElements} from '../Card';
import {Form, FormElements} from '../Form';
import {Input} from '../Input';
import {isNullOrEmpty} from '../../utils/check-null';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAuthApi} from '../../_api/api.hook';
import {Modal} from '../Modal';
import {FileInput} from '../FileInput';
import {Avatar} from '../Avatar';
import {SignOut} from 'phosphor-react';
import {useToast} from '../../_toast/hook';
import {styled} from '../../utils/breakpoints';

const StyledContainer = styled('div', {
	width: '100%',
	maxWidth: '700px',
});

const StyledNamePhotoContainer = styled('section', {
	width: '100%',
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: '6rem 1fr',
	'@smartphone': {
		gridTemplateColumns: '1fr',
		gridTemplateRows: '8rem 1fr',
	},
});

type UpdateUserForm = Omit<UpdatedUser, 'currentPassword'> & {confirmPassword?: string};
type UpdateUserErrors = Partial<
	Record<keyof Pick<UpdateUserForm, 'name' | 'confirmPassword'>, string>
>;
const Profile = () => {
	const api = useAuthApi();
	const {user, signin, signout} = useAuth();
	const [showPassword, togglePassword] = useState(false);
	const [enabledEdit, setEnabledEdit] = useState(false);
	const [showModal, toggleModal] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const toast = useToast();
	const [updatedUser, setUpdatedUser] = useState<UpdateUserForm>({
		name: user?.name,
		photo: user?.photo,
		password: '',
		confirmPassword: '',
	});
	const [formErrors, setFormErrors] = useState<UpdateUserErrors>({});

	useEffect(() => {
		if (isNullOrEmpty.Object(formErrors)) return;

		if (formErrors.name && !isNullOrEmpty.String(updatedUser.name)) delete formErrors.name;

		if (formErrors.confirmPassword && updatedUser.confirmPassword === updatedUser.password)
			delete formErrors.confirmPassword;
	}, [updatedUser]);

	useEffect(() => {
		setUpdatedUser({
			...updatedUser,
			name: user?.name,
			photo: user?.photo,
			password: '',
			confirmPassword: '',
		});
	}, [user]);

	useEffect(() => {
		if (enabledEdit) return;

		setFormErrors({});
		setUpdatedUser({
			name: user?.name,
			photo: user?.photo,
			password: '',
			confirmPassword: '',
		});
	}, [enabledEdit]);

	const updateUser = (control: keyof UpdateUserForm) => (ev: ChangeEvent<HTMLInputElement>) => {
		const {value} = ev.target;
		setUpdatedUser({...updatedUser, [control]: value});
	};

	const handleTogglePassword = () => {
		if (!showPassword) return togglePassword(true);
		setUpdatedUser({...updatedUser, confirmPassword: '', password: ''});
		togglePassword(false);
	};

	const confirmUpdate = async (currentPassword?: string) => {
		const data = parseFormData();
		currentPassword && (data.currentPassword = currentPassword);
		const response = await api.updateUser(data);

		if ((response as JWT)?.token) {
			toast('success', <p>Dados atualizados!</p>);
			return signin((response as JWT).token, true);
		}

		if (response)
			return toast(
				'info',
				<p>
					Um email foi enviado para <strong>{user!.email}</strong> para confirmar as
					alterações
				</p>,
			);
	};

	const parseFormData = () => {
		const data: UpdatedUser = {};
		if (!isNullOrEmpty.String(updatedUser.name) && updatedUser.name !== user?.name)
			data.name = updatedUser.name;
		if (updatedUser.photo !== user?.photo) data.photo = updatedUser.photo;
		if (!isNullOrEmpty.String(updatedUser.password)) data.password = updatedUser.password;
		return data;
	};
	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (isNullOrEmpty.String(updatedUser.name))
			setFormErrors({...formErrors, name: 'Digite seu nome'});
		if (
			!isNullOrEmpty.String(updatedUser.password) ||
			!isNullOrEmpty.String(updatedUser.confirmPassword)
		)
			if (updatedUser.password !== updatedUser.confirmPassword)
				setFormErrors({...formErrors, confirmPassword: 'Senhas não coincidem'});

		if (!isNullOrEmpty.Object(formErrors)) return;
		if (isNullOrEmpty.Object(parseFormData())) return;

		user?.signInType === SignInTypeEnum.LOCAL ? toggleModal(true) : confirmUpdate();
	};

	const confirmCurrentPassword = async (saved: boolean) => {
		saved && (await confirmUpdate(currentPassword));
		toggleModal(false);
		togglePassword(false);
		setCurrentPassword('');
	};

	return (
		<>
			<StyledContainer>
				<Card>
					<CardElements.Header>Perfil</CardElements.Header>
					<CardElements.Content>
						<Form onSubmit={handleSubmit}>
							<StyledNamePhotoContainer>
								{enabledEdit ? (
									<FileInput
										label='Foto'
										cropImage={true}
										onChange={(img) =>
											setUpdatedUser({...updatedUser, photo: img})
										}
										value={updatedUser.photo!}
										accept='image/*'
									/>
								) : (
									<Avatar alt={user!.name} src={user!.photo} />
								)}
								<Input
									label='nome'
									value={updatedUser.name}
									onChange={updateUser('name')}
									disabled={!enabledEdit}
								/>
							</StyledNamePhotoContainer>

							{showPassword && (
								<>
									<Input
										label='alterar senha'
										type='password'
										autoComplete='new-password'
										value={updatedUser.password}
										onChange={updateUser('password')}
									/>
									<Input
										label='confirmar nova senha'
										type='password'
										autoComplete='new-password'
										value={updatedUser.confirmPassword}
										onChange={updateUser('confirmPassword')}
									/>
								</>
							)}

							<Input label='email' defaultValue={user!.email} disabled />
							<Input
								label='tipo de login'
								defaultValue={SignInTypeView[user!.signInType]}
								disabled
							/>
							<Input
								label='cargos'
								disabled
								defaultValue={getRolesView(...user!.roles)}
							/>

							{enabledEdit ? (
								<FormElements.Container>
									<ButtonContainer>
										<Button variant='primary' type='submit'>
											Salvar
										</Button>
										{user!.signInType === SignInTypeEnum.LOCAL && (
											<Button variant='danger' onClick={handleTogglePassword}>
												{showPassword ? 'Remover campos de' : 'Alterar'}{' '}
												senha
											</Button>
										)}
										<Button
											variant='default'
											position='right'
											onClick={() => setEnabledEdit(false)}
										>
											Esconder edição
										</Button>
									</ButtonContainer>
								</FormElements.Container>
							) : (
								<FormElements.Container>
									<ButtonContainer>
										<Button
											variant='warning'
											type='submit'
											onClick={() => setEnabledEdit(true)}
										>
											Habilitar edição
										</Button>
									</ButtonContainer>
								</FormElements.Container>
							)}
						</Form>
					</CardElements.Content>
					<CardElements.Footer>
						<ButtonContainer>
							<Button variant='link' position='right' icon onClick={signout}>
								<SignOut />
								Sair
							</Button>
						</ButtonContainer>
					</CardElements.Footer>
				</Card>
			</StyledContainer>
			<Modal title='Confirmar alterações' onClose={confirmCurrentPassword} show={showModal}>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						confirmCurrentPassword(true);
					}}
				>
					<Input
						label={
							'digite sua senha' +
							(isNullOrEmpty.String(updatedUser.password) ? '' : ' atual') +
							' para confirmar as alterações'
						}
						type='password'
						autoComplete='current-password'
						value={currentPassword}
						onChange={({target}) => setCurrentPassword(target.value)}
					/>
				</Form>
			</Modal>
		</>
	);
};

export default Profile;
