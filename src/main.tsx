import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes} from './routes';
import {AuthProvider} from './_auth/context';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ToastContainer autoClose={8000} pauseOnHover={true} />
		<AuthProvider>
			<Routes />
		</AuthProvider>
	</React.StrictMode>,
);
