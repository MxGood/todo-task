import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../model';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo:Todo)=>void;
  completeTodo: (todo:Todo)=>void;
  key?: any;
}

class TodoItem extends React.Component<TodoItemProps, void> {

  handleClick() {
      this.props.setTypehead(this.props.todo.text);
      console.log('click');
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props;

    return (
      <li className={classNames({
        completed: todo.completed
      })}>
            <div className="view">
                <input className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo) } />
                <label onClick={this.handleClick.bind(this)}>
                    {todo.text}
                </label>
                <button className="destroy"
                    onClick={() => deleteTodo(todo) } />
            </div>
      </li>
    );
  }
}

export default TodoItem;
