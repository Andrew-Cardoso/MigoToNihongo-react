import {Navigate, useLocation} from 'react-router-dom';
import {RolesEnum} from '../_api/models/admin';
import {hasRole} from './has-role';
import {useCurrentUser} from './hook';

interface Props {
	roles?: RolesEnum[];
	navigateTo?: string;
	notLogedIn?: boolean;
	children: JSX.Element;
}
export const RequireAuth = ({children, roles, navigateTo, notLogedIn}: Props) => {
	const user = useCurrentUser();
	const location = useLocation();

	return (notLogedIn && !user) || (!notLogedIn && user && hasRole(user, roles)) ? (
		children
	) : (
		<Navigate to={navigateTo ?? '/'} state={{from: location}} replace />
	);
};
