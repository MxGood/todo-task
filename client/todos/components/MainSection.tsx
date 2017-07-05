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
  todos: Todo[];
};

class MainSection extends React.Component<MainSectionProps, MainSectionState> {

  constructor(props) {
    super(props);
    this.state = {
      todos: null
    }
  }

  getData = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        todos: this.typeheadFilter(this.props.todos, this.props.typeahead)
      })
    }, 500);
  }

  clearData = () => {
    this.setState({
      todos: null
    })
  }

  typeheadFilter = (arr, str) => {
    if (!str) {
      return arr;
    }
    return arr.filter(t => (t.text.indexOf(str) !== -1));
  };

  timeOutId: number

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps() {
    this.clearData();
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
  }

  render() {

    const { deleteTodo, setTypehead } = this.props;
    const loader = (
      <li>
        <div className="view">
          <label>
            Loading...
          </label>
        </div>
      </li>);
    const todos = this.state.todos;

    return (
      <section className="main">
        <ul className="todo-list">
          {!todos ? loader : todos.map(todo =>
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
