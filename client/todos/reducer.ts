import { assign } from 'lodash';
import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from './model';
import {
    SET_TYPEHEAD,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from './constants/ActionTypes';

const initialState: IState = {
    todos:[{
        text: 'Use Redux with TypeScript',
        completed: false,
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
                completed: action.payload.completed,
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
    },

    [EDIT_TODO]: (state: IState, action: Action<Todo>): IState => {
        return <IState>{
            todos: state.todos.map(todo =>
                todo.id === action.payload.id
                    ? assign(<Todo>{}, todo, { text: action.payload.text })
                    : todo
            )
        };
    },

    [COMPLETE_TODO]: (state: IState, action: Action<Todo>): IState => {
        return <IState>{
            todos: state.todos.map(todo =>
                todo.id === action.payload.id ?
                    assign({}, todo, { completed: !todo.completed }) :
                    todo
            )
        };
    },

    [COMPLETE_ALL]: (state: IState, action: Action<Todo>): IState => {
        const areAllMarked = state.todos.every(todo => todo.completed);
        return <IState>{
            todos: state.todos.map(todo => assign({}, todo, {
                completed: !areAllMarked
            }))
        };
    },

    [CLEAR_COMPLETED]: (state: IState, action: Action<Todo>): IState => {
        return <IState>{ todos: state.todos.filter(todo => todo.completed === false) };
    }
}, initialState);
