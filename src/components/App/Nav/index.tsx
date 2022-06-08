import {IconContext, Scroll, UserGear, Key, Pencil, ShieldStar} from 'phosphor-react';
import {useRef, useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {styled} from '../../../utils/breakpoints';
import {useAuthApi} from '../../../_api/api.hook';
import {RolesEnum} from '../../../_api/models/admin';
import {hasRole} from '../../../_auth/has-role';
import {useAuth} from '../../../_auth/hook';

const StyledNavbar = styled('nav', {
	position: 'absolute',
	left: '1rem',
	top: '1rem',
	background: '#0000',
	width: '10rem',
	height: '10rem',
	display: 'grid',
	transition: 'transform 250ms ease',
	color: 'var(--text-dark)',
	borderRadius: '50%',
	'& > a': {
		display: 'grid',
		placeItems: 'center',
		width: '100%',
		height: '100%',
		color: 'currentColor',
		transition: 'color 250ms ease, background-color 250ms ease',
	},
	variants: {
		childrenCount: {
			2: {
				transform: 'rotateZ(180deg)',
				placeItems: 'center',
				'& > :first-child': {
					borderBottom: 'thin solid var(--text-dark)',
					transform: 'scale(1.2)',
					clipPath: 'circle(50% at 50% 100%)',
				},
				'& > :last-child': {
					transform: 'scale(1.2) rotate(180deg) translateY(-.8rem)',
					clipPath: 'circle(50% at 50% 100%)',
				},
				'& svg': {
					transform: 'translateY(.6rem)',
				},
			},
			3: {
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				transform: 'rotateZ(-45deg)',

				'& > a:first-child': {
					borderBottom: 'thin solid var(--text-dark)',
					borderTopLeftRadius: '100%',
					padding: '.5rem 0 0 .5rem',
				},
				'& > a:first-child > svg': {
					transform: 'rotateZ(-45deg)',
				},

				'& > a:nth-child(2)': {
					borderBottom: 'thin solid var(--text-dark)',
					borderLeft: 'thin solid var(--text-dark)',
					padding: '.5rem .5rem 0 0',
					borderTopRightRadius: '100%',
				},
				'& > a:nth-child(2) > svg': {
					transform: 'rotateZ(45deg)',
				},

				'& > a:nth-child(3)': {
					borderRight: '0 solid var(--text-dark)',
					padding: '0 0 .5rem .5rem',
					borderBottomLeftRadius: '100%',
				},
				'& > a:nth-child(3) > svg': {
					transform: 'rotateZ(-135deg)',
				},

				'& > div:last-child': {
					borderLeft: 'thin solid var(--text-dark)',
					padding: '0',
					borderBottomRightRadius: '100%',
				},
			},
			4: {
				gridTemplateColumns: '1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				transform: 'rotateZ(-45deg)',

				'& > a:first-child': {
					borderBottom: 'thin solid var(--text-dark)',
					borderTopLeftRadius: '100%',
					padding: '.5rem 0 0 .5rem',
				},
				'& > a:first-child > svg': {
					transform: 'rotateZ(-45deg)',
				},

				'& > a:nth-child(2)': {
					borderBottom: 'thin solid var(--text-dark)',
					borderLeft: 'thin solid var(--text-dark)',
					padding: '.5rem .5rem 0 0',
					borderTopRightRadius: '100%',
				},
				'& > a:nth-child(2) > svg': {
					transform: 'rotateZ(45deg)',
				},

				'& > a:nth-child(3)': {
					borderRight: '0 solid var(--text-dark)',
					padding: '0 0 .5rem .5rem',
					borderBottomLeftRadius: '100%',
				},
				'& > a:nth-child(3) > svg': {
					transform: 'rotateZ(-135deg)',
				},

				'& > a:nth-child(4)': {
					borderLeft: 'thin solid var(--text-dark)',
					padding: '0 .5rem .5rem 0',
					borderBottomRightRadius: '100%',
				},

				'& > a:nth-child(4) > svg': {
					transform: 'rotateZ(135deg)',
				},
			},
		},
		page: {
			'/': {},
			'/admin': {},
			'/quill': {},
		},
	},
	'& > a:hover': {
		backgroundColor: 'var(--red-shade)',
		color: 'var(--text-light)',
	},

	compoundVariants: [
		{
			childrenCount: 2,
			page: '/',
			css: {
				transform: 'rotateZ(0)',
			},
		},
		{
			childrenCount: 3,
			page: '/',
			css: {
				transform: 'rotateZ(45deg)',
			},
		},
		{
			childrenCount: 3,
			page: '/quill',
			css: {
				transform: 'rotateZ(135deg)',
			},
		},
		{
			childrenCount: 3,
			page: '/admin',
			css: {
				transform: 'rotateZ(135deg)',
			},
		},
		{
			childrenCount: 4,
			page: '/',
			css: {
				transform: 'rotateZ(45deg)',
			},
		},
		{
			childrenCount: 4,
			page: '/quill',
			css: {
				transform: 'rotateZ(135deg)',
			},
		},
		{
			childrenCount: 4,
			page: '/admin',
			css: {
				transform: 'rotateZ(-135deg)',
			},
		},
	],
});

const Nav = () => {
	const location = useLocation();
	const auth = useAuth();
	const navRef = useRef<HTMLElement>(null);
	const [menuItemsCount, setMenuItemsCount] = useState<2 | 3 | 4>(2);

	useEffect(() => {
		const permissionsCount = 2 + (auth.user?.roles?.length ?? 0);
		setMenuItemsCount(permissionsCount as any);
	}, [auth.token]);

	return (
		<IconContext.Provider value={{size: '1.5rem', color: 'currentColor'}}>
			<StyledNavbar
				ref={navRef}
				childrenCount={menuItemsCount}
				page={location.pathname as any}
			>
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
				{menuItemsCount === 3 && <div></div>}
			</StyledNavbar>
		</IconContext.Provider>
	);
};

export default Nav;
