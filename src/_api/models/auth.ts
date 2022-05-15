export interface Credentials {
	email: string;
	password: string;
}

export interface JWT {
	token: string;
}

export interface UserData {
	email: string;
	password: string;
	name: string;
	photo: string;
}

export interface ResetPasswordData extends Credentials {
	token: string;
}
