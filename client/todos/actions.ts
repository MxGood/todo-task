import { createAction, Action } from 'redux-actions';
import { assign } from 'lodash';

import { Todo } from './model';

import {
    SET_TYPEHEAD,
    ADD_TODO,
    DELETE_TODO
} from './constants/ActionTypes';

const setTypehead = createAction<string, string>(
    SET_TYPEHEAD,
    (typeahead: string) => typeahead
);

const addTodo = createAction<Todo, string>(
    ADD_TODO,
    (text: string) => ({ text, completed: false })
);

const deleteTodo = createAction<Todo, Todo>(
    DELETE_TODO,
    (todo: Todo) => todo
);

export {
setTypehead,
addTodo,
deleteTodo
}
