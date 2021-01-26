"""
Created on 16 Dec 2020

@author: Joao M. F. Cardoso
"""
from harvester.connection import dvconnection
import json


class GeneralOperations:
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
    # General methods

    # count All
    #    Returns a count of provided objects in dataverse over all-time:
    # Input:
    #    dv_type: An object type, e.g. dataverse
    # Output: 
    #    count: The number of object listing from the provided type. -1 if object type is not valid.
    def count_all(self, dv_type):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # filter the dv_type
        object_type = self.dv_types.get(dv_type)
        if object_type is None:
            return -1

        # Create the request
        query_str = '/info/metrics/' + object_type
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))
        count = objects['data']['count']
        return count

    # Count to Month
    #    Returns a count of provided objects in dataverse up to a specified month YYYY DD in YYYY-MM format (e.g. 2020-12)
    # Input:
    #    dv_type: An object type, e.g. dataverse
    #    year: YYYY, e.g. 2020
    #    month: MM, e.g. 12
    # Output:
    #    count: The number of object listing from the provided type, filtered by year and month. -1 if object type is not valid.
    def count_to_month(self, dv_type, year, month):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # filter the dv_type
        object_type = self.dv_types.get(dv_type)
        if (object_type is None):
            return -1

        # Create the request
        query_str = '/info/metrics/' + object_type + '/toMonth/' + year + '-' + month
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))
        count = objects['data']['count']
        return count

    # Count By Days
    #    Returns a count of provided objects in dataverse for the past $days (e.g. 30)
    # Input:
    #    dv_type: An object type, e.g. dataverse
    #    days: DD, e.g. 20
    # Output: 
    #    count: The number of object listing from the provided type, filtered by days. -1 if object type is not valid.
    def count_by_days(self, dv_type, days):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # filter the dv_type
        object_type = self.dv_types.get(dv_type)
        if (object_type is None):
            return -1

        # Create the request
        query_str = '/info/metrics/' + object_type + '/pastDays/' + days
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))
        count = objects['data']['count']
        return count

    # Count By Subject
    #    Returns a count of provided objects in dataverse for the provided subject
    # Input:
    #    dv_type: An object type, i.e., dataverse or dataset
    #    subject: A subject, e.g. Earth and Environmental Sciences
    # Output: 
    #    count: The number of object listing from the provided type, filtered by subject. -1 if object type is not valid or subject not found.
    def count_by_subject(self, dv_type, subject):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # filter the dv_type
        object_type = self.dv_types.get(dv_type)
        if (object_type is None or object_type == 'files' or object_type == 'downloads'):
            return -1

        # Create the request
        query_str = '/info/metrics/' + object_type + '/bySubject/'
        request = dv_api.get_request(query_str)

        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))

        # Filter by subject
        for dv_object in objects['data']:
            if (dv_object['subject'] == subject):
                count = dv_object['count']
                return count

        return -1