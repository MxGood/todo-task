import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import {
    Header,
    MainSection,
    model,
    setTypehead,
    addTodo,
    deleteTodo
} from '../../todos';

interface AppProps {
    store: model.IState;
    setTypehead: (text: string) => any;
    addTodo: (text: string) => any;
    deleteTodo: (todo: model.Todo) => any;
}

interface AppState {
    isLoading: boolean;
    isShowList: boolean;
    todos: model.Todo[];
}

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowList: false,
            todos: []
        };
    }

    showList = () => {
        this.setState({
            isShowList: true,
            isLoading: true
        });
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 500);
    }

    hideList = () => {
        setTimeout(() => {
            this.setState({
                isShowList: false
            })
        }, 300);
    }

    handleAdd = (text: string) => {
        this.props.addTodo(text);
        this.showList();
    }

    render() {
        const { store } = this.props;
        const loader = (<section className="main">
            <ul className="todo-list">
                <li>
                    <div className="view">
                        <label>
                            Loading...
                        </label>
                    </div>
                </li>
            </ul>
        </section>);
        const listOfTodos = this.state.isLoading ? loader : (<MainSection
            todos={store.todos}
            typeahead={store.typeahead}
            setTypehead={(typehead: string) => this.props.setTypehead(typehead)}
            deleteTodo={(t: model.Todo) => this.props.deleteTodo(t)} />);

        return (
            <div className="todoapp">
                <Header
                    onFocus={() => this.showList()}
                    onBlur={() => this.hideList()}
                    typehead={store.typeahead}
                    addTodo={(text: string) => this.handleAdd(text)}
                    setTypehead={(typehead: string) => this.props.setTypehead(typehead)} />
                {this.state.isShowList && listOfTodos}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state.todos
    }
};

const mapDispatchToProps = dispatch => {
    var result = bindActionCreators({
        setTypehead,
        addTodo,
        deleteTodo
    }, dispatch);
    return result;
};

// const mapDispatchToProps = dispatch => {
//     var result = {
//         setTypehead: bindActionCreators(setTypehead, dispatch),
//         addTodo: bindActionCreators(addTodo, dispatch),
//         deleteTodo: bindActionCreators(deleteTodo, dispatch)
//     };
//     return result;
// };

// const mapDispatchToProps = dispatch => {
//     var result = {
//         setTypehead: function(typehead: string){ return dispatch(setTypehead(typehead))},
//         addTodo: function(text: string){ return dispatch(addTodo(text))},
//         deleteTodo: function(t: model.Todo){ return dispatch(deleteTodo(t))}
//     };
//     return result;
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
