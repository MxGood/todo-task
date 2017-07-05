import * as React from 'react';

import { Todo } from '../model';
import TodoItem from './TodoItem';

interface MainSectionProps {
  todos: Todo[];
  typeahead: string;
  setTypehead: (typehead: string) => any;
  deleteTodo: (todo: Todo) => void;
};

interface MainSectionState {
  isLoading: boolean;
};

class MainSection extends React.Component<MainSectionProps, MainSectionState> {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  timeOutId: number

  showLoader = () => {
    this.setState({
      isLoading: true
    });
    this.timeOutId = setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 500);
  }

  componentDidMount() {
    this.showLoader();
  }

  componentWillReceiveProps() {
    this.showLoader();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
  }

  render() {
    function typeheadFilter(arr: Todo[], str: string): Todo[] {
      if (!str) {
        return arr;
      }
      return arr.filter(t => (t.text.indexOf(str) !== -1));
    };

    const { todos, typeahead, deleteTodo, setTypehead } = this.props;
    const filteredTodos = typeheadFilter(this.props.todos, typeahead);
    const loader = (
      <li>
        <div className="view">
          <label>
            Loading...
          </label>
        </div>
      </li>);

    return (
      <section className="main">
        <ul className="todo-list">
          {this.state.isLoading ? loader : filteredTodos.map(todo =>
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
}

export default MainSection;
