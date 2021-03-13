"""
Created on 26 Jan 2021

@author: Joao M. F. Cardoso
"""
import psycopg2
import mysql.connector


# A class to establish a connection to a given Database
class Connection:
    host = None
    port = None
    database = None
    user = None
    password = None

    def __init__(self, host, port, database, user, password):
        self.host = host
        self.port = port
        self.database = database
        self.user = user
        self.password = password

    # Connects to a PostgreSQL Database
    def __connect_postgresql(self):
        """ Connect to the PostgreSQL database server """
        conn = None
        try:
            # connect to the PostgreSQL server
            connection_parameters = "host={} port={} dbname={} user={} password={}".format(self.host, self.port,
                                                                                           self.database, self.user,
                                                                                           self.password)
            conn = psycopg2.connect(connection_parameters)
            # Returns the connection
            return conn

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    # Connects to a MySQL Database
    def __connect_mysql(self):
        """ Connect to the MySQL database server """
        conn = None
        # Connection Parameters
        config = {'user': self.user, 'password': self.password, 'host': self.host, 'port': self.port, 'database': self.database}

        conn = mysql.connector.connect(**config)
        # Returns the connection
        return conn

    def connect(self):
        conn = None
        if self.port != '3306':
            conn = self.__connect_postgresql()
        else:
            conn = self.__connect_mysql()

        return conn
