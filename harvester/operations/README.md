# Harvester Operations

## Index

- [General Operations](#general-operations)
- [Dataverse Operations](#dataverse-operations)
- [Dataset Operations](#dataset-operations)
- [File Operations](#file-operations)
- [User Operations](#user-operations)


## General Operations

General operations focuses on operations that apply to all object types.

### List of operations
  
- [Count All](#count-all)
- [Count to Month](#count-to-month)
- [Count By Days](#count-by-days)
- [Count By Subject](#count-by-subject)

---
### Count All

Returns a count of a provided object over all-time.

- Input: 
    - An object type, e.g. dataverse, dataset, file.
- Output: 
    - The number of object listing from the provided type. -1 if object type is not valid.

**Call Example**

    count_all('dataverse')

---
### Count to Month

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
### Count By Days

Returns a count of provided objects in dataverse for the past $days (e.g. 30).

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - DD, e.g. 20.
- Output:
    - The number of object listing from the provided type, filtered by days. -1 if object type is not valid.

**Call Example**
    
    count_by_days('dataverse', '20')

---
### Count By Subject

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

___
___
## Dataverse Operations

Dataverse operations focuses on operations that solely apply to Dataverse objects types.

### List of operations
  
- [Get Dataverse IDs](#get-dataverse-ids)
- [Get All Dataverse Datasetcount](#get-all-dataverse-datasetcount)
- [Get Dataverse Size in Bytes](#get-dataverse-size-in-bytes)
- [Count Dataverse by Category](#count-dataverse-by-category)

---
### Get Dataverse IDs

Gets all the Dataverse Persistent IDs.

- Input:
    - None.
- Output: 
    - A list with all the Dataverse persistent IDs.

**Call Example**
    
    get_dataverse_ids()

---
### Get All Dataverse Datasetcount

Gets the number of datasets associated with each dataverse.

- Input:
    - None.
- Output: 
    - A dictionary containing the names of the dataverses and their respective dataset counts.

**Call Example**
    
    get_all_dataverse_datasetcount()

---
### Get Dataverse Size in Bytes

Gets the size in bytes of each Dataverse.

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataverse identifiers as keys, and their total size in bytes as value.

**Call Example**
    
    get_dataverse_size()

---
### Count Dataverse by Category

Counts the number of Dataverses for each existing category (dataverse type).

- Input:
    - None.
- Output: 
    - A dictionary, containing the category as key, and the number of dataverses with that category assigned as value.

**Call Example**
    
    count_dataverse_by_category()

___
___
## Dataset Operations

Dataset operations focuses on operations that solely apply to Dataset objects types.

### List of operations
  
- [Get Dataset IDs](#get-dataset-ids)
- [Get All Dataset File count](#get-all-dataset-file-count)
- [Get Dataset Size in Bytes](#get-dataset-size-in-bytes)
- [Get Dataset Distributors](#get-dataset-distributors)
- [Get Dataset Keywords](#get-dataset-keywords)
- [Get Dataset Subjects](#get-dataset-subjects)
- [Get Dataset Total Views](#get-dataset-total-views)
- [Get Dataset Total Unique Views](#get-dataset-total-unique-views)
- [Get Dataset Total Unique Downloads](#get-dataset-total-downloads)
- [Get Dataset Total Unique Downloads](#get-dataset-total-unique-downloads)
- [Get Dataset Total Citations](#get-dataset-total-citations)
- [Count Dataset by Subject to Month](#count-dataset-by-subject-to-month)
- [Count Datasets by Keyword](#count-datasets-by-keyword)
- [Count Datasets by File count](#count-datasets-by-file-count)
- [Count Dataset Versions](#count-dataset-versions)
- [Count Dataset Draft Versions](#count-dataset-draft-versions)

---
### Get Dataset IDs

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
### Get All Dataset File count

Gets the number of files for each dataset.

- Input:
    - None.
- Output: 
    - A dictionary containing the global id's of the datasets and their respective file counts.

**Call Example**
    
    get_all_dataset_filecount()

---
### Get Dataset Size in Bytes

Gets the size in bytes of each Dataset.

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and their total size in bytes as value

**Call Example**
    
    get_dataset_size()

---
### Get Dataset Distributors

Gets the name and affiliation of the distributors of each Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and a list containing the name and affiliation of the distributors as value.

**Call Example**
    
    get_dataset_distributors()

---
### Get Dataset Keywords

Returns pairs of keywords and the total number of datasets where they feature.

- Input:
    - A filter indicating the type of dataset id to be searched for keywords. The filter values are as follows:
      - No value [default]: Keywords from all the existing datasets.
      - p: Keywords from published datasets only.
      - d: Keywords from draft dataset only.
- Output: 
    - A dictionary containing keywords as keys, and the total number of datasets that hold that keyword, as value.

**Call Example**
    
    get_dataset_keywords('p')

---
### Get Dataset Subjects

Returns pairs of subject and the total number of datasets where they feature.

- Input:
    - A filter indicating the type of dataset id to be searched for subjects. The filter values are as follows:
      - No value [default]: Subjects from all the existing datasets.
      - p: Subjects from published datasets only.
      - d: Subjects from draft dataset only.
- Output: 
    - A dictionary containing subjects as keys, and the total number of datasets that hold that subject, as value.

**Call Example**
    
    get_dataset_subjects('p')

---
### Get Dataset Total Views

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
### Get Dataset Total Unique Views

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
### Get Dataset Total Downloads

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
### Get Dataset Total Unique Downloads

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
### Get Dataset Total Citations

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
### Count Dataset by Subject to Month

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
### Count Datasets by keyword

Returns a count of datasets where a given keyword is present.

- Input:
    - A keyword, e.g. Titan.
- Output: 
    - The number of datasets, filtered by a keyword.

**Call Example**
    
    count_datasets_by_keyword('Titan')

---
### Count Datasets by File count

Returns a count of datasets that have an equal or superior number of files, according to a provided file number.

- Input:
    - A given number of files to be used for comparison.
- Output: 
    - The number of datasets that meet the criteria set by the file count.

**Call Example**
    
    count_datasets_by_filecount('5')

---
### Count Dataset Versions

Counts the number of versions associated with each existing Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and the number of existing versions as value.

**Call Example**
    
    count_dataset_versions()

---
### Count Dataset Draft Versions

Counts the number of draft versions associated with each existing Dataset

- Input:
    - None.
- Output: 
    - A dictionary containing the Dataset identifiers as keys, and the number of existing draft versions as value.

**Call Example**
    
    count_dataset_draft_versions()

___
___
## File Operations

File operations focuses on operations that solely apply to File objects types.

### List of operations

- [Count Files by File Content Type](#count-files-by-file-content-type)
- [Count All Files by File Content Type](#count-all-files-by-file-content-type)

---
### Count Files by File Content Type

Counts the number of files of a given file content type

- Input:
    - A given file content type, e.g., text/tab-separated-values.
- Output: 
    - The number of files of a given file content type.

**Call Example**
    
    count_file_by_file_content_type('text/tab-separated-values')

---
### Count All Files By File Content Type

Counts the number of files per respective file content type.

- Input:
    - None.
- Output: 
    - A dictionary containing the file content types, and the number of files associated with each file content type.

**Call Example**
    
    count_all_files_by_file_content_type()

___
___
## User Operations

User operations focuses on operations that solely apply to user objects types.

### List of operations

- [Count All Users](#count-all-users)
- [Count Users Per Role](#count-users-per-role)
- [Count Users Per Affiliation](#count-users-per-affiliation)

---
### Count All Users

Counts the total number of users

- Input:
    - None.
- Output: 
    - The total number of users.

**Call Example**
    
    count_all_users()

---
### Count Users Per Role

Counts the total number of users per role.

- Input:
    - None.
- Output: 
    - A dictionary containing the role as key, and the number of users sharing that role as value.

**Call Example**
    
    count_users_per_role()

---
### Count Users Per Affiliation

Counts the total number of users per affiliation.

- Input:
    - None.
- Output: 
    - A dictionary containing the affiliation as key, and the number of users sharing that affiliation as value.

**Call Example**
    
    count_users_per_affiliation()