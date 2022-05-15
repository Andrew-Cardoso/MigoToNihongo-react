import {BrowserRouter, Route, Routes as RouterRoutes} from 'react-router-dom';
import {App} from './components/App';
import {Home} from './components/Home';
import {Profile} from './components/Profile';

export const Routes = () => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path='/' element={<App />}>
				<Route index element={<Home />} />
				<Route path='/profile' element={<Profile />} />
				{/* <Route
					path='/teste'
					element={
						<RequireAuth>
							<h1>Teste</h1>
						</RequireAuth>
					}
				/> */}
				{/* <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
			</Route>
		</RouterRoutes>
	</BrowserRouter>
);
