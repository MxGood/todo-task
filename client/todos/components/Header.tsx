import * as React from 'react';

import TodoTextInput from './TodoTextInput';

interface HeaderProps {
    typehead: string;
    addTodo: (text: string) => any;
    setTypehead: (typehead: string) => any;
    onFocus: () => void;
    onBlur: () => void;
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

    handleFocus() {
        this.props.onFocus();
    }

    handleBlur() {
        this.props.onBlur();
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    text={this.props.typehead}
                    newTodo={true}
                    onSave={this.handleSave.bind(this) }
                    onChange={this.handleChange.bind(this) }
                    onBlur={this.handleBlur.bind(this) }
                    onFocus={this.handleFocus.bind(this) }
                    placeholder="What needs to be done?" />
            </header>
        );
    }
}

export default Header;
