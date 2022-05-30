import {createContext, ReactNode, useState} from 'react';
import {TOKEN_KEY} from '../environment';
import {isExpired} from '../utils/temporal';
import {CurrentUser} from '../_api/models/admin';

const decode = (token: string): CurrentUser => {
	const codedUserInfoUrl = token.split('.')[1];
	const codedUserInfoBase64 = codedUserInfoUrl.replace(/-/g, '+').replace(/_/g, '/');
	const jsonUserInfo = decodeURIComponent(
		atob(codedUserInfoBase64)
			.split('')
			.map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
			.join(''),
	);

	const {sub: email, name, roles, expirationDate, signInType} = JSON.parse(jsonUserInfo);

	return {email, name, roles, expirationDate, signInType};
};

interface Context {
	token?: string;
	user?: CurrentUser;
	setUserPhoto: (data: {photo?: string}) => void;
	signin: (token: string, rememberMe?: boolean) => void;
	signout: () => void;
}
export const AuthContext = createContext<Context>({
	signin: () => {},
	signout: () => {},
	setUserPhoto: () => {},
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

	const setUserPhoto = ({photo}: {photo?: string}) => user && setUser({...user, photo});

	return (
		<AuthContext.Provider value={{user, token, signin, signout, setUserPhoto}}>
			{children}
		</AuthContext.Provider>
	);
};
