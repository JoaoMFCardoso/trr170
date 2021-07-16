import {
    RETRIEVE_TOPICS
} from "../actions/type";

const initialState = [];

function topicsReducer(topics = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case RETRIEVE_TOPICS:
            return payload;
        default:
            return topics;
    }
};

export default topicsReducer;