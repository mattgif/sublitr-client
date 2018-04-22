import React from 'react';
import { connect } from 'react-redux';
import DeletePublicationConfirm from './deletepublicationonfirm';
import EditPublicationForm from '../../forms/publication-form/edit-publication-form';
import './publication-card.css';

export class PublicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    toggleEditing() {this.setState({editing: !this.state.editing})}

    render() {
        const {title, image, id, editors} = this.props.publication;
        const {editing} = this.state;
        let editorItems, mainContent;
        if (editors) {
            editorItems = Object.keys(editors).map(edId => {
                const editor = editors[edId];
                return <li key={editor.id}><span className="name">{editor.name}</span> <span className="email">({editor.email})</span></li>
            });
        }

        if (editing) {
            mainContent = <EditPublicationForm cancel={this.toggleEditing} editors={editors} title={title} id={id}/>
        } else {
            mainContent =
                <section>
                    <h3>{title}</h3>
                    <h4>Editors</h4>
                    <ul>
                        {editorItems}
                    </ul>
                </section>;
        }

        return (
            <div className="publication__card">
                <section className="image__wrapper">
                    <img src={image} alt={`${title} logo`}/>
                </section>
                {mainContent}
                <div className="button__wrapper">
                    <button onClick={() => this.toggleEditing()} className="edit">{editing ? 'Cancel' : 'Edit'}</button>
                    <DeletePublicationConfirm className="delete" title={title} id={id}/>
                </div>
            </div>
        )
    }
}

export default connect()(PublicationCard)