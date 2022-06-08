import {Scroll, UserGear, Key, Pencil, ShieldStar, IconContext} from 'phosphor-react';
import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {Link} from 'react-router-dom';
import {styled} from '../../../utils/breakpoints';
import {useAuthApi} from '../../../_api/api.hook';
import {RolesEnum} from '../../../_api/models/admin';
import {hasRole} from '../../../_auth/has-role';
import {useAuth} from '../../../_auth/hook';

const StyledContainer = styled('div', {
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: 'calc(100vw - .8rem)',
	background: 'var(--background-primary)',
	zIndex: 5,
	height: '4rem',
});

const StyledNavbar = styled('nav', {
	position: 'relative',
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'space-evenly',

	'& > a': {
		flex: 1,
		display: 'grid',
		placeItems: 'center',
	},
});

const SmartphoneNav = () => {
	const auth = useAuth();

	return createPortal(
		<StyledContainer>
			<StyledNavbar>
				<IconContext.Provider value={{size: '1.5rem', color: 'currentColor'}}>
					<Link to='/'>
						<Scroll />
					</Link>
					{auth.user ? (
						<Link to='/profile'>
							<UserGear />
						</Link>
					) : (
						<Link to='/auth'>
							<Key />
						</Link>
					)}
					{hasRole(auth.user, [RolesEnum.AUTHOR]) && (
						<Link to='/quill'>
							<Pencil />
						</Link>
					)}
					{hasRole(auth.user, [RolesEnum.ADMIN]) && (
						<Link to='/admin'>
							<ShieldStar />
						</Link>
					)}
				</IconContext.Provider>
			</StyledNavbar>
		</StyledContainer>,
		document.getElementById('root')!,
	);
};

export default SmartphoneNav;
