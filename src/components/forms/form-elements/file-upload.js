import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

export default function FileInput({ input, type, label, placeholder, meta: { touched, error, warning }, accept, as: As = Input, ...props }) {
    delete input.value; // prevents DOM errors, per https://redux-form.com/5.2.5/#/examples/file?_k=z12d2f
    function handleChange (e) {
        return input.onChange(e);
    }
    return (
        <Form.Field>
            <As {...props} {...input} type='file' label={label} error={touched && !!error} accept={accept} onChange={handleChange}/>
            {(touched && !!error) ? <p className="error">{error}</p> : ''}
        </Form.Field>
    )
}

FileInput.propTypes = {
    as: PropTypes.any,
    input: PropTypes.object,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object
};
