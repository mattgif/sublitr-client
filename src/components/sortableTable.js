import React from 'react';

export default class SortableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverse: false,
            col: 0
        };
    }

    sortTable(col) {
        // if already sorted by col n, reverse direction
        if (col === this.state.col) {
            this.setState({reverse: !this.state.reverse})
        } else {
            // otherwise sort asc and set the col
            this.setState({
                reverse: false,
                col
            })
        }
        let table, rows, i, x, y, shouldSwitch, switching;
        let switchCount = 0;
        switching = true;
        table = document.getElementById(this.props.tableId);
        // Make a loop that will continue until no switching has been done:
        while (switching) {
            // Assume no switching is needed
            switching = false;
            // get array of table rows
            rows = table.getElementsByTagName("TR");
            // Loop through all table rows after the first (header)
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[col];
                y = rows[i + 1].getElementsByTagName("TD")[col];
                // Check if the two rows should switch place, based on the direction, asc or desc:
                if (!this.state.reverse) {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch= true;
                        break;
                    }
                } else if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())  {
                    // Order is reversed; mark as a switch and break the loop if x<y:
                    shouldSwitch= true;
                    break;
                }
            }
            if (shouldSwitch) {
                // If a switch has been marked, make the switch and mark that a switch has been done:
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchCount++;
            } else {
                // If no switching has been done AND it's sorted ascending
                // reverse and run the while loop again.
                if (switchCount === 0 && !this.state.reverse) {
                    this.setState({reverse:true});
                }
            }
        }
    }

    formattedHeaders = this.props.headers.map((header, index) => {
        return <th key={index} onClick={() => this.sortTable(index)}>{header}</th>
    });

    render() {
        return (
            <table id={this.props.tableId}>
                <thead>
                <tr>
                    {this.formattedHeaders}
                </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
}