/// <reference path="./../../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';

import reducer from '../reducer';
import { Todo, IState } from '../model';

import {
    SET_TYPEHEAD,
    ADD_TODO,
    DELETE_TODO
} from '../constants/ActionTypes';

describe('todo reducer', () => {

    it('handles add', () => {
        let state: IState = {
            todos: [{ id: 0, text: '' }]
        };

        state = reducer(state, {
            type: ADD_TODO,
            payload: { text: 'hello' }
        });

        expect(state[0]).to.eql(
            { id: 1, text: 'hello' }
        );
    });

    it('handles delete', () => {
        let state: IState = {
            todos: [{ id: 1, text: '' }]
        };

        state = reducer(state, {
            type: DELETE_TODO,
            payload: { id: 1 } as Todo
        });

        expect(state).to.eql([]);
    });
});
