"""
Created on 27 Jan 2021

@author: Joao M. F. Cardoso
"""


from connection import dataverse_connection, database_connection
from operations import dataverse_operations, dataset_operations, user_operations, file_operations, general_operations
from database import utils
from datetime import datetime


class Populate:
    # Global variables
    dv_connection = None
    db_connection = None
    createdAt = None

    # Constructor
    # Creates a Populate instance.
    # Input:
    #   dvc: Dataverse connection.
    #   dvb: Database connection.
    def __init__(self, dvc: dataverse_connection, dbc: database_connection):
        self.dv_connection = dvc
        self.db_connection = dbc
        self.createdAt = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # METHODS=======================================================================================================================================

    # Populate Dataverse
    # Populates the Dataverse table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_dataverse(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO dataverses(dataverse_id, n_datasets, n_size, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s, %s);"""

        # Harvesting
        dataverse_ops = dataverse_operations.DataverseOperations(self.dv_connection)

        dataverse_datasetcount = dataverse_ops.get_all_dataverse_datasetcount()
        dataverse_size = dataverse_ops.get_dataverse_size()

        # Run dataverses and get the values
        for dataverse in dataverse_datasetcount:
            values = [dataverse, int(dataverse_datasetcount[dataverse]), int(dataverse_size[dataverse]), self.createdAt, self.createdAt]

            # Execute query with harvested values
            utils.execute_query(self.db_connection, sql, values)

    # Populate Category
    # Populates the Category table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_category(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO categories(category, n_dataverses, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        dataverse_ops = dataverse_operations.DataverseOperations(self.dv_connection)

        dataverse_categories = dataverse_ops.count_dataverse_by_category()

        # Run affiliations and get the total number of users
        for category in dataverse_categories:
            total_dataverses = int(dataverse_categories[category])
            values = [category, total_dataverses, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Dataset
    # Populates the Dataset table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_dataset(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO datasets(dataset_id, topic, n_filecount, n_size, n_versions,
            n_draft_versions, n_views, n_unique_views, n_downloads, n_unique_downloads,
            n_citations, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""

        # Harvesting
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)

        all_dataset_filecount = dataset_ops.get_all_dataset_filecount()
        print("     Dataset Filecount ... DONE")
        dataset_size = dataset_ops.get_dataset_size()
        print("     Dataset Size ... DONE")
        dataset_versions = dataset_ops.count_dataset_versions()
        print("     Dataset Versions ... DONE")
        dataset_draft_versions = dataset_ops.count_dataset_draft_versions()
        print("     Dataset Draft Versions ... DONE")
        dataset_views = dataset_ops.get_dataset_total_views()
        print("     Dataset Total Views ... DONE")
        dataset_unique_views = dataset_ops.get_dataset_total_unique_views()
        print("     Dataset Total Unique Views ... DONE")
        dataset_downloads = dataset_ops.get_dataset_total_downloads()
        print("     Dataset Total Downloads ... DONE")
        dataset_unique_downloads = dataset_ops.get_dataset_total_unique_downloads()
        print("     Dataset Total Unique Downloads ... DONE")
        dataset_citations = dataset_ops.get_dataset_total_citations()
        print("     Dataset Total Citations ... DONE")
        topics = dataset_ops.get_dataset_topic_classification()
        print("     Dataset Topic Classification ... DONE")
        # distributors = dataset_ops.get_dataset_distributors()

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
            topic = topics[dataset]

            values = [dataset, topic, filecount, size, versions, draft_versions,
                      views, unique_views, downloads, unique_downloads,
                      citations, self.createdAt, self.createdAt]

            # execute the INSERT statement
            utils.execute_query(self.db_connection, sql, values)

    # Populate Affiliation
    # Populates the Affiliation table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_affiliation(self):
        # Creating the SQL query for the insertion.
        sql = "INSERT INTO affiliations(affiliation, n_users, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"

        # Harvesting
        user_ops = user_operations.UserOperations(self.dv_connection)

        users_per_affiliation = user_ops.count_users_per_affiliation()

        # Run affiliations and get the total number of users
        for affiliation in users_per_affiliation:
            total_users = int(users_per_affiliation[affiliation])
            values = [affiliation, total_users, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Content Type
    # Populates the content_type table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_content_type(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO content_types(content_type, n_files, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        file_ops = file_operations.FileOperations(self.dv_connection)

        files_content_type = file_ops.count_all_files_by_file_content_type()

        # Run content types and get the total number of files
        for content_type in files_content_type:
            total_files = int(files_content_type[content_type])
            values = [content_type, total_files, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Keywords
    # Populates the keywords table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_keywords(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO keywords(keyword, n_datasets, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)

        keywords = dataset_ops.get_dataset_keywords()

        # Run keywords and get the total number of datasets
        for keyword in keywords:
            total_datasets = int(keywords[keyword])
            values = [keyword, total_datasets, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Roles
    # Populates the roles table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_roles(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO roles(role, n_users, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        user_ops = user_operations.UserOperations(self.dv_connection)

        roles = user_ops.count_users_per_role()

        # Run roles and get the total number of users
        for role in roles:
            total_users = int(roles[role])
            values = [role, total_users, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Subjects
    # Populates the subjects table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_subjects(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO subjects(subject, n_datasets, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)
        subjects = dataset_ops.get_dataset_subjects()

        # Run subjects and get the total number of datasets
        for subject in subjects:
            total_datasets = int(subjects[subject])
            values = [subject, total_datasets, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Topics
    # Populates the topics table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_topics(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO topics(topic, n_datasets, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s);"""

        # Harvesting
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)

        topics = dataset_ops.count_dataset_topic_classification()

        # Run topics and get the total number of datasets
        for topic in topics:
            total_datasets = int(topics[topic])
            values = [topic, total_datasets, self.createdAt, self.createdAt]

            # Execute query
            utils.execute_query(self.db_connection, sql, values)

    # Populate Totals
    # Populates the totals table with current data from the associated Dataverse instance.
    # Input: None
    # Output: None
    def populate_totals(self):
        # Creating the SQL query for the insertion.
        sql = """INSERT INTO totals(n_dataverses, n_datasets, n_files, n_users, \"createdAt\", \"updatedAt\") VALUES(%s, %s, %s, %s, %s, %s);"""

        # Harvesting
        general_ops = general_operations.GeneralOperations(self.dv_connection)
        user_ops = user_operations.UserOperations(self.dv_connection)

        total_dataverses = general_ops.count_all('dataverse')
        total_datasets = general_ops.count_all('dataset')
        total_files = general_ops.count_all('file')
        total_users = user_ops.count_all_users()

        # Execute query
        values = [total_dataverses, total_datasets, total_files, total_users, self.createdAt, self.createdAt]
        utils.execute_query(self.db_connection, sql, values)



