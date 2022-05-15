import {styled} from '@stitches/react';
import {Tab, Tabs} from '../Tabs';
import {Signin} from './Signin';
import {Signup} from './Signup';

const AuthContainer = styled('div', {
	width: '100%',
	maxWidth: '700px',
});

export const Profile = () => {
	const tabs: Tab[] = [
		['Entrar', <Signin />],
		['Cadastro', <Signup />],
	];

	return (
		<AuthContainer>
			<Tabs tabs={tabs} />
		</AuthContainer>
	);
};
