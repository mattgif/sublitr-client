import React from 'react';
import { Icon, Header, Table, Button, Checkbox } from 'semantic-ui-react';

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
        let sortIcon = '   ';
        if (header.key === sortBy) {
            sortIcon = reverse ? <Icon name="caret up"/> : <Icon name="caret down"/>;
        }
        return <Table.HeaderCell key={header.key} onClick={() => this.sortTable(header.key)}>{header.label} {sortIcon}</Table.HeaderCell>
    });

    render() {
        const tableData = this.props.formatData(this.props.data);
        return (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        {this.formattedHeaders(this.state.sortBy, this.state.reverse)}
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tableData}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button floated='right' icon labelPosition='left' primary size='small'>
                                <Icon name='user' /> Add User
                            </Button>
                            <Button size='small'>Approve</Button>
                            <Button disabled size='small'>Approve All</Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}