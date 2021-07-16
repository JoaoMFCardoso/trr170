import {
    RETRIEVE_TOTALS
} from "./type";

import TotalsDataService from "../services/totals.service";

export const retrieveTotals = () => async (dispatch) => {
    try {
        const res = await TotalsDataService.getAll();

        dispatch({
            type: RETRIEVE_TOTALS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};