import * as React from 'react';
import * as classNames from 'classnames';

interface HeaderProps {
    typehead: string;
    addTodo: (text: string) => void;
    setTypehead: (typehead: string) => void;
    onFocus: () => void;
    onBlur: () => void;
};

function Header(props: HeaderProps) {

    const handleSubmit = (e) => {
        const text = e.target.value.trim();
        if (e.which === 13) {
            props.addTodo(text);
        }
    }

    const handleChange = (e) => {
        const text = e.target.value.trim();
        props.setTypehead(text);
    }

    const handleFocus = () => {
        props.onFocus();
    }

    const handleBlur = () => {
        props.onBlur();
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
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleSubmit} />
        </header>
    );
}

export default Header;
