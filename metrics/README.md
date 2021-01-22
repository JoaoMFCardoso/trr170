# Dataverse Metrics Harvester

## Introduction

The Dataverse Metrics Harvester allows for the extraction of multiple metrics from a Dataverse installation. 

It makes use of the Dataverse [Metrics], [Native], [Search] APIs, and the [Make Data Count] feature.

It uses the [Python] programming language and its testing module was developed using the [unittest] unit testing framework.

## Requirements

- Python 3

## Structure

The Dataverse Harvester is structured according to 4 python packages.

```bash
├── main - Package holding the cron scripts
├── connection - Establishes the connections to Datavese installations.
├── operations - Operations to harvest metrics from Dataverse installations.
└── tests - Testing modules of all the operations modules. 
```

## Installation

### Get the code

Clone the repo:

    git clone https://github.com/JoaoMFCardoso/trr170.git

Change to the directory you just created by cloning the repo:

    cd trr170

### Configuration

Edit `config.ini` to reflect your Dataverse installation:

- `[dataverse_instalation]`: The designator of a Dataverse installation (e.g., DEMO).
- `base_url`: The base url for a Dataverse installation (e.g., https://demo.dataverse.org/).
- `api_key`: The API key for a Dataverse installation (e.g., 0a0a000a-a000-0000-a000-00a00a00a000).


## Usage

TODO

    python execute.py

To update your metrics periodically, you'll want to queue up a shell script in some flavor of [cron][].

Here's an [example shell script]() to get you started.

On a Red Hat or CentOS system, you might drop a file like [update_metrics.cron]() into /etc/cron.d/ to update on a specified schedule.

## Operations

  - [General Operations](###general-operations)
  - [Dataverse Operations](###dataverse-operations)
  - [Dataset Operations](###dataset-operations)
  - [File Operations](###file-operations)
  - [User Operations](###user-operations)


###General Operations

General operations focuses on operations that apply to all object types.

#### List of operations
  
  - [Count All](###Count-All)
  - [Count to Month](###Count-to-Month)
  - [Count By Days](###Count-By-Days)
  - [Count By Subject](###Count-By-Subject)

---
###Count All

Returns a count of a provided object over all-time.

- Input: 
    - An object type, e.g. dataverse, dataset, file.
- Output: 
    - The number of object listing from the provided type. -1 if object type is not valid.

**Call Example**

    count_all('dataverse')

---
###Count to Month

Returns a count of provided objects in dataverse up to a specified month YYYY DD in YYYY-MM format (e.g. 2020-12).

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - YYYY, e.g. 2020.
    - MM, e.g. 12
- Output:
    - The number of object listing from the provided type, filtered by a year and month. -1 if object type is not valid.

**Call Example**
    
    count_to_month('dataverse', '12', '2020')

---
###Count By Days

Returns a count of provided objects in dataverse for the past $days (e.g. 30).

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - DD, e.g. 20.
- Output:
    - The number of object listing from the provided type, filtered by days. -1 if object type is not valid.

**Call Example**
    
    count_by_days('dataverse', '20')

---
###Count By Subject

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

###Dataverse Operations

Dataverse operations focuses on operations that solely apply to Dataverse objects types.

#### List of operations
  
  - [Get Dataverse IDs](#####get-dataverse-ids)
  - [Get All Dataverse Datasetcount](#####get-all-dataverse-datasetcount)
  - [Get Dataverse Size in Bytes](#####get-dataverse-size-in-bytes)
  - [Count Dataverse by Category](#####count-dataverse-by-category)

---
####Get Dataverse IDs

Gets all the Dataverse Persistent IDs.

- Input:
    - None.
- Output: 
    - A list with all the Dataverse persistent IDs.

**Call Example**
    
    get_dataverse_ids()

---
####Get All Dataverse Datasetcount

Gets the number of datasets associated with each dataverse.

- Input:
    - None.
- Output: 
    - A dictionary containing the names of the dataverses and their respective dataset counts.

**Call Example**
    
    get_all_dataverse_datasetcount()

---
####Get Dataverse Size in Bytes

Gets the size in bytes of each Dataverse.

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataverse identifiers as keys, and their total size in bytes as value.

**Call Example**
    
    get_dataverse_size()

---
####Count Dataverse by Category

Returns a count of Dataverses in dataverse for the provided category.

- Input:
    - A category, e.g. Organization or Institution.
- Output: 
    - The number of dataverses, filtered by a category. -1 if the category is not found.

**Call Example**
    
    count_dataverse_by_category('Organization')

###Dataset Operations

Dataset operations focuses on operations that solely apply to Dataset objects types.

#### List of operations
  
  - [Get Dataset IDs](#####Get-Dataset-IDs)
  - [Get All Dataset File count](#####Get-All-Dataset-File-count)
  - [Get Dataverse Size in Bytes](#####Get-Dataverse-Size-in-Bytes)
  - [Count Dataverse by Category](#####Count-Dataverse-by-Category)
  - [Get Dataset IDs](#####Get-Dataset-IDs)
  - [Get All Dataverse Datasetcount](#####Get-All-Dataverse-Datasetcount)
  - [Get Dataverse Size in Bytes](#####Get-Dataverse-Size-in-Bytes)
  - [Count Dataverse by Category](#####Count-Dataverse-by-Category)
  - [Get Dataset IDs](#####Get-Dataset-IDs)
  - [Get All Dataverse Datasetcount](#####Get-All-Dataverse-Datasetcount)
  - [Get Dataverse Size in Bytes](#####Get-Dataverse-Size-in-Bytes)
  - [Count Dataverse by Category](#####Count-Dataverse-by-Category)

---
####Get Dataset IDs

Gets the Dataset Persistent IDs in accordance to a provided filter.

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
        - No value [default]: Returns all the existing Dataset ids.
        - p: Returns published dataset ids.
        - d: Returns draft dataset ids.
- Output: 
    - A list of Dataset persistent IDs.

**Call Example**
    
    get_dataset_ids()
    get_dataset_ids('p')
    get_dataset_ids('d')

---
####Get All Dataset File count

Gets the number of files for each dataset.

- Input:
    - None.
- Output: 
    - A dictionary containing the global id's of the datasets and their respective file counts.

**Call Example**
    
    get_all_dataset_filecount()

---
*Get Dataset Size in Bytes*

Gets the size in bytes of each Dataset.

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and their total size in bytes as value

**Call Example**
    
    get_dataset_size()

---
*Get Dataset Distributors*

Gets the name and affiliation of the distributors of each Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and a list containing the name and affiliation of the distributors as value.

**Call Example**
    
    get_dataset_distributors()

---
*Get Dataset Total Views*

Gets the total views of all Datasets

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
      - No value [default]: Returns all the existing Dataset ids.
      - p: Returns published dataset ids.
      - d: Returns draft dataset ids.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and its total views as value.

**Call Example**
    
    get_dataset_total_views()

---
*Get Dataset Total Unique Views*

Gets the total unique views of all Datasets

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
      - No value [default]: Returns all the existing Dataset ids.
      - p: Returns published dataset ids.
      - d: Returns draft dataset ids.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and its total unique views as value.

**Call Example**
    
    get_dataset_total_unique_views()

---
*Get Dataset Total Downloads*

Gets the total downloads of all Datasets

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
      - No value [default]: Returns all the existing Dataset ids.
      - p: Returns published dataset ids.
      - d: Returns draft dataset ids.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and its total downloads as value.

**Call Example**
    
    get_dataset_total_downloads()

---
*Get Dataset Total Unique Downloads*

Gets the total unique downloads of all Datasets

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
      - No value [default]: Returns all the existing Dataset ids.
      - p: Returns published dataset ids.
      - d: Returns draft dataset ids.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and its total unique downloads as value.

**Call Example**
    
    get_dataset_total_unique_downloads()

---
*Get Dataset Total Citations*

Gets the total citations of all Datasets

- Input:
    - A filter indicating the type of dataset id to be gathered. The filter values are as follows:
      - No value [default]: Returns all the existing Dataset ids.
      - p: Returns published dataset ids.
      - d: Returns draft dataset ids.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and its total citations as value.

**Call Example**
    
    get_dataset_total_citations()

---
*Count Dataset by Subject to Month*

Returns a count of datasets filtered by subject, and up to a specified month $YYYY-DD in YYYY-MM format (e.g. 2018-01).

- Input:
    - A subject, e.g. Earth and Environmental Sciences.
    - YYYY, e.g. 2020.
    - MM, e.g. 12.
- Output: 
    - The number of datasets, filtered by subject, year and month. -1 if the subject is not found.

**Call Example**
    
    count_datasets_by_subject_to_month('Earth and Environmental Sciences', '2020', '12')

---
*Count Datasets by keyword*

Returns a count of datasets where a given keyword is present.

- Input:
    - A keyword, e.g. Titan.
- Output: 
    - The number of datasets, filtered by a keyword.

**Call Example**
    
    count_datasets_by_keyword('Titan')

---
*Count Datasets by File count*

Returns a count of datasets that have an equal or superior number of files, according to a provided file number.

- Input:
    - A given number of files to be used for comparison.
- Output: 
    - The number of datasets that meet the criteria set by the file count.

**Call Example**
    
    count_datasets_by_filecount('5')

---
*Count Dataset Versions*

Counts the number of versions associated with each existing Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and the number of existing versions as value.

**Call Example**
    
    count_dataset_versions()

---
*Count Dataset Draft Versions*

Counts the number of draft versions associated with each existing Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and the number of existing draft versions as value.

**Call Example**
    
    count_dataset_draft_versions()

## To Do

- Package main needs the cron module
- Create a database where harvested data can be stored
- Create a web interface for the harvested data



[Metrics]: http://guides.dataverse.org/en/latest/api/metrics.html
[Native]: https://guides.dataverse.org/en/latest/api/native-api.html
[Search]: https://guides.dataverse.org/en/latest/api/search.html
[Make Data Count]: https://guides.dataverse.org/en/latest/developers/make-data-count.html
[unittest]: https://docs.python.org/3/library/unittest.html#module-unittest
[Python]: https://www.python.org/
[cron]: https://en.wikipedia.org/wiki/Cron