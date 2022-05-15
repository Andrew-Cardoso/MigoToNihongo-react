import {Navigate, useLocation} from 'react-router-dom';
import {RolesEnum} from '../_api/models/admin';
import {hasRole} from './has-role';
import {useCurrentUser} from './hook';

interface Props {
	roles?: RolesEnum[];
	children: JSX.Element;
}
export const RequireAuth = ({children, roles}: Props) => {
	const user = useCurrentUser();
	const location = useLocation();

	return user && hasRole(user, roles) ? (
		children
	) : (
		<Navigate to='/' state={{from: location}} replace />
	);
};
