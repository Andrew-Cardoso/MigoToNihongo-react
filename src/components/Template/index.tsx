import {styled} from '@stitches/react';
import {FolderNotchMinus, HouseSimple, IconContext, Infinity, User} from 'phosphor-react';
import {useRef} from 'react';
import {Link, Outlet} from 'react-router-dom';

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
	color: 'var(--text-on-light)',
	borderRadius: '50%',

	'& > a': {
		display: 'grid',
		placeItems: 'center',
		width: '100%',
		height: '100%',
		color: 'currentColor',
	},

	'& > a:first-child': {
		borderBottom: 'thin solid currentColor',
		borderTopLeftRadius: '100%',
		padding: '.5rem 0 0 .5rem',
	},

	'& > a:nth-child(2)': {
		borderBottom: 'thin solid currentColor',
		borderLeft: 'thin solid currentColor',
		padding: '.5rem .5rem 0 0',
		borderTopRightRadius: '100%',
	},

	'& > a:nth-child(3)': {
		borderRight: '0 solid currentColor',
		padding: '0 0 .5rem .5rem',
		borderBottomLeftRadius: '100%',
	},

	'& > a:nth-child(4)': {
		borderLeft: 'thin solid currentColor',
		padding: '0 .5rem .5rem 0',
		borderBottomRightRadius: '100%',
	},

	'& > a:hover': {
		/* Japan version */
		// backgroundColor: '#0002',

		/* Simple version */
		backgroundColor: '#90c1c288',
	},
});

const StyledMain = styled('main', {
	width: '100%',
	height: '100%',
	backgroundColor: 'transparent',
});

export const Template = () => {
	const navRef = useRef<HTMLElement>(null);
	const rotate = (angle: number) => () =>
		(navRef.current!.style.transform = `rotateZ(${angle}deg)`);
	return (
		<StyledContainer>
			<StyledHeaderImage>
				<IconContext.Provider value={{size: '1.5rem', color: 'currentColor'}}>
					<StyledNavbar ref={navRef}>
						<Link to='/' onClick={rotate(45)}>
							<HouseSimple style={{transform: 'rotateZ(-45deg)'}} />
						</Link>
						<Link to='/teste' onClick={rotate(-45)}>
							<User style={{transform: 'rotateZ(45deg)'}} />
						</Link>
						<Link to='/teste' onClick={rotate(135)}>
							<Infinity style={{transform: 'rotateZ(-135deg)'}} />
						</Link>
						<Link to='/teste' onClick={rotate(-135)}>
							<FolderNotchMinus style={{transform: 'rotateZ(135deg)'}} />
						</Link>
					</StyledNavbar>
				</IconContext.Provider>
			</StyledHeaderImage>
			<StyledMain>
				<Outlet />
			</StyledMain>
		</StyledContainer>
	);
};
