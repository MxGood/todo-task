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

  const handleClick = () => {
    props.setTypehead(props.todo.text);
  }
  const { todo, deleteTodo } = props;

  return (
    <li>
      <div className="view">
        <label onClick={handleClick}>
          {todo.text}
        </label>
        <button className="destroy"
          onClick={() => deleteTodo(todo)} />
      </div>
    </li>
  );
}

export default TodoItem;
