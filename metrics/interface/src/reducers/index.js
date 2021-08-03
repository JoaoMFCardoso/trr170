import { combineReducers } from "redux";
import affiliations from "./affiliations";
import totals from "./totals";
import topics from "./topics";
import datasets from "./datasets";
import dataverses from "./dataverses";
import contentTypes from "./contentTypes";

export default combineReducers({
    affiliations,
    totals,
    topics,
    datasets,
    dataverses,
    contentTypes,
});