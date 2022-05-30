import {styled} from '@stitches/react';
import {Tabs} from '../Tabs';
import {Signin} from './Signin';
import {Signup} from './Signup';

const AuthContainer = styled('div', {
	width: '100%',
	maxWidth: '700px',
});

export const Auth = () => (
	<AuthContainer>
		<Tabs
			tabs={[
				['Entrar', <Signin />],
				['Cadastro', <Signup />],
			]}
		/>
	</AuthContainer>
);
