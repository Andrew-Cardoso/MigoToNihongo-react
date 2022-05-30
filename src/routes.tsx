import {BrowserRouter, Route, Routes as RouterRoutes} from 'react-router-dom';
import {App} from './components/App';
import {Home} from './components/Home';
import {Auth} from './components/Auth';
import {Profile} from './components/Profile';
import {RequireAuth} from './_auth/route.guard';
import {ResetPassword} from './components/ResetPassword';
import {Quill} from './components/Quill';
import {RolesEnum} from './_api/models/admin';

export const Routes = () => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path='/' element={<App />}>
				<Route index element={<Home />} />
				<Route
					path='/auth'
					element={
						<RequireAuth notLogedIn={true} navigateTo='/profile'>
							<Auth />
						</RequireAuth>
					}
				/>
				<Route
					path='/profile'
					element={
						<RequireAuth navigateTo='/auth'>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path='/quill'
					element={
						<RequireAuth roles={[RolesEnum.AUTHOR]} navigateTo='/auth'>
							<Quill />
						</RequireAuth>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<RequireAuth notLogedIn={true} navigateTo='/profile'>
							<ResetPassword />
						</RequireAuth>
					}
				/>
			</Route>
		</RouterRoutes>
	</BrowserRouter>
);
