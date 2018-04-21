import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

export default class ConfirmableDropdown extends React.Component {
    // displays confirmation buttons on change, and performs callback action on confirm
    // props:
    // confirmText = text to display on confirm button (default: confirm)
    // cancelText = text to display on cancel button (default: cancel)
    // value = initial value of drop down
    // options = array of options with structure {key: ___, value: ___, text: ___}
    // onConfirm = callback for confirmation
    // disabled = whether dropdown is disabled
    // id = component id
    // warning = a message to display alongside confirm buttons
    constructor(props) {
        super(props);
        this.state = {
            newValue: false,
            value: this.props.value
        }
    }

    showConfirm = (data) => {
        // sets component state for status type to proposed change, and sets flags it as new so confirm renders
        this.setState({
            value: data.value,
            newValue: true})
    };

    handleCancel() {
        this.setState({
            value: this.props.value,
            newValue: false
        })
    }

    handleConfirm() {
        this.props.onConfirm(this.state.value)
        this.setState({
            newValue: false
        })
    }

    render() {
        let confirmChange;
        let warning;
        if (this.state.newValue) {
            confirmChange =
                <Button.Group>
                    <Button onClick={() => this.handleCancel()}>{this.props.cancelText ? this.props.cancelText : 'Cancel'}</Button>
                    <Button.Or/>
                    <Button positive onClick={() => this.handleConfirm()}>{this.props.confirmText ? this.props.confirmText : 'Confirm'}</Button>
                </Button.Group>

            if (this.props.warning) {
                warning = this.props.warning;
            }
        }

        return (
            <div>
                <Dropdown options={this.props.options}
                              value={this.state.value}
                              id={this.props.id ? this.props.id : ''}
                              disabled={this.props.disabled}
                              onChange={(e, data) => this.showConfirm(data)}
                              selection
                />
                {confirmChange}
                {warning}
            </div>
        )
    }
}