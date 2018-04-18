import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import './semantic-form-field.css'

export default function semanticFormField ({ input, type, label, placeholder, meta: { touched, error, warning }, as: As = Input, ...props }) {
    function handleChange (e, { value }) {
        return input.onChange(value);
    }
    return (
        <Form.Field>
            <As {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder} error={touched && !!error} onChange={handleChange} />
            <div className="semantic__form__error-field">{touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}</div>
        </Form.Field>
    );
}

semanticFormField.propTypes = {
    as: PropTypes.any,
    input: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object
};
