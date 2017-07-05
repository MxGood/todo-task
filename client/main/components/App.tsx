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
    isShowList: boolean;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            isShowList: false
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

    // setTypehead = (typehead: string) => {
    //     this.props.dispatch(setTypehead(typehead));
    // }
    // addTodo = (text: string) => {
    //     this.props.dispatch(addTodo(text));
    // }
    // deleteTodo = (t: model.Todo) => {
    //     this.props.dispatch(deleteTodo(t));
    // }

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
        store: state.todos
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
