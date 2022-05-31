import {styled} from '@stitches/react';
import {Tabs} from '../Tabs';
import {Users} from './Users';

const AdminContainer = styled('div', {
	width: 'auto',
	minWidth: '1024px',
	maxWidth: '96vw',
});
export const Admin = () => {
	return (
		<AdminContainer>
			<Tabs
				tabs={[
					['Usuários', <Users />],
					['Comentários', <h1>Nao implementado ainda</h1>],
				]}
			/>
		</AdminContainer>
	);
};
