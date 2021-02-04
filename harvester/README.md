# Dataverse Metrics Harvester

## Index

- [Introduction](#introduction)
- [Installation](#installation)
- [Structure](#structure)
- [To Do](#to-do)

---
---
## Introduction

The Dataverse Metrics Harvester allows for the extraction of multiple metrics from multiple Dataverse installations. Harvested metrics can subsequently be stored in a Database for posterior visualization. 

It makes use of the Dataverse [Metrics], [Native], [Search] APIs, and the [Make Data Count] feature.

It uses the [Python] programming language, and the Database integration uses [PostgreSQL].


## Requirements

- Python 3
- PostgreSQL

---
---
## Installation

### Get the code

Clone the repo:

    git clone https://github.com/JoaoMFCardoso/trr170.git

Change to the directory you just created by cloning the repo:

    cd trr170


### Configuration

Edit `config.ini` to reflect both your Dataverse and Database installation.

- `[dataverse_instalation]`: The designator of a Dataverse installation (e.g., TEST_DV).
- `base_url`: The base url for a Dataverse installation (e.g., https://demo.dataverse.org/).
- `api_key`: The API key for a Dataverse installation (e.g., a123b123-c123-1234-d222-e123f123g123).


- `[database_instalation]`: The designator of a Database installation (e.g., TEST_DB).
- `host`: The host for a Database installation (e.g., localhost or server IP address.).
- `port`: The port for the Database installation (e.g., in PostgreSQL the default port is 5432)
- `database`: The database name should be *metrics*.
- `user`: The database username.
- `password`: The user password.

**Example**
```
[TEST_DV]
base_url = https://demo.dataverse.org
api_key = a123b123-c123-1234-d222-e123f123g123

[TEST_DB]
host = localhost
port = 5432
database = metrics
user = fancy_username
password = fancy&secure_password
```

### Running the Cron Scripts

TODO

    python execute.py

To update your metrics periodically, you'll want to queue up a shell script in some flavor of [cron][].

Here's an [example shell script]() to get you started.

On a Red Hat or CentOS system, you might drop a file like [update_metrics.cron]() into /etc/cron.d/ to update on a specified schedule.

---
---
## Structure

The Dataverse Harvester is structured according to 4 python packages.

```
├── main
├── connection 
├── database
├── operations
└── tests 
```

### Main

The Main package holds the cron scripts that use the operations to populate the database tables.

### Connection

The Connection package holds classes to establish connections to both Dataverse instances and the Database.

### Database

Population methods to populate the Database with harvested data. The population methods are detailed in the [database package] of this repository.

### Operations

The operations package contains methods to harvest metadata from the Dataverse instance. The methods for each of the five types of operations are detailed in the [operations package] of this repository.

### Tests

The Tests package holds test modules for all the other packages. The testing modules use the [unittest] unit testing framework.

---
---
## To Do

- Package main needs the cron module
- Create a database where harvested data can be stored
- Create a web interface for the harvested data
- test descriptions



[Metrics]: http://guides.dataverse.org/en/latest/api/metrics.html
[Native]: https://guides.dataverse.org/en/latest/api/native-api.html
[Search]: https://guides.dataverse.org/en/latest/api/search.html
[Make Data Count]: https://guides.dataverse.org/en/latest/developers/make-data-count.html
[unittest]: https://docs.python.org/3/library/unittest.html#module-unittest
[Python]: https://www.python.org/
[PostgreSQL]: https://www.postgresql.org/
[cron]: https://en.wikipedia.org/wiki/Cron
[operations package]: https://github.com/JoaoMFCardoso/trr170/blob/master/harvester/operations
[database package]: https://github.com/JoaoMFCardoso/trr170/blob/master/harvester/database