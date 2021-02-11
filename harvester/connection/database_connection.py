"""
Created on 26 Jan 2021

@author: Joao M. F. Cardoso
"""
import psycopg2


# A class to establish a connection to a given Database
class Connection:
    connection_parameters = {}

    def __init__(self, host, port, database, user, password):
        self.connection_parameters['host'] = host
        self.connection_parameters['port'] = port
        self.connection_parameters['dbname '] = database
        self.connection_parameters['user'] = user
        self.connection_parameters['password'] = password

    # Connects to a PostgreSQL Database
    def connect(self):
        """ Connect to the PostgreSQL database server """
        conn = None
        try:
            # connect to the PostgreSQL server
            conn = psycopg2.connect(**self.connection_parameters)
            # Returns the connection
            return conn

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
