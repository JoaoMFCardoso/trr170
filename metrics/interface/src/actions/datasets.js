import {
    RETRIEVE_DATASETS
} from "./type";

import DatasetsDataService from "../services/datasets.service";

export const retrieveDatasets = () => async (dispatch) => {
    try {
        const res = await DatasetsDataService.getAll();

        dispatch({
            type: RETRIEVE_DATASETS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};