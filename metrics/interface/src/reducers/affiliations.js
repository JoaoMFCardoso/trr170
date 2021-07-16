import {
    CREATE_AFFILIATION,
    RETRIEVE_AFFILIATIONS,
    UPDATE_AFFILIATION,
    DELETE_AFFILIATION,
    DELETE_ALL_AFFILIATIONS
} from "../actions/type";

const initialState = [];

function affiliationReducer(affiliations = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case CREATE_AFFILIATION:
            return [...affiliations, payload];

        case RETRIEVE_AFFILIATIONS:
            return payload;

        case UPDATE_AFFILIATION:
            return affiliations.map((affiliation) => {
                if (affiliation.id === payload.id) {
                    return {
                        ...affiliation,
                        ...payload,
                    };
                } else {
                    return affiliation;
                }
            });

        case DELETE_AFFILIATION:
            return affiliations.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_AFFILIATIONS:
            return [];

        default:
            return affiliations;
    }
};

export default affiliationReducer;