import {styled} from '@stitches/react';
import React, {useEffect, useState} from 'react';
import {useAdminApi} from '../../../_api/api.hook';
import {getRolesView, ROLES, RolesEnum, User} from '../../../_api/models/admin';
import {useToast} from '../../../_toast/hook';
import {Avatar} from '../../Avatar';
import {Switch} from '../../Switch';
import {Table, TableCell} from '../../Table';

const RolesContainer = styled('div', {
	display: 'flex',
	flexFlow: 'column',
	gap: '.5rem',
});

export const Users = () => {
	const api = useAdminApi();
	const toast = useToast();
	const [users, setUsers] = useState<User[]>([]);

	const updateRole = (i: number, role: RolesEnum) => async (checked: boolean) => {
		const user = {...users[i]};
		const roles = await api[checked ? 'addRole' : 'removeRole'](user.email, role);

		if (!roles) return;

		toast('success', <p>Cargos de {user.name.split(' ')[0]} atualizados</p>);
		user.roles = roles;

		const updatedUsers = [...users];
		updatedUsers.splice(i, 1, user);
		setUsers(updatedUsers);
	};

	useEffect(() => {
		api.getUsers().then((_users) => setUsers(_users));
	}, []);
	return (
		<Table titles={['foto', 'nome', 'email', 'cargos']}>
			{users.map(({name, roles, email, photo}, i) => (
				<React.Fragment key={i}>
					<TableCell>
						<Avatar alt={name} src={photo} size='sm' />
					</TableCell>
					<TableCell>{name}</TableCell>
					<TableCell>{email}</TableCell>
					<TableCell>
						<RolesContainer>
							{ROLES.map((role) => (
								<Switch
									key={role}
									onChange={updateRole(i, role)}
									value={roles.includes(role)}
									label={getRolesView(role)}
								/>
							))}
						</RolesContainer>
					</TableCell>
				</React.Fragment>
			))}
		</Table>
	);
};