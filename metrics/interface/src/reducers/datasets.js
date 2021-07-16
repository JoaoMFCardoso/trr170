import {
    RETRIEVE_DATASETS
} from "../actions/type";

const initialState = [];

function DatasetsReducer(datasets = initialState, action) {
    const {type, payload } = action;

    switch(type) {
        case RETRIEVE_DATASETS:
            return payload;
        default:
            return datasets;
    }
};

export default DatasetsReducer;