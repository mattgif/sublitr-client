import React from 'react';
import {connect} from 'react-redux';
import CubicLoadingSpinner from '../../loading-animations/cubic-loading-spinner';
import PublicationTableRow from './publication-table-row';

export class PublicationTable extends React.Component {
    render() {
        const { loading, searchTerm, publications } = this.props;
        if (loading) {
            return <CubicLoadingSpinner/>
        }

        if (Object.keys(publications).length === 0) {
            return <section>Error retrieving publication list</section>
        }

        const matches = Object.keys(publications).filter(_pub => {
            const pub = publications[_pub];
            return pub.title.toLowerCase().includes(searchTerm.toLowerCase());
        });

        const rows = matches.map(title => {
            return <PublicationTableRow key={publications[title].abbr} title={title}/>
        });

        if (!matches.length) {
            return <section><h2>No matching titles found</h2></section>
        }

        return (
            <table cellSpacing={0} className="expandable__table">
                <thead>
                <tr>
                    <th colSpan={2}>Publication</th>
                    <th>Editors</th>
                    <th/>
                </tr>
                </thead>
                {rows}
            </table>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.publications.loading,
    publications: state.publications.publications,
});

export default connect(mapStateToProps)(PublicationTable)

