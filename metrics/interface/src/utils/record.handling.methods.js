
/**
 * Creates a list of years that show up on the records.
 * The years are sorted from earliest to oldest.
 * @param records
 * @param year
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
 * @param quarters
 * @param field
 * @returns {{}}
 */
export const getRecordsByYearAndField = (records, years, quarters, field) => {
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

      const chartData = [[], [], [], []]

      const recordData = getRecordsByYearAndField(records, years, quarters, field);

      for (let i = 0; i < chartData.length; i++) {
          for(let j = 0; j < recordData.length; j++) {
              chartData[i].push(recordData[j][i]);
          }
      }

      return chartData;

  } catch (err) {
      console.log(err);
  }
};
