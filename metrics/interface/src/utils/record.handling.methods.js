
/**
 * Creates a list of values from a given field, from a set of records
 * @param records The set of records
 * @param field The field whose values will be returned
 * @returns {[]}
 */
export const getValuesByField = (records, field) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let filteredRecords = [];

        records.map(record =>{
            const value = record[field];
            filteredRecords.push(value);
        })

        return filteredRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of years that show up on the records.
 * The years are sorted from earliest to oldest.
 * @param records
 * @returns {[]}
 */
export const getYears = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const recordDate = new Date(record.createdAt);
            const recordYear = recordDate.getFullYear();

            if(!matchedRecords.includes(recordYear)){
                matchedRecords.push(recordYear);
            }
        })

        matchedRecords.sort().reverse();

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of the Dataverse IDs that show up on the records.
 * @param records
 * @returns {[]}
 */
export const getDataverseIds = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const dataverseId = record.dataverse_id;

            if(!matchedRecords.includes(dataverseId)){
                matchedRecords.push(dataverseId);
            }
        })

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of the Content Types that show up on the records.
 * @param records
 * @returns {[]}
 */
export const getContentTypes = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const contentType = record.content_type;

            if(!matchedRecords.includes(contentType)){
                matchedRecords.push(contentType);
            }
        })

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of the Affiliations that show up on the records.
 * @param records
 * @returns {[]}
 */
export const getAffiliations = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const affiliation = record.affiliation;

            if(!matchedRecords.includes(affiliation)){
                matchedRecords.push(affiliation);
            }
        })

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of the Topics that show up on the records.
 * @param records
 * @returns {[]}
 */
export const getTopics = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const topic = record.topic;

            if(!matchedRecords.includes(topic)){
                matchedRecords.push(topic);
            }
        })

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of the Dataset Ids that show up on the records.
 * @param records
 * @returns {[]}
 */
export const getDatasetIds = (records) => {
    try{
        if(!records.length){
            throw 'records are empty';
        }

        let matchedRecords = [];

        records.map(record =>{
            const datasetId = record.dataset_id;

            if(!matchedRecords.includes(datasetId)){
                matchedRecords.push(datasetId);
            }
        })

        return matchedRecords;

    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Gets the quarter from a given date. Or gives today's quarter if no date is provided.
 * @param date
 * @returns {number}
 */
export const getQuarter = (date) => {
    date = date || new Date(); // If no date supplied, use today
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    return quarter;
};

/**
 * Creates a list of records that match a given year.
 * @param records
 * @param year
 * @returns {[]}
 */
export const getRecordsByYear = (records, year) => {
    const matchedRecords = [];

    records.map(record =>{
        const recordDate = new Date(record.createdAt);
        const recordYear = recordDate.getFullYear();

        if(year === recordYear){
            matchedRecords.push(record);
        }
    })

    return matchedRecords;
};

/**
 * This method creates a list of records that match a given value.
 * @param records Original record list
 * @param field Record field to be compared
 * @param value The value against all records will be compared.
 * @returns {[]}
 */
export const getRecordsByFieldMatchingValue = (records, field, value) => {
    try {
        if(!records.length || field === ""){
            throw 'records are empty or field still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordField = record[field];

            if(value === recordField){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of records that match a given quarter.
 * @param records
 * @param quarter
 * @returns {[]}
 */
export const getRecordsByQuarter = (records, quarter) => {
    const matchedRecords = [];

    records.map(record =>{
        const recordDate = new Date(record.createdAt);
        const recordQuarter = getQuarter(recordDate);

        if(quarter === recordQuarter){
            matchedRecords.push(record);
        }
    })

    return matchedRecords;
};

/**
 * Creates a list of records that match a given dataverse id.
 * @param records
 * @param dataverseId
 * @returns {[]}
 */
export const getRecordsByDataverseId = (records, dataverseId) => {
    try {
        if(!records.length || dataverseId === ""){
            throw 'records are empty or dataverse id still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordDataverseId = record.dataverse_id;

            if(dataverseId === recordDataverseId){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of records that match a given dataset id.
 * @param records
 * @param datasetId
 * @returns {[]}
 */
export const getRecordsByDatasetId = (records, datasetId) => {
    try {
        if(!records.length || datasetId === ""){
            throw 'records are empty or dataset id still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordDatasetId = record.dataset_id;

            if(datasetId === recordDatasetId){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of records that match a given Content Type.
 * @param records
 * @param contentType
 * @returns {[]}
 */
export const getRecordsByContentType = (records, contentType) => {
    try {
        if(!records.length || contentType === ""){
            throw 'records are empty or content type still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordContentType = record.content_type;

            if(contentType === recordContentType){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of records that match a given Topic.
 * @param records
 * @param topic
 * @returns {[]}
 */
export const getRecordsByTopic = (records, topic) => {
    try {
        if(!records.length || topic === ""){
            throw 'records are empty or topic still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordTopic = record.topic;

            if(topic === recordTopic){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Creates a list of records that match a given affiliation
 * @param records
 * @param affiliation
 * @returns {[]}
 */
export const getRecordsByAffiliation = (records, affiliation) => {
    try {
        if(!records.length || affiliation === ""){
            throw 'records are empty or affiliation still undefined.';
        }

        const matchedRecords = [];

        records.map(record =>{
            const recordAffiliation = record.affiliation;

            if(affiliation === recordAffiliation){
                matchedRecords.push(record);
            }
        })

        return matchedRecords;
    } catch (err) {
        console.log(err);
        return [];
    }
};

/**
 * Returns the latest record in the provided list.
 * @param records
 * @returns {{}}
 */
export const getLatestRecord = (records) => {
    let matchedRecord = {};
    let latestDate = new Date(1900, 0);

    records.map(record =>{
        const recordDate = new Date(record.createdAt);

        if(recordDate > latestDate){
            matchedRecord = record;
            latestDate = recordDate;
        }
    })

    return matchedRecord;
};

/**
 * Gets the latest value for each quarter of the selected year and field.
 * @param records
 * @param year
 * @param field
 * @returns {{}}
 */
export const getAllQuartersOfYearByField = (records, year, field) => {
    try {
        if(!records.length){
            throw 'records are empty';
        }

        let data = [0, 0, 0, 0];

        const recordsByYear = getRecordsByYear(records, year);

        for (let i = 1; i < 5; i++) {
            const quarterRecords = getRecordsByQuarter(recordsByYear, i);

            if(quarterRecords.length > 0) {
                const latestQuarterRecord = getLatestRecord(quarterRecords);
                data[i - 1] = latestQuarterRecord[field];
            }
        }

        return data;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Gets a set of records based on a list of years and field.
 * @param records
 * @param year
 * @param field
 * @returns {{}}
 */
export const getRecordsByYearAndField = (records, years, field) => {
    try {
        if(!records.length){
            throw 'records are empty';
        }

        let data = [];

        for (let i = 0; i < years.length; i++) {
            const record = getAllQuartersOfYearByField(records, years[i], field);

            data.push(record);
        }

        return data;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Builds the data for a TotalBarChart with no restrictions other than field
 * @param records
 * @param years
 * @param quarters
 * @param field
 * @returns {[][]}
 */
export const buildDataTotalBarChart = (records, years, quarters, field) => {
    try{
      if(!records.length){
          throw 'records are empty';
      }

      const chartData = [[], [], [], []];

      const recordData = getRecordsByYearAndField(records, years, field);

      for (let i = 0; i < chartData.length; i++) {
          for(let j = 0; j < recordData.length; j++) {
              chartData[i].push(recordData[j][i]);
          }
      }

      /* Adjust for the active quarters
      *  By default all are active.
      * If less than 4 quarters are active, then it's necessary to replace the quarter list with 0's according to
      * the length of the data.
      *  */
      if(quarters.length < 4) {
          for (let quarter = 1; quarter <= chartData.length; quarter++){
              if(!quarters.includes(quarter)){
                  chartData[quarter - 1] = new Array(chartData[quarter - 1].length).fill(0);
              }
          }
      }

      return chartData;

    } catch (err) {
      console.log(err);
      return [];
    }
};

export const buildDataDoughnutChart = (records, years, labels, labelField, dataField) => {
    try{
        if(!records.length){
            throw 'records are empty';
         }
        const activeYear = years[0]; // It's always the first, which by default is the latest year.

        /* Filter by year */
        const activeYearRecords = getRecordsByYear(records, activeYear);

        /* Runs all existing records and builds a list of records that has only the latest record for the selected field */
        const latestRecordsByLabelField = [];
        labels.map(label =>{
            const recordsByLabelField = getRecordsByFieldMatchingValue(activeYearRecords, labelField, label);
            const latestRecord = getLatestRecord(recordsByLabelField);
            latestRecordsByLabelField.push(latestRecord);
        })

        const data = getValuesByField(latestRecordsByLabelField,dataField);

        return data;

    } catch (err) {
        console.log(err);
        return [];
    }
};
