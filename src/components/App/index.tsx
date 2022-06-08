import {styled} from '../../utils/breakpoints';
import {lazy, Suspense, useEffect, useState} from 'react';
import {Outlet, useSearchParams} from 'react-router-dom';
import {useToast} from '../../_toast/hook';
import {Spinner} from '../Spinner';
import {useAuthApi} from '../../_api/api.hook';
import {useAuth} from '../../_auth/hook';

const Nav = lazy(() => import('./Nav'));
const SmartphoneNav = lazy(() => import('./SmartphoneNav'));

const StyledContainer = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	gridTemplateRows: '350px 1fr',
	overflowX: 'hidden',
	overflowY: 'auto',
	'@smartphone': {
		gridTemplateRows: '200px 1fr',
	},
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

	'@smartphone': {
		gap: '1.25rem',
		padding: '1.25rem',
		marginBottom: '5rem',
	},
});

export const App = () => {
	const [screenWidth] = useState(window.screen.availWidth);
	const [searchParams] = useSearchParams();
	const api = useAuthApi();
	const auth = useAuth();
	const toast = useToast();

	useEffect(() => {
		const error = searchParams.get('error');
		error && toast('error', error);
	}, []);

	useEffect(() => {
		auth.token && api.getUserPhoto().then(auth.setUserPhoto);
	}, [auth.token]);

	return (
		<StyledContainer id='App'>
			<StyledHeaderImage>
				{screenWidth > 480 ? (
					<Suspense fallback={<Spinner size='sm' />}>
						<Nav />
					</Suspense>
				) : (
					<Suspense fallback={<Spinner size='xsm' />}>
						<SmartphoneNav />
					</Suspense>
				)}
			</StyledHeaderImage>
			<StyledMainContainer>
				<StyledMain>
					<Outlet />
				</StyledMain>
			</StyledMainContainer>
		</StyledContainer>
	);
};
