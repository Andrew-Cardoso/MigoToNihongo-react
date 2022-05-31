import {Author} from './posts';

export enum RolesEnum {
	AUTHOR = 'AUTHOR',
	ADMIN = 'ADMIN',
}

export const ROLES = [RolesEnum.ADMIN, RolesEnum.AUTHOR];

export const RolesView = {
	[RolesEnum.ADMIN]: 'Administrador',
	[RolesEnum.AUTHOR]: 'Autor',
};

export const getRolesView = (...roles: RolesEnum[]) =>
	roles.length === 0 ? 'Usuário' : roles.map((role) => RolesView[role]).join(', ');

export enum SignInTypeEnum {
	LOCAL = 'LOCAL',
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
}

export const SignInTypeView = {
	[SignInTypeEnum.LOCAL]: 'MigoTo Nihongo',
	[SignInTypeEnum.GOOGLE]: 'Google',
	[SignInTypeEnum.FACEBOOK]: 'Facebook',
};

export interface CurrentUser {
	email: string;
	name: string;
	roles: RolesEnum[];
	expirationDate: string;
	signInType: SignInTypeEnum;
	photo?: string;
}

export interface User {
	name: string;
	email: string;
	photo: string;
	roles: RolesEnum[];
}

export interface UnapprovedComment {
	id: string;
	content: string;
	date: string;
	author: Author;
	approved: boolean;
	postName: string;
}
