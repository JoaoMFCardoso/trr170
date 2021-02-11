# Database Methods

## Index

- [Database Schema](#database-schema)
- [Populate](#populate)
- [Utils](#utils)

---
---
## Database Schema

The metrics database comprises 9 tables:

- [affiliation](#affiliation)
- [categories](#categories)
- [content_type](#content_type)
- [dataverse](#dataverse)
- [dataset](#dataset)
- [keywords](#keywords)
- [roles](#roles)
- [subjects](#subjects)
- [totals](#totals)

### affiliation

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| affiliation   | The affiliation name        |
| n_users   | Total number of users associated with the affiliation        |
| ts   | Timestamp        |

### categories

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| category   | The category name        |
| n_dataverses   | Total number of dataverses associated with the category        |
| ts   | Timestamp        |

### content_type

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| content_type   | The content type name        |
| n_files   | Total number of files associated with the content type        |
| ts   | Timestamp        |

### dataverse

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| dataverse_id   | The dataverse persistent id       |
| n_datasets   | Total number of datasets associated with the dataverse        |
| n_size   | Total size in Bytes of the dataverse        |
| ts   | Timestamp        |

### dataset

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| dataset_id   | The dataset persistent id       |
| n_filecount   | Total number of files associated with the dataset        |
| n_size   | Total size in Bytes of the dataset        |
| n_versions   | Total number of versions of the dataset        |
| n_draft_versions   | Total number of draft versions of the dataset        |
| n_views   | Total number of views of the dataset        |
| n_unique_views   | Total number of unique views of the dataset        |
| n_downloads   | Total number of downloads of the dataset        |
| n_unique_downloads   | Total number of unique downloads of the dataset        |
| n_citations   | Total number of citations of the dataset        |
| ts   | Timestamp        |

### keywords

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| keyword   | The keyword name        |
| n_datasets   | Total number of datasets associated with the keyword        |
| ts   | Timestamp        |

### roles

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| role   | The role name        |
| n_users   | Total number of users associated with the role        |
| ts   | Timestamp        |

### subjects

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| subject   | The subject name        |
| n_datasets   | Total number of datasets associated with the subject        |
| ts   | Timestamp        |


### totals

| Column      | Description |
| ----------- | ----------- |
| id      | DB identifier       |
| n_dataverses   | Total number of dataverses |
| n_datasets   | Total number of datasets |
| n_files   | Total number of files |
| n_users   | Total number of users |
| ts   | Timestamp        |

---
---
## Populate

These methods harvest data from the dataverse instance and populate the metrics tables.

### List of methods
  
- [Populate Affiliation](#populate-affiliation)
- [Populate Categories](#populate-categories)
- [Populate Content_Type](#populate-content_type)
- [Populate Dataverse](#populate-dataverse)
- [Populate Dataset](#populate-dataset)
- [Populate Keywords](#populate-keywords)
- [Populate Roles](#populate-roles)
- [Populate Subjects](#populate-subjects)
- [Populate Totals](#populate-totals)

---
### Populate Affiliation

Populates the affiliation table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.

**Call Example**

    populate_affiliation()

---
### Populate Categories

Populates the categories table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_category()

---
### Populate Content_Type

Populates the content_type table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_content_type()

---
### Populate Dataverse

Populates the dataverse table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_dataverse()

---
### Populate Dataset

Populates the dataset table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_dataset()

---
### Populate Keywords

Populates the keywords table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_keywords()

---
### Populate Roles

Populates the roles table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_roles()

---
### Populate Subjects

Populates the subjects table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_subjects()

---
### Populate Totals

Populates the totals table with current data from the associated Dataverse instance.

- Input: 
    - None.
- Output: 
    - None.
  
**Call Example**
    
    populate_totals()

___
___
## Utils

User operations focuses on operations that solely apply to user objects types.

### List of methods

- [Execute Query](#execute-query)
- [Remove](#remove)
- [Get](#get)

---
### Execute Query

Executes a provided query with the provided values

- Input:
    -  sql_query: An SQL query.
    -  values: The values to be featured in the query.
- Output: 
    - result: The result of the query.

**Call Example**
    
    db_connection = database_connection.Connection('host', 'port', 'metrics', 'user', 'password')
    values = [1]
    sql_query = "SELECT * FROM affiliation WHERE id = %d;"
    execute_query(db_connection, sql_query, values)

---
### Remove

Removes a row by its database id.

- Input:
    - db_id: The database id for a database table row.
- Output: 
    - None.

**Call Example**
    
    db_connection = database_connection.Connection('host', 'port', 'metrics', 'user', 'password')
    remove(db_connection, affiliation, 1)

---
### Get

Gets a row by its database id.

- Input:
    - db_id: The database id for a database table row.
- Output: 
    - row: The database table row corresponding the id.

**Call Example**
    
    db_connection = database_connection.Connection('host', 'port', 'metrics', 'user', 'password')
    row = get(db_connection, affiliation, 1)