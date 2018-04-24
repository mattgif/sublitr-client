import React from 'react';
import { Form, Dropdown } from "semantic-ui-react";

export default function ReduxValidatedDropdown ({ input, type, label, placeholder, meta: { touched, error, warning }, options, as: As = Dropdown, ...props }) {
    function handleChange (e, { value }) {
        return input.onChange(value);
    }

    return  (
        <Form.Field style={{width: '100%'}}>
            <As search fluid selection options={options} {...props} {...input} value={input.value} type={type} label={label} placeholder={placeholder} error={touched && !!error} onChange={handleChange} />
            <div className="semantic__form__error-field">{touched && ((error && <span><i>{error}</i></span>) || (warning && <span><i>{warning}</i></span>))}</div>
        </Form.Field>
    )
}
