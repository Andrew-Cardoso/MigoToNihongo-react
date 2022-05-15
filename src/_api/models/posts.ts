export interface Author {
	name: string;
	photo: string;
}

export interface Comment {
	id: string;
	content: string;
	postId: string;
	date: string;
  approved: boolean;
	author: Author;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	date: string;
	linkText: string;
	author: Author;
	comments?: Comment[];
}

export interface PostData extends Pick<Post, 'title' | 'content' | 'linkText'> {}