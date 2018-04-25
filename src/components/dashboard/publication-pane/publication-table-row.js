import React from 'react';
import {connect} from 'react-redux';
import '../review-pane/review-table.css'
import DeletePublicationConfirm from '../../cards/publication-card/deletepublicationonfirm';
import EditPublicationForm from "../../forms/publication-form/edit-publication-form";

export class PublicationTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            message: undefined
        }
    }

    toggleExpanded = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        const { title, editors, image, id } = this.props.publication;
        const { expanded, message } = this.state;
        let editorItems;
        if (editors) {
            editorItems = Object.keys(editors).map(edId => {
                const editor = editors[edId];
                return <li key={editor.id}><span className="name">{editor.name}</span> <span className="email">({editor.email})</span></li>
            });
        }

        let form;
        if (expanded) {
            // used so form unmounts on submit, and clears data
            form = <EditPublicationForm cancel={this.toggleExpanded} title={title} id={id}/>
        }

        return (
            <tbody className="publication__row">
            <tr onClick={() => this.toggleExpanded()} className={`bottom ${expanded ? 'dotted' : ''}`}>
                <td className="image"><div className="image"><img src={image} alt={title + " logo"}/></div></td>
                <td className="publication">{title}</td>
                <td className="editors"><ul>{editorItems}</ul></td>
                <td className="delete" onClick={e => e.stopPropagation()}>
                    <DeletePublicationConfirm className="delete" title={title} id={id}/>
                </td>
            </tr>
            <tr className={expanded ? 'expanded bottom' : ''}><td colSpan={6} className={expanded ? 'expanded' : 'collapsed'}>
                {message}
                {form}
            </td></tr>
            </tbody>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    publication: state.publications.publications[ownProps.title]
});

export default connect(mapStateToProps)(PublicationTableRow)