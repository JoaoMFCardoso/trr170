"""
Created on 02 Fev 2021

@author: Joao M. F. Cardoso
"""
import psycopg2


# METHODS=======================================================================================================================================

# Execute query
# Executes a provided query with the provided values
# Input:
#   sql_query: An SQL query.
#   values: The values to be featured in the query.
# Output:
#   result: The result of the query.
def execute_query(db_connection, sql_query, values):
    conn = None
    result = None
    try:
        # connect to the PostgreSQL database, and create a new cursor.
        conn = db_connection.connect()
        cur = conn.cursor()

        # execute the INSERT statement
        result = cur.execute(sql_query, values)

        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return result


# Remove by database id
# Removes a row by its database id.
# Input:
#   db_id: The database id for a database table row.
# Output: None
def remove(db_connection, table_name, db_id):
    # Creating the SQL query for the deletion.
    sql = "DELETE FROM " + table_name + " WHERE id = %d;"

    # Executing the query
    execute_query(db_connection, sql, db_id)


# Get by database id
# Gets a row by its database id.
# Input:
#   db_id: The database id for a database table row.
# Output:
#   row: The database table row corresponding the id.
def get(db_connection, table_name, db_id):
    # Creating the SQL query for the deletion.
    sql = "SELECT * FROM " + table_name + " WHERE id = %d ORDER BY ts;"

    # Executing the query
    row = execute_query(db_connection, sql, db_id)

    return row
