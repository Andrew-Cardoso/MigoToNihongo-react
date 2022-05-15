import {BACKEND_URL} from '../environment';
import {useFetch} from './fetch.hook';
import {RolesEnum, UnapprovedComment, User} from './models/admin';
import {Credentials, JWT, ResetPasswordData, UserData} from './models/auth';
import {Comment, Post, PostData} from './models/posts';

interface AuthApi {
	signinLocal: (credentials: Credentials) => Promise<JWT>;
	signupLocal: (user: UserData) => Promise<void | boolean>;
	sendVerificationEmail: (email: string) => Promise<void | boolean>;
	forgotPassword: (email: string) => Promise<void | boolean>;
	resetPassword: (data: ResetPasswordData) => Promise<void | boolean>;
	signinGoogle: () => void | never;
}

interface PostsApi {
	getPosts: () => Promise<Post[]>;
	getComments: (postId: string) => Promise<Comment[]>;
	createPost: (post: PostData) => Promise<Post>;
	addComment: (postId: string, comment: string) => Promise<Comment>;
}

interface AdminApi {
	getUsers: () => Promise<User[]>;
	getUnapprovedComments: () => Promise<UnapprovedComment[]>;
	approveComment: (commentId: string) => Promise<Comment>;
	removeComment: (commentId: string) => Promise<void | boolean>;
	addRole: (email: string, role: RolesEnum) => Promise<RolesEnum[]>;
	removeRole: (email: string, role: RolesEnum) => Promise<RolesEnum[]>;
}

export const useAuthApi = (): AuthApi => {
	const request = useFetch();
	return {
		signinLocal: (credentials: Credentials) => request('auth/sign-in', 'POST', credentials),
		signupLocal: (user: UserData) => request('auth/sign-up', 'POST', user),
		sendVerificationEmail: (email: string) =>
			request('auth/send-verification-email', 'POST', {email}),
		forgotPassword: (email: string) => request('auth/forgot-password', 'POST', {email}),
		resetPassword: (data: ResetPasswordData) => request('auth/reset-password', 'POST', data),
		signinGoogle: () => window.location.replace(`${BACKEND_URL}auth/google/sign-in`),
	};
};

export const usePostsApi = (): PostsApi => {
	const request = useFetch();
	return {
		getPosts: () => request('posts'),
		getComments: (postId: string) => request(`posts/${postId}/comments`),
		createPost: (post: PostData) => request('posts', 'POST', post),
		addComment: (postId: string, comment: string) =>
			request(`posts/${postId}/add-comment`, 'POST', {
				content: comment,
			}),
	};
};

export const useAdminApi = (): AdminApi => {
	const request = useFetch();
	return {
		getUsers: () => request('admin/users'),
		getUnapprovedComments: () => request('admin/unapproved-comments'),
		approveComment: (commentId: string) => request(`admin/comments/${commentId}`, 'PATCH'),
		removeComment: (commentId: string) => request(`admin/comments/${commentId}`, 'DELETE'),
		addRole: (email: string, role: RolesEnum) =>
			request('admin/add-role', 'PATCH', {email, role}),
		removeRole: (email: string, role: RolesEnum) =>
			request('admin/remove-role', 'PATCH', {email, role}),
	};
};
