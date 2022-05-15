import {createContext, ReactNode, useEffect, useState} from 'react';
import {TOKEN_KEY} from '../environment';
import {isExpired} from '../utils/temporal';
import {CurrentUser} from '../_api/models/admin';

const decode = (token: string): CurrentUser => {
	const {sub: email, name, roles, photo, expirationDate} = JSON.parse(atob(token.split('.')[1]));
	return {email, name, roles, photo, expirationDate};
};

interface Context {
	token?: string;
	user?: CurrentUser;
	signin: (token: string, rememberMe?: boolean) => void;
	signout: () => void;
}
export const AuthContext = createContext<Context>({
	signin: () => {},
	signout: () => {},
});

type Props = {children: ReactNode};
export const AuthProvider = ({children}: Props) => {
	const [user, setUser] = useState<CurrentUser | undefined>();
	const [token, setToken] = useState<string | undefined>();

	const setUserAndToken = (user?: CurrentUser, token?: string, rememberMe?: boolean) => {
		setUser(user);
		setToken(token);

		if (token) {
			rememberMe && localStorage.setItem(TOKEN_KEY, token);
		} else {
			localStorage.removeItem(TOKEN_KEY);
		}
	};

	const signin = (token: string, rememberMe = true) => {
		try {
			const user = decode(token);
			isExpired(user.expirationDate)
				? setUserAndToken()
				: setUserAndToken(user, token, rememberMe);
		} catch (e) {
			console.error(e);
		}
	};

	const signout = () => setUserAndToken();

	return (
		<AuthContext.Provider value={{user, token, signin, signout}}>
			{children}
		</AuthContext.Provider>
	);
};
