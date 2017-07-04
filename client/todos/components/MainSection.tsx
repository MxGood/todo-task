import * as React from 'react';

import { Todo } from '../model';
import TodoItem from './TodoItem';

interface MainSectionProps {
  todos: Todo[];
  typeahead: string;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo: Todo) => void;
};

function MainSection(props: MainSectionProps) {

  function typeheadFilter(arr: Todo[], str: string): Todo[] {
    if (!str) {
      return arr;
    }
    return arr.filter(t => (t.text.indexOf(str) !== -1));
  };

  const { todos, typeahead, deleteTodo, setTypehead } = props;
  const filteredTodos = typeheadFilter(todos, typeahead);

  return (
    <section className="main">
      <ul className="todo-list">
        {filteredTodos.map(todo =>
          <TodoItem
            key={todo.id}
            todo={todo}
            setTypehead={setTypehead}
            deleteTodo={deleteTodo} />
        )}
      </ul>
    </section>
  );
}

export default MainSection;
