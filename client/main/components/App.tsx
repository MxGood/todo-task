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

interface AppState {
    isShowList: boolean;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowList: false
        };
    }

    showList() {
        this.setState({
            isShowList: true
        });
    }

    hideList() {
        let that = this;
        setTimeout(function () {
            that.setState({
                isShowList: false
            }) } , 300);
    }

    render() {
        const { store, dispatch } = this.props;
        return (
            <div className="todoapp">
                <Header
                    onFocus={() => this.showList() }
                    onBlur={() => this.hideList() }
                    typehead={store.typeahead}
                    addTodo={(text: string) => dispatch(addTodo(text)) }
                    setTypehead={(typehead: string) => dispatch(setTypehead(typehead)) }/>
                <MainSection
                    isShowList={this.state.isShowList}
                    todos={store.todos}
                    typeahead={store.typeahead}
                    setTypehead={(typehead: string) => dispatch(setTypehead(typehead)) }
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
