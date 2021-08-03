import {
    RETRIEVE_CONTENTTYPES
} from "../actions/type";

const initialState = [];

function ContentTypesReducer(contentTypes = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case RETRIEVE_CONTENTTYPES:
            return payload;
        default:
            return contentTypes;
    }
};

export default ContentTypesReducer;