import {NavigateFunction, useNavigate} from 'react-router-dom';
import {BACKEND_URL} from '../environment';
import {useAuth, useToken} from '../_auth/hook';
import {Toast, useToast} from '../_toast/hook';
import {HttpStatusCode} from './http-status-code.enum';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
const fetchApi = (path: string, token?: string, method?: Method, body?: any) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	token && headers.append('Authorization', `Bearer ${token}`);
	method ??= 'GET';

	const requestInfo: RequestInit = {
		headers,
		method,
	};

	if (method !== 'GET' && method !== 'DELETE') requestInfo.body = JSON.stringify(body ?? {});

	return fetch(BACKEND_URL + path, requestInfo);
};

const handleDefaultErrorMessage = (message: string) => {
	switch (message) {
		case 'Unauthorized':
			return 'Você não tem permissão para fazer isso';

		case 'Bad Request':
			return 'Oops... Você está enviando alguma informação inválida ao servidor';

		case 'Gone':
			return 'Inválido ou expirado';

		case 'Forbidden':
			return 'Você não tem permissão para fazer isso';

		default:
			return message;
	}
};

const handleErrors = async (
	response: Response,
	toast: Toast,
	navigate: NavigateFunction,
	token?: string,
) => {
	try {
		const {status} = response;
		const error = await response.json();

		const messages = [];

		for (const message of [error.message].flat())
			messages.push(<p key={message.replace(/\s/g, '_')}>{handleDefaultErrorMessage(message)}</p>);

		const toastHtml = <div>{messages}</div>;

		const unauthorized = [HttpStatusCode.UNAUTHORIZED, HttpStatusCode.FORBIDDEN].includes(
			status,
		);

		if (unauthorized) {
			toast('unauthorized', toastHtml);
			// TODO logout user
			if (token) navigate('/profile');
		} else {
			toast('error', toastHtml);
		}
	} catch (e) {
		toast('error', <span>Ocorreu um erro, se persistir contate o desenvolvedor</span>);
	}
};

export const useFetch = () => {
	const token = useToken();
	const toast = useToast();
	const navigate = useNavigate();

	const api = async (path: string, method?: Method, body?: any) => {
		const response = await fetchApi(path, token, method, body);

		if (!response.ok) return handleErrors(response, toast, navigate, token);

		return response.status === HttpStatusCode.NO_CONTENT ? true : response.json();
	};

	return api;
};
