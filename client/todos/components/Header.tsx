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

    function handleSubmit(e) {
        const text = e.target.value.trim();
        if (text && e.which === 13) {
            props.addTodo(text);
        }
    }

    function handleChange(e) {
        const text = e.target.value.trim();
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
