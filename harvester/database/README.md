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

### categories

### content_type

### dataverse

### dataset

### keywords

### roles

### subjects

### totals

---
---
## Populate

General operations focuses on operations that apply to all object types.

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

Returns a count of a provided object over all-time.

- Input: 
    - An object type, e.g. dataverse, dataset, file.
- Output: 
    - The number of object listing from the provided type. -1 if object type is not valid.

**Call Example**

    count_all('dataverse')

---
### Populate Categories

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
### Populate Content_Type

Returns a count of provided objects in dataverse for the past $days (e.g. 30).

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - DD, e.g. 20.
- Output:
    - The number of object listing from the provided type, filtered by days. -1 if object type is not valid.

**Call Example**
    
    count_by_days('dataverse', '20')

---
### Populate Dataverse

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

---
### Populate Dataset

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

---
### Populate Keywords

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

---
### Populate Roles

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

---
### Populate Subjects

Returns a count of provided objects in dataverse for the provided subject.

- Input:
    - An object type, e.g. dataverse, dataset, file.
    - A subject, e.g. Earth and Environmental Sciences.
- Output:
    - The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.

**Call Example**
    
    count_by_subject('Earth and Environmental Sciences')

---
### Populate Totals

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
## Utils

User operations focuses on operations that solely apply to user objects types.

### List of methods

- [Execute Query](#execute-query)
- [Remove](#remove)
- [Get](#get)

---
### Execute Query

Counts the total number of users

- Input:
    - None.
- Output: 
    - The total number of users.

**Call Example**
    
    count_all_users()

---
### Remove

Counts the total number of users per role.

- Input:
    - None.
- Output: 
    - A dictionary containing the role as key, and the number of users sharing that role as value.

**Call Example**
    
    count_users_per_role()

---
### Get

Counts the total number of users per affiliation.

- Input:
    - None.
- Output: 
    - A dictionary containing the affiliation as key, and the number of users sharing that affiliation as value.

**Call Example**
    
    count_users_per_affiliation()