import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../model';
import TodoTextInput from './TodoTextInput';

interface TodoItemProps {
  todo: Todo;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo:Todo)=>void;
  key?: any;
}

class TodoItem extends React.Component<TodoItemProps, void> {

  handleClick() {
      this.props.setTypehead(this.props.todo.text);
      console.log('click');
  }

  render() {
    const {todo, deleteTodo} = this.props;

    return (
      <li className={classNames({
        completed: todo.completed
      })}>
            <div className="view">
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
