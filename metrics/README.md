# Dataverse Metrics Interface and Server

## Index

- [Introduction](#introduction)
- [Installation](#installation)
- [Structure](#structure)
- [To Do](#to-do)

---
---
## Introduction

The Dataverse Metrics Interface and Server aims to make use of the metrics database that is
created and populated by the Dataverse Metrics Harvester.

It uses the [JavaScript] programming language, and is supported by the [Node js] runtime environment.
The metrics database is implemented using [PostgreSQL].


## Requirements

- Node Js
- PostgreSQL

---
---
## Structure

The Dataverse Metrics Interface and Server is structured according to the following scheme.

```
├── server
│   └── app
│       ├── config
│       ├── controllers
│       ├── models
│       └── routes
└──interface
    ├── public
    └── src
        ├── actions
        ├── components
        ├── images
        ├── reducers
        ├── services
        ├── styles
        └── utils
```

### Interface

The interface makes use of the [React]
JavaScript library for building a user interfaces to display metrics.

### Server

The server implements a [RESTful API] that allows interaction with the metrics database. 

---
---
## Installation and Execution

### Get the code

Clone the repo:

    git clone https://github.com/JoaoMFCardoso/trr170.git

### Create Database

The first step is to create the metrics database.

Follow the PostgreSQL [tutorial] on database creation, and create the 'metrics' database.

Then configure the command below to create the necessary tables using the 'metrics_db_sql' file.
- -U user_name - The -U flag is used to specify the user role that will execute the script. This option can be omited if this option’s username is the first parameter. The default username is the system’s current username, if one has not been explicitly specified.
- -h server_ip - The -h flag is for the remote host or domain IP address where the PostgreSQL server is running. Use 127.0.0.1 for a localhost server.
- -d database_name — The -d option is used for the database name.
- -f /some/path/my_script_name.sql — The -f option will instruct psql to execute the file. This is arguably the most critical of all the options.

```
psql -U <user_name> -h <server_ip> -d <database_name> -f trr170/harvester/database/metrics_db_sql.sql
```

The metrics database should now have all the necessary tables and fields (they can be populated using the harverster module).

### Server Configuration and Execution

Now that the database has been configured, you need to configure the Server.

1. Database Configuration

Edit the 'db.config.js' file, and add the appropriate database configurations by editing the file with any editor of your choosing. The file is located under the 'controllers' directory. 

```
trr170/metrics/server/app/controllers/db.config.js

```
You should edit the following 4 fields.

- `HOST`: The host for a Database installation (default: localhost).
- `PORT`: The port where the database is running (default: dialect default).
- `USER`: The database username.
- `PASSWORD`: The user password.
- `DB`: The database name should be *metrics*.
- `dialect` : The database dialect. (currently supported: 'mysql', 'sqlite', 'postgres', 'mssql')
- `pool` : pool configuration used to pool database connections.

**db.config.js example**
```
module.exports = {
    HOST: "localhost",
    PORT: "1234",
    USER: "fancy_user",
    PASSWORD: "fancy_password",
    DB: "metrics",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
```

2. Endpoint Configuration

Edit the 'server.js' file, and specify the endpoint for the API.

```
trr170/metrics/server/server.js

```

Both the origin and the port need to be configured appropriately. 
In the example below the listening port is port 8080 from the localhost, whilst the origin is defined as "http://localhost:8081". These values will be relevant during the interface configuration.

**server.js example**
```
...
var corsOptions = {
    origin: "http://localhost:8081"
};
...
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
```

3. Install Dependencies.

To do so, run the npm install command in the root directory of the server.

```
cd trr170/metrics/server
npm install

```

4. Running the Server

To run the server you need to execute the 'server.js' file

```
cd trr170/metrics/server
node server.js
```

### Interface Configuration and Execution

Having the database and the server running we can now configure and run the metrics interface.

1. Base URL

The first step is to define the base URL in the 'http-common.js' file to the desired base URL. In the example below the base url is set to run in a localhost running in port 1234, which matches the listening port defined in the endpoint configuration of server.js.

It is important to note that any base URL that you choose must be inserted in the following format: <base_URL>/api.

**http-common.js example**
```
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:1234/api",
    headers: {
        "Content-type": "application/json"
    }
});
```

2. Endpoint Port

The next step is to change the port number in the '.env' file. The selected port number must match the one previously defined in the 'server.js' file.

**server.js example**
```
...
var corsOptions = {
    origin: "http://localhost:8081"
};
...
```

**.env example**
```
PORT=8081
```

3. Install Dependencies.

To do so, run the npm install command in the root directory of the interface.

```
cd trr170/metrics/interface
npm install

```

4. Running the interface

As the interface is a [React] app you should follow the official [deployment tutorial].

For development purposes, you can type the following command to launch the interface localy:

```
cd trr170/metrics/interface
npm start
```

This will launch the interface localy.

[RESTful API]: https://restfulapi.net/
[React]: https://reactjs.org/
[Node js]: https://nodejs.org/en/
[JavaScript]: https://www.javascript.com/
[PostgreSQL]: https://www.postgresql.org/
[tutorial]: https://www.postgresql.org/docs/12/tutorial-createdb.html
[deployment tutorial]: https://create-react-app.dev/docs/deployment/