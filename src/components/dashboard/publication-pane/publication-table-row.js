import React from 'react';
import {connect} from 'react-redux';
import '../expandable-table.css';
import {Confirm} from 'semantic-ui-react';
import EditPublicationForm from "../../forms/publication-form/edit-publication-form";
import {deletePublication} from "../../../actions/publications";

export class PublicationTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            message: undefined,
            deleteModalOpen: false,
        };
        this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded = () => {
        this.setState({expanded: !this.state.expanded});
    };

    showDeleteConfirmation = (e) => {this.setState({ deleteModalOpen: true });};

    handleDeleteCancel = () => this.setState({ open: false });

    handleDeleteConfirm = () => {
        return this.props.dispatch(deletePublication(this.props.publication.title, this.props.publication.id))
        .then(() => this.setState({ deleteModalOpen: false }))
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
                    <div>
                        <button className="delete" onClick={(e) => this.showDeleteConfirmation(e)}>Delete</button>
                        <Confirm
                            open={this.state.deleteModalOpen}
                            onCancel={this.handleDeleteCancel}
                            onConfirm={this.handleDeleteConfirm}
                            content={`Delete ${title}?`}
                            confirmButton='Delete publication'
                            size='tiny'
                        />
                    </div>
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