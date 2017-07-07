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

  loadData = (filter) => {
    return new Promise((resolve) => {
      this.timeOutId = setTimeout(() => {
        let data = this.typeheadFilter(this.props.todos, filter);
        resolve(data);
      }, 500);
    });
  }

  setData = (todos) => {
    this.setState({ todos })
  }

  typeheadFilter = (arr, str) => {
    if (!str) {
      return arr;
    }
    return arr.filter(item => (item.text.indexOf(str) !== -1));
  };

  timeOutId: number

  componentDidMount() {
    this.loadData(this.props.typeahead).then(this.setData);
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.typeahead).then(this.setData);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
  }

  render() {

    const { deleteTodo, setTypehead } = this.props;
    const animationOfLoad = (
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
          {!this.state.todos ? animationOfLoad : todos.map(todo =>
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
