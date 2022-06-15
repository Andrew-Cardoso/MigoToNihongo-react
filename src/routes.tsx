import {HashRouter, Route, Routes as RouterRoutes} from 'react-router-dom';
import {App} from './components/App';
import {Home} from './components/Home';
import {RequireAuth} from './_auth/route.guard';
import {RolesEnum} from './_api/models/admin';
import {lazy, Suspense} from 'react';
import {Spinner} from './components/Spinner';

const Profile = lazy(() => import('./components/Profile'));
const Auth = lazy(() => import('./components/Auth'));
const Quill = lazy(() => import('./components/Quill'));
const Admin = lazy(() => import('./components/Admin'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));

export const Routes = () => (
	<HashRouter>
		<RouterRoutes>
			<Route path='/' element={<App />}>
				<Route index element={<Home />} />
				<Route
					path='/auth'
					element={
						<RequireAuth notLogedIn={true} navigateTo='/profile'>
							<Suspense fallback={<Spinner size='sm' />}>
								<Auth />
							</Suspense>
						</RequireAuth>
					}
				/>
				<Route
					path='/profile'
					element={
						<RequireAuth navigateTo='/auth'>
							<Suspense fallback={<Spinner size='sm' />}>
								<Profile />
							</Suspense>
						</RequireAuth>
					}
				/>
				<Route
					path='/quill'
					element={
						<RequireAuth roles={[RolesEnum.AUTHOR]} navigateTo='/auth'>
							<Suspense fallback={<Spinner size='sm' />}>
								<Quill />
							</Suspense>
						</RequireAuth>
					}
				/>
				<Route
					path='/admin'
					element={
						<RequireAuth roles={[RolesEnum.ADMIN]} navigateTo='/auth'>
							<Suspense fallback={<Spinner size='sm' />}>
								<Admin />
							</Suspense>
						</RequireAuth>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<RequireAuth notLogedIn={true} navigateTo='/profile'>
							<Suspense fallback={<Spinner size='sm' />}>
								<ResetPassword />
							</Suspense>
						</RequireAuth>
					}
				/>
			</Route>
		</RouterRoutes>
	</HashRouter>
);
