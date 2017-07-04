import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from './model';
import {
    SET_TYPEHEAD,
    ADD_TODO,
    DELETE_TODO
} from './constants/ActionTypes';

const initialState: IState = {
    todos:[{
        text: 'Use Redux with TypeScript',
        id: 0
    }],
    typeahead: ''
};

export default handleActions<IState, Todo>({

    [SET_TYPEHEAD]: (state: IState, action: Action<string>): IState => {
        return <IState>{
            todos: state.todos,
            typeahead: action.payload
        };
    },

    [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
        return <IState>{
            todos: [{
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                text: action.payload.text
            }, ...state.todos],
            typeahead: ''
        };
    },

    [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return <IState>{
            todos: state.todos.filter(todo =>
                todo.id !== action.payload.id
            )
        };
    }
}, initialState);
