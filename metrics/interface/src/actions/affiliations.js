import {
    CREATE_AFFILIATION,
    RETRIEVE_AFFILIATIONS,
    UPDATE_AFFILIATION,
    DELETE_AFFILIATION,
    DELETE_ALL_AFFILIATIONS
} from "./type";

import AffiliationsDataService from "../services/affiliations.service";

export const createAffiliation = (affiliation, n_users) => async (dispatch) => {
    try {
        const res = await AffiliationsDataService.create({ affiliation, n_users });

        dispatch({
            type: CREATE_AFFILIATION,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveAffiliations = () => async (dispatch) => {
    try {
        const res = await AffiliationsDataService.getAll();

        dispatch({
            type: RETRIEVE_AFFILIATIONS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateAffiliation = (id, data) => async (dispatch) => {
    try {
        const res = await AffiliationsDataService.update(id, data);

        dispatch({
            type: UPDATE_AFFILIATION,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteAffiliation = (id) => async (dispatch) => {
    try {
        await AffiliationsDataService.delete(id);

        dispatch({
            type: DELETE_AFFILIATION,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllAffiliations = () => async (dispatch) => {
    try {
        const res = await AffiliationsDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_AFFILIATIONS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findAffiliationBy = (affiliation) => async (dispatch) => {
    try {
        const res = await AffiliationsDataService.findBy(affiliation);

        dispatch({
            type: RETRIEVE_AFFILIATIONS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};