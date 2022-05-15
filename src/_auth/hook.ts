import {useContext} from 'react';
import {AuthContext} from './context';

export const useCurrentUser = () => useContext(AuthContext)?.user;
export const useToken = () => useContext(AuthContext)?.token;
export const useAuth = () => useContext(AuthContext);
