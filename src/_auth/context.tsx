import {createContext, ReactNode, useEffect, useState} from 'react';
import {TOKEN_KEY} from '../environment';
import {isExpired} from '../utils/temporal';
import {CurrentUser} from '../_api/models/admin';
import {useToast} from '../_toast/hook';

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

const getCachedCredentials = (): [CurrentUser?, string?] => {
	const params = new URLSearchParams(window.location.search);
	const token = params.get('token') ?? localStorage.getItem(TOKEN_KEY);
	if (!token) return [];
	const user = decode(token);
	if (isExpired(user.expirationDate)) return [];

	localStorage.setItem(TOKEN_KEY, token);
	return [user, token];
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
	const [cachedUser, cachedToken] = getCachedCredentials();
	const [user, setUser] = useState<CurrentUser | undefined>(cachedUser);
	const [token, setToken] = useState<string | undefined>(cachedToken);

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
