"""
Created on 18 Jan 2021

@author: Joao M. F. Cardoso
"""
from connection import dataverse_connection
import json


class FileOperations:
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse': 'dataverses', 'dataset': 'datasets', 'file': 'files', 'download': 'downloads'}
    rows = 10

    # Constructor
    def __init__(self, connection: dataverse_connection):
        self.dv_connection = connection

    # ==============================================================================================================================================
    # File specific methods

    # Count files by file content type
    #    Counts the number of files of a given file content type
    # Input:
    #    file_content_type: A given file content type, e.g., text/tab-separated-values
    # Output:
    #    count: The number of files of a given file content type.
    def count_file_by_file_content_type(self, file_content_type):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 0
        count = 0
        condition = True

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/search?q=*'
            params = {'start': str(start_page), 'type': 'file'}
            request = dv_api.get_request(query_str, params=params)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # Filter by file content type
            for file in objects['data']['items']:
                if file['file_content_type'] == file_content_type:
                    count += 1

                    # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return count

    # Count All Files By File Content Type
    #    Counts the number of files per file content type
    # Input:
    # Output:
    #    dictionary: A dictionary containing the file content types and the
    #    number of files associated with each file content type
    def count_all_files_by_file_content_type(self):
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
                if dictionary.get(file['file_content_type']) is None:
                    dictionary[file['file_content_type']] = 1
                else:
                    count = dictionary[file['file_content_type']]
                    dictionary[file['file_content_type']] = count + 1

                    # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results

        return dictionary
