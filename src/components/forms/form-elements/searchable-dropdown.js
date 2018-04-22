import React, from 'react'
import { Dropdown} from 'semantic-ui-react'

export class SearchableDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state({
            searchQuery: null,
            value: []
        })
    }

    handleChange = (e, {value}) => this.setState({value});
    handleSearchChange = (e, {searchQuery}) => this.setState({searchQuery});

    render() {
        const {multiple, search, options, isFetching} = this.props;
        return (
            <Dropdown
                fluid
                selection
                multiple={multiple}
                search={search}
                options={options}
                value={value}
                placeholder='Add Users'
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                disabled={isFetching}
                loading={isFetching}
            />
        )
    }
}