import {getActiveYearIndex} from "./record.handling.methods";

/**
 * This method handles all changes in each of the existing pages.
 * New page elements should be added here.
 * @param id The element id
 * @param type The type, according to the registry
 * @param document the html document
 * @param state the state of the component
 */
export const handleOnChange = (id, type, document, state) => {
    /* Differentiate based on type
         * 0 - category
         * 1 - year
         * 2 - quarter
         * 3 - topic
         * 4 - datasets
         * 5 - dataverses
         * 6 - content types
         * 7 - affiliation
         * */
    switch (type) {
        case 1: /* year */
            if(document.getElementById(id).checked){
                if(state.singleYearMode){
                    /* The single year mode behaviour
                * When certain categories and topics or datasets are selected only the selected year should be added to the active years.
                * The remainder should be removed. */

                    // Uncheck all other years in the active years
                    uncheck(id, 1, document, state);

                    // Add to active years
                    state.activeYears = [id];

                }else{
                    /* The standard behaviour
                * Adding or removing years to the active years state according to selection */

                    if(document.getElementById(id).checked){
                        /* Add to active years */
                        const index = getActiveYearIndex(state.activeYears, id);
                        state.activeYears.splice(index, 0, id);

                    } else{
                        /* Remove from active years */
                        const index = state.activeYears.indexOf(id);
                        if (index > -1) {
                            state.activeYears.splice(index, 1);
                        }
                    }
                }
            } else{
                /* Remove from active years */
                const index = state.activeYears.indexOf(id);
                if (index > -1) {
                    state.activeYears.splice(index, 1);
                }
            }
            break;
        case 2: /* quarter */
            if(document.getElementById(id).checked){

                /* Add to active quarters */
                state.activeQuarters.push(id);
                state.activeQuarters.sort();

            } else{
                /* Remove from active quarters */
                const index = state.activeQuarters.indexOf(id);
                if (index > -1) {
                    state.activeQuarters.splice(index, 1);
                }
            }
            break;
        case 3: /* topic */
            /* Add to active Topic and uncheck all others */
            state.activeTopic = id;
            if(id === 'allTopics'){
                state.singleYearMode = true;
            }else{
                state.singleYearMode = false;
            }
            uncheck(id, type, document, state);
            break;
        case 4: /* datasets */
            /* Add to active Topic and uncheck all others */
            state.activeDataset = id;
            if(id === 'allDatasets'){
                state.singleYearMode = true;
            }else{
                state.singleYearMode = false;
            }
            uncheck(id, type, document, state);
            break;
        case 5:
            /* Add to active dataverse */
            state.activeDataverse = id;
            if(id === 'all'){
                state.singleYearMode = true;
            }else{
                state.singleYearMode = false;
            }
            uncheck(id, type, document, state);
            break;
        case 6:
            /* Add to active content type */
            state.activeContentType = id;
            uncheck(id, type, document, state);
            break;
        case 7:
            /* Add to active affiliation */
            state.activeAffiliation = id;
            uncheck(id, type, document, state);
            break;
        default: /* category */
            /* Change active category and uncheck all others */
            state.activeCategory = id;
            uncheck(id, type, document, state);
            break;
    }
};

/**
 * This method unchecks the checkboxes according to the type
 * @param activeId The id of the active element
 * @param type The type according to the registry
 * @param document the html document of the component
 * @param state the component state
 */
export const uncheck = (activeId, type, document, state ) => {
    /* Differentiate based on type
        * 0 (default) - category
        * 1 - years
        * 2 - quarters
        * 3 - topic
        * 4 - datasets
        * 5 - dataverses
        * 6 - content types
        * 7 - affiliation
        * */
    switch (type){
        case 1: // years
            state.activeYears.map(id => {
                if(activeId !== id && document.getElementById(id) !== null ) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        case 3: // topic
            /* Uncheck the allTopics if checked */
            if(activeId !== 'allTopics'){
                document.getElementById('allTopics').checked = false;
            }

            /* Uncheck all other topics if checked */
            state.topicList.map(id => {
                if(activeId !== id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        case 4: //dataset
            /* Uncheck the allDatasets if checked */
            if(activeId !== 'allDatasets' && state.activeCategory === 'n_views'){
                document.getElementById('allDatasets').checked = false;
            }

            /* Uncheck all other topics if checked */
            state.datasetList.map( id => {
                if(activeId !== id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        case 5:
            /* Uncheck the allDatasets if checked */
            if(activeId !== 'all'){
                document.getElementById('all').checked = false;
            }

            /* Uncheck all other topics if checked */
            state.dataverseList.map( id => {
                if(activeId !== id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        case 6:
            state.contentTypeList.map(id => {
                if(activeId != id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        case 7:
            state.affiliationList.map(id => {
                if(activeId != id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
        default: // category
            state.categoryList.map(({id}) => {
                if(activeId !== id) {
                    document.getElementById(id).checked = false;
                }
            })
            break;
    }
};

/**
 * Checks or unchecks quarter checkboxes
 * @param document The HTML document
 * @param state The component state
 */
export const checkQuarters = (document, state) => {
    for (let quarter = 1; quarter <= state.activeQuarters.length; quarter++){
        if(!state.activeQuarters.includes(quarter)){
            document.getElementById(quarter.toString()).checked = false;
        }else{
            document.getElementById(quarter.toString()).checked = true;
        }
    }
};