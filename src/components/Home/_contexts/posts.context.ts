import React from 'react';
import {Post} from '../../../_api/models/posts';
const PostsContext = React.createContext<[Post[], boolean]>([[], false]);
export const PostsProvider = PostsContext.Provider;
export default PostsContext;
