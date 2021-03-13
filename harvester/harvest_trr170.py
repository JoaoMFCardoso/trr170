"""
Created on 10 Fev 2021

@author: Joao M. F. Cardoso
"""

from harvester.connection import dataverse_connection, database_connection
from harvester.database import populate
import configparser

# Get the configurations from config.ini
config = configparser.ConfigParser()
config.read('./config.ini')

# Dataverse
print("Getting Dataverse configurations ...")
base_url = config['TRR170_DV']['base_url']
api_key = config['TRR170_DV']['api_key']
print("Getting Dataverse configurations ... DONE")

# Database
print("Getting Database configurations ...")
host = config['TEST_DB']['host']
port = config['TEST_DB']['port']
database = config['TEST_DB']['database']
user = config['TEST_DB']['user']
password = config['TEST_DB']['password']
print("Getting Dataverse configurations ... DONE")

# Establishing the connections
print("Establishing Dataverse connection ...")
trr177_connection = dataverse_connection.Connection(base_url, api_key)
print("Establishing Dataverse connection ... DONE")
print("Establishing Database connection ...")
db_connection = database_connection.Connection(host, port, database, user, password)
print("Establishing Database connection ... DONE")

# Populating the tables
condition = True
if condition:
    print("Populating the Database tables ...")
    dv_pp = populate.Populate(trr177_connection, db_connection)

    print("Populating affiliation table ...")
    dv_pp.populate_affiliation()
    print("Populating affiliation table ... DONE")
    print("Populating dataset table ...")
    dv_pp.populate_dataset()
    print("Populating dataset table ... DONE")
    print("Populating roles table ...")
    dv_pp.populate_roles()
    print("Populating roles table ... DONE")
    print("Populating totals table ...")
    dv_pp.populate_totals()
    print("Populating totals table ... DONE")
    print("Populating category table ...")
    dv_pp.populate_category()
    print("Populating category table ... DONE")
    print("Populating dataverse table ...")
    dv_pp.populate_dataverse()
    print("Populating dataverse table ... DONE")
    print("Populating content_type table ...")
    dv_pp.populate_content_type()
    print("Populating content_type table ... DONE")
    print("Populating keywords table ...")
    dv_pp.populate_keywords()
    print("Populating keywords table ... DONE")
    print("Populating topics table ...")
    dv_pp.populate_topics()
    print("Populating topics table ... DONE")
    print("Populating subjects table ...")
    dv_pp.populate_subjects()
    print("Populating subjects table ... DONE")

    print("Populating the Database tables ... DONE")

