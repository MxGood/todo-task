import { bindActionCreators } from 'redux';
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
    isShowList: boolean;
    todos: model.Todo[];
}

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            isShowList: false,
            todos: []
        };
    }

    showList = () => {
        this.setState({
            isShowList: true
        });
    }

    hideList = () => {
        setTimeout(() => {
            this.setState({
                isShowList: false
            })
        }, 300);
    }

    render() {
        const { store } = this.props;

        return (
            <div className="todoapp">
                <Header
                    onFocus={() => this.showList()}
                    onBlur={() => this.hideList()}
                    typehead={store.typeahead}
                    addTodo={(text: string) => this.props.addTodo(text)}
                    setTypehead={(typehead: string) => this.props.setTypehead(typehead)} />
                {this.state.isShowList && <MainSection
                    todos={store.todos}
                    typeahead={store.typeahead}
                    setTypehead={(typehead: string) => this.props.setTypehead(typehead)}
                    deleteTodo={(t: model.Todo) => this.props.deleteTodo(t)} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        store: state.todosState
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setTypehead,
        addTodo,
        deleteTodo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// const mapDispatchToProps = dispatch => {
//     return {
//         setTypehead: bindActionCreators(setTypehead, dispatch),
//         addTodo: bindActionCreators(addTodo, dispatch),
//         deleteTodo: bindActionCreators(deleteTodo, dispatch)
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setTypehead: function(typehead: string){ return dispatch(setTypehead(typehead))},
//         addTodo: function(text: string){ return dispatch(addTodo(text))},
//         deleteTodo: function(t: model.Todo){ return dispatch(deleteTodo(t))}
//     };
// };

// export default connect(
//     state => ({
//         store: state.todos
//     }),
//     dispatch => ({
//         setTypehead: function (typehead: string) { return dispatch(setTypehead(typehead)) },
//         addTodo: function (text: string) { return dispatch(addTodo(text)) },
//         deleteTodo: function (t: model.Todo) { return dispatch(deleteTodo(t)) }
//     })
// )(App);
