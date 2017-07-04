/// <reference path="./../../../node_modules/@types/mocha/index.d.ts" />

import { expect } from 'chai';

import * as actions from '../actions';

describe('actions', () => {
  it('creates new todo', () => {
    const { payload: todo } = actions.addTodo('hello');

    expect(todo.text).to.eql('hello');
  });

  it('deletes todo', () => {
    const { payload: todo } = actions.deleteTodo({
      id: 999,
      text: ''
    });

    expect(todo.id).to.eql(999);
  });
});
