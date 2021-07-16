import {
    RETRIEVE_TOPICS
} from "./type";

import TopicsDataService from "../services/topics.service";

export const retrieveTopics = () => async (dispatch) => {
    try {
        const res = await TopicsDataService.getAll();

        dispatch({
            type: RETRIEVE_TOPICS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};