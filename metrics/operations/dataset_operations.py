"""
Created on 18 Jan 2021

@author: Joao M. F. Cardoso
"""
from metrics.connection import dvconnection
import json


class DatasetOperations:
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse': 'dataverses', 'dataset': 'datasets', 'file': 'files', 'download': 'downloads'}
    rows = 10

    # Constructor
    def __init__(self, connection: dvconnection):
        self.dv_connection = connection

    # ==============================================================================================================================================
    # Utils methods

    # Get Dataset Metadata Field Item
    #    Gets the metadata field item associated with the provided type name
    # Input:
    #    typeName: A type name for a metadata field
    #    object: A dataset metadata object
    # Output:
    #    item: A metadata field item or None
    def get_metadata_field_item(self, typeName, metadata_object) -> object:
        # Runs fields to find the correct one
        for field in metadata_object['data']['citation']['fields']:
            if field['typeName'] == typeName:
                return field

        return None

# ==============================================================================================================================================
    # Dataset specific methods

    # Get all Dataset IDs
    #    Gets all of the Dataset Persistent IDs.
    # Input:
    # Output:
    #    ids: A list with all of the Dataset persistent IDs.
    def get_dataset_IDs(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        ids = []

        # Loop to compensate for the limitation in showing results
        while (condition):

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by keyword
            for dataset in objects['data']['items']:
                if (dataset['global_id'] not in ids):
                    ids.append(dataset['global_id'])

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return ids

    # Count Dataset By Subject to Month
    #    Returns a count of datasets filtered by subject, and up to a specified month $YYYY-DD in YYYY-MM format (e.g. 2018-01):
    # Input:
    #    subject: A subject, e.g. Earth and Environmental Sciences
    #    year: YYYY, e.g. 2020
    #    month: MM, e.g. 12
    # Output:
    #    count: The number of datasets, filtered by subject, year and month. -1 if the subject is not found.
    def count_datasets_by_subject_to_month(self, subject, year, month):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Create the request
        query_str = '/info/metrics/datasets/bySubject/toMonth/' + year + '-' + month
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))

        # Filter by subject
        for dv_object in objects['data']:
            if (dv_object['subject'] == subject):
                count = dv_object['count']
                return count

        return -1

    # Count Datasets By keyword
    #    Returns a count of datasets where a given keyword is present.
    # Input:
    #    keyword: A keyword, e.g. Titan
    # Output:
    #    count: The number of datasets, filtered by a keyword.
    def count_datasets_by_keyword(self, keyword):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        count = 0

        # Loop to compensate for the limitation in showing results
        while (condition):

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by keyword
            for dataset in objects['data']['items']:
                for dtkey in dataset['keywords']:
                    if (dtkey == keyword):
                        count += 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return count

    # Count Datasets By filecount
    #    Returns a count of datasets that have an equal or superior number of files, according to a provided file number.
    # Input:
    #    filecount: A given number of files to be used for comparison
    # Output:
    #    count: The number of datasets that meet the criteria set by the file count.
    def count_datasets_by_filecount(self, filecount):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        count = 0

        # Loop to compensate for the limitation in showing results
        while (condition):

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by filecount
            for dataset in objects['data']['items']:
                if (dataset['fileCount'] >= int(filecount)):
                    count += 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return count

    # Get All Dataset filecount
    #    Gets the number of files for each dataset
    # Input:
    # Output:
    #    dataset_filecount: A dictionary containing the global id's of the datasets and their respective file counts.
    def get_all_dataset_filecount(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        condition = True
        dataset_filecount = {}

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
                dataset_filecount[dataset['global_id']] = dataset['fileCount']

                # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return dataset_filecount

    # Get Dataset Size in Bytes
    #    Gets the size in bytes of each Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and their total size in bytes as value
    def get_dataset_size(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        total_results = ''
        size_bytes = 0
        condition = True
        dictionary = {}

        # Loop to compensate for the limitation in showing results
        while condition:
            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'file'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill dictionary
            for file in objects['data']['items']:
                if dictionary.get(file['dataset_persistent_id']) is None:
                    dictionary[file['dataset_persistent_id']] = file['size_in_bytes']
                else:
                    size_bytes = dictionary[file['dataset_persistent_id']]
                    dictionary[file['dataset_persistent_id']] = size_bytes + file['size_in_bytes']

                    # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return dictionary

    # Count Dataset Versions
    #    Gets the number of versions associated with each existing Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and the number of existing versions as value
    def count_dataset_versions(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_IDs()

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill dictionary
            if dictionary.get(dataset_id) is None and objects['status'] == 'OK':
                dictionary[dataset_id] = len(objects['data'])

        return dictionary

        # Count Dataset Draft Versions

    #    Gets the number of draft versions associated with each existing Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and the number of existing draft versions as value
    def count_dataset_draft_versions(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_IDs()

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:draft?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill dictionary
            if dictionary.get(dataset_id) is None and objects['status'] == 'OK':
                dictionary[dataset_id] = len(objects['data'])

        return dictionary

        # Get Dataset Distributors

    #    Gets the name and affiliation of the distributors of each Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and a list containing the name and affiliation of the distributors as value
    def get_dataset_distributors(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_IDs()

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill dictionary
            if dictionary.get(dataset_id) is None and objects['status'] == 'OK':
                field = self.get_metadata_field_item('distributor', objects)
                distributor = []
                if field is not None:

                    # Run distributors
                    for distr in field['value']:
                        distributorName = distr['distributorName']['value']
                        distributorAffiliation = None
                        if 'distributorAffiliation' in distr:
                            distributorAffiliation = distr['distributorAffiliation']['value']
                        distributor.append([distributorName, distributorAffiliation])

                dictionary[dataset_id] = distributor

        return dictionary