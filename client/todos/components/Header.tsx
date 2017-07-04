import * as React from 'react';
import * as classNames from 'classnames';

interface HeaderProps {
    typehead: string;
    addTodo: (text: string) => void;
    setTypehead: (typehead: string) => void;
    onFocus: () => void;
    onBlur: () => void;
};

class Header extends React.Component<HeaderProps, void> {

    handleSubmit = (e) => {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.addTodo(text);
        }
    }

    handleChange = (e) => {
        const text = e.target.value.trim();
        this.props.setTypehead(text);
    }

    handleFocus = () => {
        this.props.onFocus();
    }

    handleBlur = () => {
        this.props.onBlur();
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className={
                    classNames({
                        edit: false,
                        'new-todo': true
                    })}
                    type="text"
                    placeholder="What needs to be done?"
                    value={this.props.typehead}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit} />
            </header>
        );
    }
}

export default Header;
