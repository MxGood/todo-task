import * as React from 'react';
import * as classNames from 'classnames';

interface HeaderProps {
    typehead: string;
    addTodo: (text: string) => void;
    setTypehead: (typehead: string) => void;
    onFocus: () => void;
    onBlur: () => void;
};

function Header(props) {

    let textInput;

    function handleSubmit(e) {
        const text = textInput.value.trim();
        if (text && e.key === 'Enter') {
            props.addTodo(text);
        }
    }

    function handleChange() {
        const text = textInput.value.trim();
        props.setTypehead(text);
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <input className={
                classNames({
                    edit: false,
                    'new-todo': true
                })}
                ref = {input => textInput = input}
                type="text"
                placeholder="What needs to be done?"
                value={props.typehead}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onChange={handleChange}
                onKeyDown={handleSubmit} />
        </header>
    );
}

export default Header;
