import {
    RETRIEVE_CONTENTTYPES
} from "./type";

import ContentTypesDataService from "../services/contentTypes.service";

export const retrieveContentTypes = () => async (dispatch) => {
    try {
        const res = await ContentTypesDataService.getAll();

        dispatch({
            type: RETRIEVE_CONTENTTYPES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};