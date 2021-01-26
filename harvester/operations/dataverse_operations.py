"""
Created on 18 Jan 2021

@author: Joao M. F. Cardoso
"""
from harvester.connection import dvconnection
from harvester.operations import dataset_operations
import json


class DataverseOperations:
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse': 'dataverses', 'dataset': 'datasets', 'file': 'files', 'download': 'downloads'}
    rows = 10

    # Constructor
    def __init__(self, connection: dvconnection):
        self.dv_connection = connection

    # ==============================================================================================================================================
    # Dataverse specific methods

    # Get Dataverse IDs
    #    Gets all the Dataverse Persistent IDs.
    # Input:
    # Output:
    #    ids: A list with all of the Dataverse persistent IDs.
    def get_dataverse_ids(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        ids = []

        # Add root dataverse. Id is always 1
        root_query_str = '/dataverses/1'
        request_root = dv_api.get_request(root_query_str, auth=True)
        root_dataverse = json.loads(request_root.content.decode('utf-8', 'ignore'))
        ids.append(root_dataverse['data']['alias'])

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataverse'}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by keyword
            for dataset in objects['data']['items']:
                if dataset['identifier'] not in ids:
                    ids.append(dataset['identifier'])

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return ids

    # Count Dataverse By Category
    #    Returns a count of Dataverses in dataverse for the provided category
    # Input:
    #    category: A category, e.g. Organization or Institution
    # Output:
    #    count: The number of dataverses, filtered by category. -1 if the category is not found.
    def count_dataverse_by_category(self, category):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Create the request
        query_str = '/info/metrics/dataverses/byCategory/'
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))

        # Filter by subject
        for dv_object in objects['data']:
            if dv_object['category'] == category:
                count = dv_object['count']
                return count

        return -1

    # Get All Dataverse Datasetcount
    #    Gets the number of datasets associated with each dataverse
    # Input:
    # Output:
    #    dataverse_datasetcount: A dictionary containing the names of the dataverses and their respective dataset counts
    def get_all_dataverse_datasetcount(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # create the variables
        dataverse_datasetcount = {}
        start_page = 0
        total_results = ''
        count = 0
        condition = True

        # Loop to compensate for the limitation in showing results
        while (condition):

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill the dictionary
            for dataset in objects['data']['items']:
                if dataverse_datasetcount.get(dataset['identifier_of_dataverse']) is None:
                    dataverse_datasetcount[dataset['identifier_of_dataverse']] = 1
                else:
                    count = dataverse_datasetcount[dataset['identifier_of_dataverse']]
                    dataverse_datasetcount[dataset['identifier_of_dataverse']] = count + 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return dataverse_datasetcount

    # Get Dataverse Size in Bytes
    #    Gets the size in bytes of each Dataverse
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataverse identifiers as keys, and their total size in bytes as value
    def get_dataverse_size(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        dictionary = {}
        size_bytes = 0

        # Get the byte size by dataset
        dataset_ops = dataset_operations.DatasetOperations(self.dv_connection)
        dataset_size = dataset_ops.get_dataset_size()

        # Loop to compensate for the limitation in showing results
        while (condition):

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # fill the dictionary
            for dataset in objects['data']['items']:
                if dictionary.get(dataset['identifier_of_dataverse']) is None:
                    size_bytes = dataset_size.get(dataset['global_id'])
                    dictionary[dataset['identifier_of_dataverse']] = size_bytes
                else:
                    size_bytes = dataset_size.get(dataset['global_id'])
                    dictionary[dataset['identifier_of_dataverse']] = size_bytes + dictionary.get(
                        dataset['identifier_of_dataverse'])

                    # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return dictionary
