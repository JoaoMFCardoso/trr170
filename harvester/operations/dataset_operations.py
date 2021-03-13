"""
Created on 18 Jan 2021

@author: Joao M. F. Cardoso
"""

from harvester.connection import dataverse_connection
import json


class DatasetOperations:
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse': 'dataverses', 'dataset': 'datasets', 'file': 'files', 'download': 'downloads'}
    rows = 10

    # Constructor
    def __init__(self, connection: dataverse_connection):
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
    @staticmethod
    def get_metadata_field_item(typeName, metadata_object) -> object:
        # Runs fields to find the correct one
        for field in metadata_object['data']['citation']['fields']:
            if field['typeName'] == typeName:
                return field

        return None

    # Get the flag value
    #    Gets the correct flag value based on its input
    # Input:
    #    flag: A get_dataset_ids flag
    # Output:
    #    value: RELEASED if flag is p, DRAFT if flag is d.
    @staticmethod
    def get_flag_value(flag) -> str:
        return {
            'p': 'RELEASED',
            'd': 'DRAFT'
        }.get(flag, '')

    # This method is private.
    # Get Make Data Count Metric
    # Input:
    #   metric: The metric to be retrieved.
    #   flag: The flag to be searched
    # Output:
    #   dictionary: A dictionary containing the dataset persistent ids as key and the metric as value.
    def __get_make_data_count_metric(self, metric, flag) -> dict:
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids(flag)

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/makeDataCount/' + metric + '?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Fill dictionary
            total_views = 0
            if dictionary.get(dataset_id) is None and objects['status'] == 'OK' and metric in objects['data']:
                total_views = objects['data'][metric]

            dictionary[dataset_id] = total_views

        return dictionary

    # ==============================================================================================================================================
    # Dataset specific methods

    # Get Dataset IDs
    #    Gets the Dataset Persistent IDs in accordance to a provided filter.
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns all of the existing Dataset ids.
    #       p: Returns published dataset ids.
    #       d: Returns draft dataset ids.
    # Output:
    #    ids: A list with all of the Dataset persistent IDs.
    def get_dataset_ids(self, flag=''):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        #  Gets the correct flag value
        flag = self.get_flag_value(flag)

        #  Declare all variables
        start_page = 0
        condition = True
        ids = []

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by keyword
            for dataset in objects['data']['items']:
                if dataset['global_id'] not in ids and dataset['versionState'] == flag:
                    ids.append(dataset['global_id'])
                else:
                    if flag == '':
                        ids.append(dataset['global_id'])

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return ids

    # Count Dataset By Subject to Month
    #    Returns a count of datasets filtered by subject, and up to a specified
    #   month $YYYY-DD in YYYY-MM format (e.g. 2018-01).
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
            if dv_object['subject'] == subject:
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
        condition = True
        count = 0

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by keyword
            for dataset in objects['data']['items']:
                for dtkey in dataset['keywords']:
                    if dtkey == keyword:
                        count += 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return count

    # Count Datasets By filecount
    #    Returns a count of datasets that have an equal or superior number of files,
    #    according to a provided file number.
    # Input:
    #    filecount: A given number of files to be used for comparison
    # Output:
    #    count: The number of datasets that meet the criteria set by the file count.
    def count_datasets_by_filecount(self, filecount):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        condition = True
        count = 0

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'dataset'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by filecount
            for dataset in objects['data']['items']:
                if dataset['fileCount'] >= int(filecount):
                    count += 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return count

    # Count Dataset Topic Classification
    #    Returns pairs of topics of classification and the total number of datasets where they feature.
    # Input:
    #    flag: A filter indicating the type of dataset id to be searched for subjects.
    #       No Value (default):  Subjects from all of the existing datasets.
    #       p: Subjects from published datasets only.
    #       d: Subjects from draft dataset only.
    # Output:
    #   dictionary: A dictionary containing topics of classification as keys, and the total number of datasets
    # as value.
    def count_dataset_topic_classification(self, flag=''):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        #  Gets the correct flag value
        flag = self.get_flag_value(flag)

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids(flag)

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Get the topic classification metadata block
            if objects['status'] == 'OK':
                field = self.get_metadata_field_item('topicClassification', objects)

                # Check if the subject metadata block exists.
                if field is not None:
                    # Run topic value metadata block
                    for topics in field['value']:
                        if 'topicClassValue' in topics:
                            topic = topics['topicClassValue']['value']
                            if dictionary.get(topic) is None:
                                dictionary[topic] = 1
                            else:
                                count = dictionary[topic]
                                dictionary[topic] = count + 1

        return dictionary

    # Count Dataset Versions
    #    Counts the number of versions associated with each existing Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys,
    #    and the number of existing versions as value
    def count_dataset_versions(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids()

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
    #    dictionary: A dictionary containing the Dataset identifiers as keys,
    #    and the number of existing draft versions as value
    def count_dataset_draft_versions(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids()

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

    # Get Dataset Keywords
    #    Returns pairs of keywords and the total number of datasets where they feature.
    # Input:
    #    flag: A filter indicating the type of dataset id to be searched for keywords.
    #       No Value (default):  Keywords from all of the existing datasets.
    #       p: Keywords from published datasets only.
    #       d: Keywords from draft dataset only.
    # Output:
    #   dictionary: A dictionary containing keywords as keys, and the total number of datasets
    # that hold that keyword as value.
    def get_dataset_keywords(self, flag=''):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        #  Gets the correct flag value
        flag = self.get_flag_value(flag)

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids(flag)

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Get the Keywords metadata block
            if objects['status'] == 'OK':
                field = self.get_metadata_field_item('keyword', objects)

                # Check if the keyword metadata block exists.
                if field is not None:
                    # Run keyword metadata block
                    for keywords in field['value']:
                        if 'keywordValue' in keywords:
                            keyword = keywords['keywordValue']['value']
                            if dictionary.get(keyword) is None:
                                dictionary[keyword] = 1
                            else:
                                count = dictionary[keyword]
                                dictionary[keyword] = count + 1

        return dictionary

    # Get Dataset Subjects
    #    Returns pairs of subject and the total number of datasets where they feature.
    # Input:
    #    flag: A filter indicating the type of dataset id to be searched for subjects.
    #       No Value (default):  Subjects from all of the existing datasets.
    #       p: Subjects from published datasets only.
    #       d: Subjects from draft dataset only.
    # Output:
    #   dictionary: A dictionary containing subjects as keys, and the total number of datasets
    # that hold that subject as value.
    def get_dataset_subjects(self, flag=''):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        #  Gets the correct flag value
        flag = self.get_flag_value(flag)

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids(flag)

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Get the Keywords metadata block
            if objects['status'] == 'OK':
                field = self.get_metadata_field_item('subject', objects)

                # Check if the subject metadata block exists.
                if field is not None:
                    # Run subject metadata block
                    for subject in field['value']:
                        if dictionary.get(subject) is None:
                            dictionary[subject] = 1
                        else:
                            count = dictionary[subject]
                            dictionary[subject] = count + 1

        return dictionary

    # Get Datasets by Topic Classification
    #    Returns pairs of topics of classification and the list of datasets where they feature.
    # Input:
    #    flag: A filter indicating the type of dataset id to be searched for subjects.
    #       No Value (default):  Subjects from all of the existing datasets.
    #       p: Subjects from published datasets only.
    #       d: Subjects from draft dataset only.
    # Output:
    #   dictionary: A dictionary containing topics of classification as keys,
    #   and a list of persistent dataset ids as value
    def get_dataset_topic_classification(self, flag=''):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        #  Gets the correct flag value
        flag = self.get_flag_value(flag)

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids(flag)

        # Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId': str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Get the Keywords metadata block
            if objects['status'] == 'OK':
                field = self.get_metadata_field_item('topicClassification', objects)

                # Check if the subject metadata block exists.
                if field is not None:
                    # Run topic value metadata block
                    for topics in field['value']:
                        if 'topicClassValue' in topics:
                            topic = topics['topicClassValue']['value']
                            if dictionary.get(dataset_id) is None:
                                dictionary[dataset_id] = topic
        return dictionary

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
        condition = True
        dataset_filecount = {}

        # Loop to compensate for the limitation in showing results
        while condition:

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

    # Get Dataset Distributors
    #    Gets the name and affiliation of the distributors of each Dataset
    # Input:
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys,
    #    and a list containing the name and affiliation of the distributors as value
    def get_dataset_distributors(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        dictionary = {}
        dataset_ids = self.get_dataset_ids()

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

    # Get Dataset Total Views
    #    Gets the total views of all Datasets
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns total views for all of the existing datasets.
    #       p: Returns total views for published datasets.
    #       d: Returns total views for draft datasets.
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and its total views as value
    def get_dataset_total_views(self, flag=''):

        dictionary = self.__get_make_data_count_metric('viewsTotal', flag)

        return dictionary

    # Get Dataset Total Views
    #    Gets the total views of all Datasets
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns total views for all of the existing datasets.
    #       p: Returns total views for published datasets.
    #       d: Returns total views for draft datasets.
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and its total unique views as value
    def get_dataset_total_unique_views(self, flag=''):

        dictionary = self.__get_make_data_count_metric('viewsUnique', flag)

        return dictionary

    # Get Dataset Total Downloads
    #    Gets the total Downloads of all Datasets
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns total views for all of the existing datasets.
    #       p: Returns total views for published datasets.
    #       d: Returns total views for draft datasets.
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and its total downloads as value
    def get_dataset_total_downloads(self, flag=''):
        dictionary = self.__get_make_data_count_metric('downloadsTotal', flag)

        return dictionary

    # Get Dataset Total Unique Downloads
    #    Gets the total views of all Datasets
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns total views for all of the existing datasets.
    #       p: Returns total views for published datasets.
    #       d: Returns total views for draft datasets.
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and its total unique downloads as value
    def get_dataset_total_unique_downloads(self, flag=''):
        dictionary = self.__get_make_data_count_metric('downloadsUnique', flag)

        return dictionary

    # Get Dataset Total Citations
    #    Gets the total citations of all Datasets
    # Input:
    #    flag: A filter indicating the type of dataset id to be gathered.
    #       No Value (default):  Returns total views for all of the existing datasets.
    #       p: Returns total views for published datasets.
    #       d: Returns total views for draft datasets.
    # Output:
    #    dictionary: A dictionary containing the Dataset identifiers as keys, and its total citations as value
    def get_dataset_total_citations(self, flag=''):
        dictionary = self.__get_make_data_count_metric('citations', flag)

        return dictionary
