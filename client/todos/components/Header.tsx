import * as React from 'react';
import * as classNames from 'classnames';

interface HeaderProps {
    typehead: string;
    addTodo: (text: string) => void;
    setTypehead: (typehead: string) => void;
    onFocus: () => void;
    onBlur: () => void;
};

class Header extends React.Component<HeaderProps, any> {

    constructor(props){
        super(props);
        this.state = {typehead: ''};
    }

    handleSubmit = (e) => {
        const text = e.target.value.trim();
        if (text && e.which === 13) {
            this.props.addTodo(this.state.typehead);
            this.setState({typehead: ''});
        }
    }

    handleChange = (e) => {
        const text = e.target.value.trim();
        this.setState({typehead: text});
        this.props.setTypehead(this.state.typehead);
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
                    value={this.state.typehead}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    onChange={this.handleChange}
                    onKeyDown={this.handleSubmit} />
            </header>
        );
    }
}

export default Header;
