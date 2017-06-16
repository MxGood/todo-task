import * as React from 'react';
import * as classNames from 'classnames';

interface TodoTextInputProps {
    onSave: (text: string) => void;
    onChange?: (typehead: string) => void;
    text?: string;
    placeholder?: string,
    editing?: boolean;
    newTodo?: boolean;
}
interface TodoTextInputState {
    text: string;
}

class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    }

    handleChange(e) {
        const text = e.target.value.trim();
        this.setState({ text: e.target.value });
        this.props.onChange && this.props.onChange(text);
    }

    handleBlur(e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        const value = this.props.newTodo ? this.props.text : this.state.text;
        return (
            <input className={
                classNames({
                    edit: this.props.editing,
                    'new-todo': this.props.newTodo
                }) }
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={value}
                onBlur={this.handleBlur.bind(this) }
                onChange={this.handleChange.bind(this) }
                onKeyDown={this.handleSubmit.bind(this) } />
        );
    }
}

export default TodoTextInput;
