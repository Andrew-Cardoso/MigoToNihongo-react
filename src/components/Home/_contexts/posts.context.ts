import React from 'react';
import {Post} from '../../../models/post';
const PostsContext = React.createContext<Post[]>([]);
export const PostsProvider = PostsContext.Provider;
export default PostsContext;
