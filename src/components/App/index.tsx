import {styled} from '@stitches/react';
import {IconContext, Key, Pencil, Scroll, UserGear} from 'phosphor-react';
import {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation, useSearchParams} from 'react-router-dom';
import {TOKEN_KEY} from '../../environment';
import {useAuth} from '../../_auth/hook';
import {useAuthApi} from '../../_api/api.hook';
import {useToast} from '../../_toast/hook';
import {hasRole} from '../../_auth/has-role';
import {RolesEnum} from '../../_api/models/admin';

const StyledContainer = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	gridTemplateRows: '350px 1fr',
	overflowX: 'hidden',
	overflowY: 'auto',
});

const StyledHeaderImage = styled('header', {
	backgroundImage: 'var(--background-header)',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPositionY: 'bottom',
	position: 'relative',
	width: '100%',
	height: '100%',
});

const StyledNavbar = styled('nav', {
	position: 'absolute',
	left: '1rem',
	top: '1rem',
	background: '#0000',
	width: '10rem',
	height: '10rem',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridTemplateRows: '1fr 1fr',
	transition: 'transform 250ms ease',
	transform: 'rotateZ(45deg)',

	/* Japan version */
	// backgroundColor: '#f00',
	// color: '#FFF',

	/* Simple version */
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

	'& > a:first-child': {
		borderBottom: 'thin solid currentColor',
		borderTopLeftRadius: '100%',
		padding: '.5rem 0 0 .5rem',
	},
	'& > a:first-child > svg': {
		transform: 'rotateZ(-45deg)',
	},

	'& > a:nth-child(2)': {
		borderBottom: 'thin solid currentColor',
		borderLeft: 'thin solid currentColor',
		padding: '.5rem .5rem 0 0',
		borderTopRightRadius: '100%',
	},
	'& > a:nth-child(2) > svg': {
		transform: 'rotateZ(45deg)',
	},

	'& > a:nth-child(3)': {
		borderRight: '0 solid currentColor',
		padding: '0 0 .5rem .5rem',
		borderBottomLeftRadius: '100%',
	},
	'& > a:nth-child(3) > svg': {
		transform: 'rotateZ(-135deg)',
	},

	'& > a:nth-child(4)': {
		borderLeft: 'thin solid currentColor',
		padding: '0 .5rem .5rem 0',
		borderBottomRightRadius: '100%',
	},

	'& > a:nth-child(4) > svg': {
		transform: 'rotateZ(135deg)',
	},

	'& > a:hover': {
		backgroundColor: 'var(--red-shade)',
		color: 'var(--text-light)',
	},

	variants: {
		childNumber: {
			2: {
				gridTemplateColumns: '1fr',
				gridTemplateRows: '1fr 1fr',

				'& > a:nth-child(2)': {
					borderBottom: 'thin solid transparent',
					borderLeft: 'thin solid transparent',
				},
			},
		},
	},
});

const StyledMainContainer = styled('div', {
	width: '100%',
	height: '100%',
	backgroundColor: 'transparent',
});

const StyledMain = styled('main', {
	width: '100%',
	display: 'flex',
	gap: '2rem',
	padding: '2rem',
	justifyContent: 'center',
});

export const App = () => {
	const [searchParams] = useSearchParams();
	const location = useLocation();
	const toast = useToast();
	const api = useAuthApi();
	const auth = useAuth();

	const navRef = useRef<HTMLElement>(null);
	const [rotateAngle, setRotateAngle] = useState(45);

	const onInit = () => {
		const token = searchParams.get('token') ?? localStorage.getItem(TOKEN_KEY);
		if (token) auth.signin(token);
		const error = searchParams.get('error');
		if (error) toast('error', error);
	};

	useEffect(() => {
		onInit();
	}, []);

	useEffect(() => {
		auth.token && api.getUserPhoto().then(auth.setUserPhoto);
	}, [auth.token]);

	useEffect(() => {
		if (!navRef.current) return;

		const activeLink = navRef.current.querySelector(`[href="${location.pathname}"]`);
		if (!activeLink) setRotateAngle(45);

		const i = [...navRef.current.children].indexOf(activeLink!);

		let rotateAngle = 45;

		if (i === 1) rotateAngle = -45;
		if (i === 2) rotateAngle = 135;
		if (i === 3) rotateAngle = -135;

		setRotateAngle(rotateAngle);
	}, [location]);

	return (
		<StyledContainer id='App'>
			<StyledHeaderImage>
				<IconContext.Provider value={{size: '1.5rem', color: 'currentColor'}}>
					<StyledNavbar ref={navRef} style={{transform: `rotateZ(${rotateAngle}deg)`}}>
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
					</StyledNavbar>
				</IconContext.Provider>
			</StyledHeaderImage>
			<StyledMainContainer>
				<StyledMain>
					<Outlet />
				</StyledMain>
			</StyledMainContainer>
		</StyledContainer>
	);
};
