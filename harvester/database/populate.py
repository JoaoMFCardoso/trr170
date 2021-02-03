"""
Created on 27 Jan 2021

@author: Joao M. F. Cardoso
"""


from harvester.connection import dataverse_connection, database_connection
from harvester.operations import dataverse_operations, dataset_operations, user_operations, file_operations
from harvester.database import utils
from datetime import datetime


class Populate:
    # Global variables
    dv_connection = None
    db_connection = None
    ts = None

    # Constructor
    # Creates a Populate instance.
    # Input:
    #   dvc: Dataverse connection.
    #   dvb: Database connection.
    def __init__(self, dvc: dataverse_connection, dbc: database_connection):
        self.dv_connection = dvc
        self.db_connection = dbc
        self.ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # METHODS=======================================================================================================================================

    # Populate Dataverse
    # Populates the Dataverse table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_dataverse(self):
        # Creating the SQL query for the insertion.
        sql = "INSERT INTO dataverse(dataverse_id, #datasets, #size, ts) VALUES(%s, %d, %d, %s);"

        # Harvesting
        print("Harvesting dataverse metrics...")
        dataverse_ops = dataverse_operations.DataverseOperations(self.dv_connection)

        dataverse_datasetcount = dataverse_ops.get_all_dataverse_datasetcount()
        dataverse_size = dataverse_ops.get_dataverse_size()
        print('Dataverse metrics harvested.')

        # Run dataverses and get the values
        for dataverse in dataverse_datasetcount:
            values = [dataverse, int(dataverse_datasetcount[dataverse]), int(dataverse_size[dataverse]), self.ts]

            # Execute query with harvested values
            utils.execute_query(self.db_connection, sql, values)

    # Populate Category
    # Populates the Category table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_category(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO category(category, #dataverses, ts) VALUES(%s, %d, %s);"""

        # Harvesting
        print('Harvesting category metrics...')
        dataverse_ops = dataverse_operations.DataverseOperations(self.dv_connection)

        dataverse_categories = dataverse_ops.count_dataverse_by_category()
        print('category metrics harvested.')

        # Run affiliations and get the total number of users
        for category in dataverse_categories:
            total_dataverses = int(dataverse_categories[category])
            values = [category, total_dataverses, self.ts]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Dataset
    # Populates the Dataset table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_dataset(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO dataset(dataset_id, #filecount, #size, #versions,
            #draft_versions, #views, #unique_views, #downloads, #unique_downloads,
            #citations, ts) VALUES(%s, %d, %d, $d, %d, %d, $d, %d, %d, $d, %s);"""

        # Harvesting
        print('Harvesting dataset metrics...')
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)

        all_dataset_filecount = dataset_ops.get_all_dataset_filecount()
        dataset_size = dataset_ops.get_dataset_size()
        dataset_versions = dataset_ops.count_dataset_versions()
        dataset_draft_versions = dataset_ops.count_dataset_draft_versions()
        dataset_views = dataset_ops.get_dataset_total_views()
        dataset_unique_views = dataset_ops.get_dataset_total_unique_views()
        dataset_downloads = dataset_ops.get_dataset_total_downloads()
        dataset_unique_downloads = dataset_ops.get_dataset_total_unique_downloads()
        dataset_citations = dataset_ops.get_dataset_total_citations()
        print('Dataset metrics harvested.')

        # Run datasets and get the values
        for dataset in all_dataset_filecount:
            filecount = int(all_dataset_filecount[dataset])
            size = int(dataset_size[dataset])
            versions = int(dataset_versions[dataset])
            draft_versions = 0
            if dataset in dataset_draft_versions:
                draft_versions = int(dataset_draft_versions[dataset])
            views = int(dataset_views[dataset])
            unique_views = int(dataset_unique_views[dataset])
            downloads = int(dataset_downloads[dataset])
            unique_downloads = int(dataset_unique_downloads[dataset])
            citations = int(dataset_citations[dataset])

            values = [dataset, filecount, size, versions, draft_versions,
                      views, unique_views, downloads, unique_downloads,
                      citations, self.ts]

            # execute the INSERT statement
            utils.execute_query(self.db_connection, sql, values)

    # Populate Affiliation
    # Populates the Affiliation table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_affiliation(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO affiliation(affiliation, #users, ts) VALUES(%s, %d, %s);"""

        # Harvesting
        print('Harvesting affiliation metrics...')
        user_ops = user_operations.UserOperations(self.dv_connection)

        users_per_affiliation = user_ops.count_users_per_affiliation()
        print('affiliation metrics harvested.')

        # Run affiliations and get the total number of users
        for affiliation in users_per_affiliation:
            total_users = int(users_per_affiliation[affiliation])
            values = [affiliation, total_users, self.ts]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Content Type
    # Populates the content_type table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_content_type(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO content_type(content_type, #files, ts) VALUES(%s, %d, %s);"""

        # Harvesting
        print('Harvesting content type metrics...')
        file_ops = file_operations.FileOperations(self.dv_connection)

        files_content_type = file_ops.count_all_files_by_file_content_type()
        print('content type metrics harvested.')

        # Run affiliations and get the total number of users
        for content_type in files_content_type:
            total_files = int(files_content_type[content_type])
            values = [content_type, total_files, self.ts]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Keywords
    # Populates the keywords table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_keywords(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO keywords(keyword, #datasets, ts) VALUES(%s, %d, %s);"""

        # Harvesting
        print('Harvesting keyword metrics...')
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)

        keywords = dataset_ops.get_total_datasets_per_keyword()
        print('keyword metrics harvested.')

        # Run affiliations and get the total number of users
        for keyword in keywords:
            total_datasets = int(keywords[keyword])
            values = [keyword, total_datasets, self.ts]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)