import React from 'react';
import './materialinput.css';

export default class MaterialInput extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.meta.active && this.props.meta.active) {
            this.input.focus();
        }
    }

    render() {
        const Element = this.props.element || 'input';

        let error;
        if (this.props.meta.touched && this.props.meta.error) {
            error = <div className="input__error">{this.props.meta.error}</div>
        }

        let warning;
        if (this.props.meta.touched && this.props.meta.warning) {
            warning = (
                <div className="form-warning">{this.props.meta.warning}</div>
            );
        }

        let active;
        if (this.props.input.value !== '' || this.props.meta.active) {
            active = 'material__input__field__active'
        }

        return(
            <div className="material__input">
                <Element
                    {...this.props.input}
                    id={this.props.input.name}
                    type={this.props.type}
                    ref={input => (this.input = input)}
                >
                    {this.props.children}
                </Element>
                <span className={`material__input__bar ${active}`}/>
                <label
                    htmlFor={this.props.input.name}
                    className={`${active}`}>
                    {this.props.label}
                </label>
                {error}
                {warning}
            </div>
        )
    }
}

