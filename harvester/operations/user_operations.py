"""
Created on 18 Jan 2021

@author: Joao M. F. Cardoso
"""
from harvester.connection import dvconnection
import json


class UserOperations:
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse': 'dataverses', 'dataset': 'datasets', 'file': 'files', 'download': 'downloads'}
    rows = 10

    # Constructor
    def __init__(self, connection: dvconnection):
        self.dv_connection = connection

    # ==============================================================================================================================================
    # User specific methods

    # Count all users
    #    Counts the total number of users
    # Input:
    # Output:
    #    count: The total number of users
    def count_all_users(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Create the request
        query_str = '/admin/list-users'
        request = dv_api.get_request(query_str, auth=True)

        # JSON response
        objects = json.loads(request.content.decode('utf-8', 'ignore'))

        # Get the user count
        count = objects['data']['userCount']

        return count

    # Count Users Per Role
    #    Counts the total number of users per role.
    # Input:
    # Output:
    #    dictionary: A dictionary containing the role as key and the number of users sharing that role as value.
    def count_users_per_role(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 1
        dictionary = {}
        condition = True

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/admin/list-users'
            params = {'selectedPage': str(start_page)}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # fill the dictionary
            for user in objects['data']['users']:
                # Iterate roles list
                for role in user['roles'].split(', '):
                    # Some users have no role. Instead of having a '' role, we'll state that as 'No Role'
                    if not role:
                        role = 'No Role'

                    if dictionary.get(role) is None:
                        dictionary[role] = 1
                    else:
                        count = dictionary[role]
                        dictionary[role] = count + 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = objects['data']['pagination']['nextPageNumber']
            condition = objects['data']['pagination']['hasNextPageNumber']

        return dictionary

    # Count Users Per Affiliation
    #    Counts the total number of users per affiliation.
    # Input:
    # Output:
    #    dictionary: A dictionary containing the affiliation as key and the number
    #    of users sharing that affiliation as value.
    def count_users_per_affiliation(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()

        # Declare all variables
        start_page = 1
        dictionary = {}
        condition = True

        # Loop to compensate for the limitation in showing results
        while condition:

            # Create the request
            query_str = '/admin/list-users'
            params = {'selectedPage': str(start_page)}
            request = dv_api.get_request(query_str, params=params, auth=True)

            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))

            # fill the dictionary
            for user in objects['data']['users']:
                if user.get('affiliation'):
                    affiliation = user.get('affiliation')
                else:
                    affiliation = 'No Affiliation'

                # Some users have no affiliation. Instead of having a '' affiliation, we'll state that as 'No Affiliation'
                if not affiliation:
                    affiliation = 'No Affiliation'

                if dictionary.get(affiliation) is None:
                    dictionary[affiliation] = 1
                else:
                    count = dictionary[affiliation]
                    dictionary[affiliation] = count + 1

            # Update start_page and total_results to cover for the limitation in showing results
            start_page = objects['data']['pagination']['nextPageNumber']
            condition = objects['data']['pagination']['hasNextPageNumber']

        return dictionary