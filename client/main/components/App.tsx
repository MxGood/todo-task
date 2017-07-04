import { Dispatch } from 'redux';
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

    setTypehead = (typehead: string) => {
        console.log('this.props.store = ', this.props.store);
        console.log('this.props.dispatch = ', this.props.dispatch);
        console.log('this.props.dispatch(setTypehead(typehead)) = ', this.props.dispatch(setTypehead(typehead)));
    }

    render() {
        //console.log('mapStateToProps = ', mapStateToProps(this.state));
        const { store, dispatch } = this.props;
        this.log(this.props.store);
        this.log2(this.props);
        return (
            <div className="todoapp">
                <Header
                    onFocus={() => this.showList() }
                    onBlur={() => this.hideList() }
                    typehead={store.typeahead}
                    addTodo={(text: string) => dispatch(addTodo(text)) }
                    setTypehead={(typehead: string) => this.setTypehead(typehead) }/>
                <MainSection
                    isShowList={this.state.isShowList}
                    todos={store.todos}
                    typeahead={store.typeahead}
                    setTypehead={(typehead: string) => this.setTypehead(typehead) }
                    deleteTodo={(t: model.Todo) => dispatch(deleteTodo(t)) }/>
            </div>
        );
    }
    
    log = (store) => console.log('this.props.store2 = ', store);
    log2 = (props) => console.log('this.props2 = ', props);
}

const mapStateToProps = state => ({
    store: state.todos
});

export default connect(mapStateToProps)(App);
