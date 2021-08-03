import {
    RETRIEVE_DATAVERSES
} from "./type";

import DataversesDataService from "../services/dataverses.service";

export const retrieveDataverses = () => async (dispatch) => {
    try {
        const res = await DataversesDataService.getAll();

        dispatch({
            type: RETRIEVE_DATAVERSES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};