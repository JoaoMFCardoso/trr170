import {
    RETRIEVE_DATAVERSES
} from "../actions/type";

const initialState = [];

function DataversesReducer(dataverses = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case RETRIEVE_DATAVERSES:
            return payload;
        default:
            return dataverses;
    }
};

export default DataversesReducer;