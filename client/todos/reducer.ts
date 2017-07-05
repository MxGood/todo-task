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

export default function todoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_TYPEHEAD:
            return {
            todos: state.todos,
            typeahead: payload
        };
        case ADD_TODO:
            return {
            todos: [{
                id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                text: payload.text
            }, ...state.todos],
            typeahead: ''
        };
        case DELETE_TODO:
            return {
            todos: state.todos.filter(todo =>
                todo.id !== payload.id
            )
        };
        default:
            return state;
    }
}

// export default handleActions<IState, Todo>({

//     [SET_TYPEHEAD]: (state: IState, action: Action<string>): IState => {
//         return <IState>{
//             todos: state.todos,
//             typeahead: action.payload
//         };
//     },

//     [ADD_TODO]: (state: IState, action: Action<Todo>): IState => {
//         return <IState>{
//             todos: [{
//                 id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
//                 text: action.payload.text
//             }, ...state.todos],
//             typeahead: ''
//         };
//     },

//     [DELETE_TODO]: (state: IState, action: Action<Todo>): IState => {
//         return <IState>{
//             todos: state.todos.filter(todo =>
//                 todo.id !== action.payload.id
//             )
//         };
//     }
// }, initialState);
