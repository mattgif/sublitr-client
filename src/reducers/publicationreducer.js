import {
    CREATE_PUBLICATION_SUCCESS, DELETE_PUBLICATION_REQUEST, DELETE_PUBLICATION_SUCCESS,
    FETCH_PUBLICATIONS_ERROR, FETCH_PUBLICATIONS_REQUEST,
    FETCH_PUBLICATIONS_SUCCESS, UPDATE_PUBLICATION_SUCCESS
} from "../actions/publications";

const initialState = {
    publicationsOptions: function() {
        // formats publication data for use in semantic dropdowns
        return Object.keys(this.publications).map(key => {
            const publication = this.publications[key];
            return {text: publication.title, value: publication.abbr, icon: publication.icon, key: publication.abbr}
        })
    },
    publicationsAbbrHash: function() {
        // some items (e.g. form elements) need sanitized values, so we need a way of looking up publications by abbr instead of title
        const _publications = {};
        Object.keys(this.publications).forEach(title => {
            const pub = this.publications[title];
            const abbr = pub.abbr;
            _publications[abbr] = pub
        });
        return _publications
    },
    loading: false,
    error: undefined,
    publications: {},
    deleting: false
};

export const publicationReducer = (state = initialState, action) => {
    if (action.type === FETCH_PUBLICATIONS_REQUEST) {
        return {...state, loading: true, error: undefined}
    }

    else if (action.type === FETCH_PUBLICATIONS_SUCCESS) {
        const pubArray = action.publications;
        let publications = {};
        pubArray.forEach(pub => publications[pub.title] = pub);
        return {...state, publications, loading: false, error: undefined}
    }

    else if (action.type === FETCH_PUBLICATIONS_ERROR) {
        return {...state, error: 'Error retrieving publications', loading: false}
    }

    else if (action.type === CREATE_PUBLICATION_SUCCESS) {
        const publications = Object.assign({}, state.publications, {
            [action.publication.title]: action.publication
        });
        return {...state, publications}
    }

    else if (action.type === DELETE_PUBLICATION_REQUEST) {
        return {...state, deleting: true}
    }

    else if (action.type === DELETE_PUBLICATION_SUCCESS) {
        const publications = Object.assign({}, state.publications);
        delete publications[action.title];
        return {...state, publications, deleting: false}
    }

    else if (action.type === UPDATE_PUBLICATION_SUCCESS) {
        const publications = Object.assign({}, state.publications);
        const updatedPublication = action.publication;
        publications[updatedPublication.title] = updatedPublication;

        return {...state, publications}
    }

    return state;
};