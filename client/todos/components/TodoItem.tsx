import * as React from 'react';
import * as classNames from 'classnames';

import { Todo } from '../model';

interface TodoItemProps {
  todo: Todo;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo: Todo) => void;
  key?: any;
}

function TodoItem(props: TodoItemProps) {

  function handleClick() {
    props.setTypehead(props.todo.text);
  };

  function handleDelete() {
    props.deleteTodo(props.todo);
    props.setTypehead('');
  };

  return (
    <li>
      <div className="view">
        <label onClick={handleClick}>
          {props.todo.text}
        </label>
        <button className="destroy"
          onClick={handleDelete} />
      </div>
    </li>
  );
}

export default TodoItem;
