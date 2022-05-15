import { Author } from "./posts";

export enum RolesEnum {
	AUTHOR = 'AUTHOR',
	ADMIN = 'ADMIN',
}

export interface CurrentUser {
	email: string;
	name: string;
	roles: RolesEnum[];
	photo: string;
	expirationDate: string;
}

export interface User {
	name: string;
	email: string;
	accountVerified: boolean;
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
