import * as React from 'react';

import TodoTextInput from './TodoTextInput';

interface HeaderProps {
    addTodo: (text: string) => any;
    setTypehead: (typehead: string) => any;
};

class Header extends React.Component<HeaderProps, void> {
    handleSave(text: string) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    handleChange(typehead: string) {
        this.props.setTypehead(typehead);
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave.bind(this) }
                    onChange={this.handleChange.bind(this) }
                    placeholder="What needs to be done?" />
            </header>
        );
    }
}

export default Header;
