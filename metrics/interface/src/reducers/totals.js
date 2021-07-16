import {
    RETRIEVE_TOTALS
} from "../actions/type";

const initialState = [];

function totalsReducer(totals = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case RETRIEVE_TOTALS:
            return payload;
        default:
            return totals;
    }
};

export default totalsReducer;