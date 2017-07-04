import * as React from 'react';

import { Todo } from '../model';
import TodoItem from './TodoItem';

const typeheadFilter = function (arr: Todo[], str: string): Todo[] {
    if (!str) {
        return arr;
    }
    return arr.filter(t => (t.text.indexOf(str) !== -1));
};

interface MainSectionProps {
  isShowList: boolean;
  todos: Todo[];
  typeahead: string;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo:Todo)=>void;
};

interface MainSectionState {
  filter: string;
};

class MainSection extends React.Component<MainSectionProps, MainSectionState> {

  render() {
    const { todos, typeahead, deleteTodo, setTypehead } = this.props;
    const filteredTodos = typeheadFilter(todos, typeahead);

    return this.props.isShowList && (
      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
              setTypehead={setTypehead}
              deleteTodo={deleteTodo}/>
          )}
        </ul>
      </section>
    );
  }
}

export default MainSection;
