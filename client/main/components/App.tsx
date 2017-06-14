import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import {
    Header,
    MainSection,
    model,
    setTypehead,
    addTodo,
    editTodo,
    clearCompleted,
    completeAll,
    completeTodo,
    deleteTodo
} from '../../todos';

interface AppProps {
    store: model.IState;
    dispatch: Dispatch<{}>;
}

class App extends React.Component<AppProps, void> {
    render() {
        const { store, dispatch } = this.props;
        return (
            <div className="todoapp">
                <Header
                    addTodo={(text: string) => dispatch(addTodo(text)) }
                    setTypehead={(typehead: string) => dispatch(setTypehead(typehead)) }/>
                <MainSection
                    todos={store.todos}
                    typeahead={store.typeahead}
                    editTodo={(t, s) => dispatch(editTodo(t, s)) }
                    deleteTodo={(t: model.Todo) => dispatch(deleteTodo(t)) }
                    completeTodo={(t: model.Todo) => dispatch(completeTodo(t)) }
                    clearCompleted={() => dispatch(clearCompleted()) }
                    completeAll={() => dispatch(completeAll()) }/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    store: state.todos
});

export default connect(mapStateToProps)(App);
