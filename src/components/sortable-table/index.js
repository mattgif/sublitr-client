import React from 'react';
import { Icon } from 'semantic-ui-react';

export default class SortableTable extends React.Component {
    // takes prop headers / array of k/v pairs for label and key
    // data is array of data to sort by header key
    // formatData is a function returning the html format for data to be displayed in table
    constructor(props) {
        super(props);
        this.state = {
            reverse: false,
            sortBy: this.props.headers[0].key
        };
    }

    compare(a, b, reverse) {
        if (typeof a === 'string') {
            return reverse ? new Intl.Collator().compare(b, a) : new Intl.Collator().compare(a, b)
        } else {
            return reverse ? b - a : a - b
        }
    }

    sortTable(key) {
        if (key === this.state.sortBy) {
            this.setState({reverse: !this.state.reverse})
        } else {
            this.setState({reverse: false, sortBy: key})
        }
        this.props.data.sort((a, b) => this.compare(a[key], b[key], this.state.reverse))
    }

    formattedHeaders = (sortBy, reverse) => this.props.headers.map(header => {
        let sortIcon = ' ';
        if (header.key === sortBy) {
            sortIcon = reverse ? <Icon name="chevron up"/> : <Icon name="chevron down"/>;
        }
        return <th key={header.key} onClick={() => this.sortTable(header.key)}>{header.label} {sortIcon}</th>
    });

    render() {

        const tableData = this.props.formatData(this.props.data);
        console.log(tableData);
        return (
            <table id={this.props.tableId}>
                <thead>
                <tr>
                    {this.formattedHeaders(this.state.sortBy, this.state.reverse)}
                </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        )
    }
}