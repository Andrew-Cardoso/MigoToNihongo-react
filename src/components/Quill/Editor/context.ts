import Quill from 'quill';
import {createContext} from 'react';

export const QuillContext = createContext<Quill | null>(null);
