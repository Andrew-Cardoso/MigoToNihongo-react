import {BrowserRouter, Route, Routes as RouterRoutes} from 'react-router-dom';
import {Home} from './components/Home';
import {Template} from './components/Template';

export const Routes = () => (
	<BrowserRouter>
		<RouterRoutes>
			<Route path='/' element={<Template />}>
				<Route index element={<Home />} />
				<Route path='/teste' element={<h1>Teste</h1>} />
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
