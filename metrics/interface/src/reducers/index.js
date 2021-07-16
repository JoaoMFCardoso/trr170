import { combineReducers } from "redux";
import affiliations from "./affiliations";
import totals from "./totals";
import topics from "./topics";
import datasets from "./datasets";

export default combineReducers({
    affiliations,
    totals,
    topics,
    datasets,
});