'''
Created on 16 Dec 2020

@author: Joao M. F. Cardoso
'''
from connection import dvconnection
import json

class Operations:
    
    # Global variables
    dv_connection = ''
    dv_types = {'dataverse':'dataverses', 'dataset':'datasets', 'file':'files', 'download':'downloads'}
    rows = 10
    
    # Constructor
    def __init__(self, connection: dvconnection):
        self.dv_connection = connection
    
    #==============================================================================================================================================
    # Utils methods
    
    # Get Dataset Metadata Field Item
    #    Gets the metadata field item associated with the provided type name
    # Input:
    #    typeName: A type name for a metadata field
    #    object: A dataset metadata object
    # Output: 
    #    item: A metadata field item or None
    def get_metadata_field_item(self, typeName, metadata_object) -> object:
        #Runs fields to find the correct one
        for field in metadata_object['data']['citation']['fields']:
            if(field['typeName'] == typeName):
                return field
        
        return None
        
    
    #==============================================================================================================================================
    # Generic methods
    
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
        if(object_type is None):
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
        if(object_type is None):
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
        if(object_type is None):
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
        if(object_type is None or object_type == 'files' or object_type == 'downloads'):
            return -1
        
        # Create the request
        query_str = '/info/metrics/' + object_type + '/bySubject/'
        request = dv_api.get_request(query_str)
        
        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))
        
        # Filter by subject
        for dv_object in objects['data']:
            if(dv_object['subject'] == subject):
                count = dv_object['count'] 
                return count
            
        return -1
    
    #==============================================================================================================================================
    # Dataverse specific methods
    
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
            if(dv_object['category'] == category):
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
            params = {'start' : str(start_page), 'type' : 'dataset'}
            request = dv_api.get_request(query_str, params=params)
            
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
            
            # Fill the dictionary
            for dataset in objects['data']['items']:
                if(dataverse_datasetcount.get(dataset['identifier_of_dataverse']) is None):
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
        
        #Get the byte size by dataset
        dataset_size = self.get_dataset_size()
        
        # Loop to compensate for the limitation in showing results
        while (condition):
        
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'dataset'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # fill the dictionary
            for dataset in objects['data']['items']:
                if(dictionary.get(dataset['identifier_of_dataverse']) is None):
                    size_bytes = dataset_size.get(dataset['global_id'])
                    dictionary[dataset['identifier_of_dataverse']] = size_bytes
                else:
                    size_bytes = dataset_size.get(dataset['global_id'])
                    dictionary[dataset['identifier_of_dataverse']] = size_bytes + dictionary.get(dataset['identifier_of_dataverse'])    
            
            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results  
            
        return dictionary
    
    #==============================================================================================================================================
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
        ids =  []
        
        # Loop to compensate for the limitation in showing results
        while (condition):
        
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'dataset'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Filter by keyword
            for dataset in objects['data']['items']:
                if(dataset['global_id'] not in ids):
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
        query_str = '/info/metrics/datasets/bySubject/toMonth/'  + year + '-' + month
        request = dv_api.get_request(query_str)
        
        # JSON response
        objects = json.loads(request.content.decode('utf8').replace("'", '"'))
        
        # Filter by subject
        for dv_object in objects['data']:
            if(dv_object['subject'] == subject):
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
        count =  0
        
        # Loop to compensate for the limitation in showing results
        while (condition):
        
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'dataset'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Filter by keyword
            for dataset in objects['data']['items']:
                for dtkey in dataset['keywords']:
                    if(dtkey == keyword):
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
        count =  0
        
        # Loop to compensate for the limitation in showing results
        while (condition):
        
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'dataset'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Filter by filecount
            for dataset in objects['data']['items']:
                if(dataset['fileCount'] >= int(filecount)):
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
            params = {'start' : str(start_page), 'type' : 'dataset'}
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
        while (condition):
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'file'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Fill dictionary
            for file in objects['data']['items']:
                if(dictionary.get(file['dataset_persistent_id']) is None):
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
        
        #Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/?'
            params = {'persistentId' : str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Fill dictionary
            if(dictionary.get(dataset_id) is None and objects['status'] == 'OK'):
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
        
        #Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:draft?'
            params = {'persistentId' : str(dataset_id)}
            request = dv_api.get_request(query_str, params=params, auth=True)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
            
            # Fill dictionary
            if(dictionary.get(dataset_id) is None and objects['status'] == 'OK'):
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
        
        #Run the Dataset IDs array
        for dataset_id in dataset_ids:
            # Create the request
            query_str = '/datasets/:persistentId/versions/:latest/metadata?'
            params = {'persistentId' : str(dataset_id)}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Fill dictionary
            if(dictionary.get(dataset_id) is None and objects['status'] == 'OK'):
                field = self.get_metadata_field_item('distributor', objects)
                distributor = []
                if(field is not None):
                    
                    #Run distributors
                    for distr in field['value']:
                        distributorName = distr['distributorName']['value']
                        distributorAffiliation = None
                        if('distributorAffiliation' in distr):
                            distributorAffiliation = distr['distributorAffiliation']['value']
                        distributor.append([distributorName, distributorAffiliation])

                dictionary[dataset_id] = distributor
            
        return dictionary
    
    #==============================================================================================================================================
    # File specific methods
    
    # Count files by file content type
    #    Gets the number of files of a given file content type
    # Input:
    #    file_content_type: A given file content type, e.g., text/tab-separated-values
    # Output: 
    #    count: The number of files of a given file content type.
    def count_file_by_file_content_type(self, file_content_type):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()   
        
        # Declare all variables
        start_page = 0
        total_results = ''
        count = 0
        condition = True
        
        # Loop to compensate for the limitation in showing results
        while (condition):
            
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'file'}
            request = dv_api.get_request(query_str, params=params)
            
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
            
            # Filter by file content type
            for file in objects['data']['items']:
                if(file['file_content_type'] == file_content_type):
                    count += 1    
                     
            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results
   
        return count

    # Count Files By File Content Type
    #    Counts the number of files per file content type
    # Input:
    # Output: 
    #    dictionary: A dictionary containing the file content types and the number of files associated with each file content type
    def count_all_files_by_file_content_type(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()   
        
        # Declare all variables
        start_page = 0
        total_results = ''
        count = 0
        condition = True
        dictionary = {}
        
        # Loop to compensate for the limitation in showing results
        while (condition):
            # Create the request
            query_str = '/search?q=*'
            params = {'start' : str(start_page), 'type' : 'file'}
            request = dv_api.get_request(query_str, params=params)
        
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
        
            # Fill dictionary
            for file in objects['data']['items']:
                if(dictionary.get(file['file_content_type']) is None):
                    dictionary[file['file_content_type']] = 1
                else:
                    count = dictionary[file['file_content_type']]
                    dictionary[file['file_content_type']] = count + 1   
            
            # Update start_page and total_results to cover for the limitation in showing results
            start_page = start_page + self.rows
            total_results = objects['data']['total_count']
            condition = start_page < total_results  
            
        return dictionary
    
    #==============================================================================================================================================
    # User specific methods
    
    # Count all users
    #    Gets the total number of users
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
    #    Gets the total number of users per role
    # Input:
    # Output: 
    #    dictionary: A dictionary containing the role as key and the number of users sharing that role as value
    def count_users_per_role(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()   
       
        # Declare all variables
        start_page = 1
        dictionary = {}
        condition = True
        
        # Loop to compensate for the limitation in showing results
        while (condition):
            
            # Create the request
            query_str = '/admin/list-users' 
            params = {'selectedPage' : str(start_page)}
            request = dv_api.get_request(query_str, params=params, auth=True)
            
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
            
            # fill the dictionary
            for user in objects['data']['users']:
                # Iterate roles list
                for role in user['roles'].split(', '):
                    #Some users have no role. Instead of having a '' role, we'll state that as 'No Role'
                    if(not role):
                        role = 'No Role'
                    
                    if(dictionary.get(role) is None):
                        dictionary[role] = 1
                    else:
                        count = dictionary[role]
                        dictionary[role] = count + 1
                     
            # Update start_page and total_results to cover for the limitation in showing results
            start_page = objects['data']['pagination']['nextPageNumber']
            condition = objects['data']['pagination']['hasNextPageNumber']
   
        return dictionary
    
    # Count Users Per Affiliation
    #    Gets the total number of users per affiliation
    # Input:
    # Output: 
    #    dictionary: A dictionary containing the affiliation as key and the number of users sharing that affiliation as value
    def count_users_per_affiliation(self):
        # Connect to the Dataverse API
        dv_api = self.dv_connection.connect()   
       
        # Declare all variables
        start_page = 1
        dictionary = {}
        condition = True
        
        # Loop to compensate for the limitation in showing results
        while (condition):
            
            # Create the request
            query_str = '/admin/list-users' 
            params = {'selectedPage' : str(start_page)}
            request = dv_api.get_request(query_str, params=params, auth=True)
            
            # JSON response
            objects = json.loads(request.content.decode('utf-8', 'ignore'))
            
            # fill the dictionary
            for user in objects['data']['users']:
                if(user.get('affiliation')):
                    affiliation = user.get('affiliation')
                else:
                    affiliation = 'No Affiliation'
                    
                #Some users have no affiliation. Instead of having a '' affiliation, we'll state that as 'No Affiliation'
                if(not affiliation):
                    affiliation = 'No Affiliation'
                    
                if(dictionary.get(affiliation) is None):
                    dictionary[affiliation] = 1
                else:
                    count = dictionary[affiliation]
                    dictionary[affiliation] = count + 1
                     
            # Update start_page and total_results to cover for the limitation in showing results
            start_page = objects['data']['pagination']['nextPageNumber']
            condition = objects['data']['pagination']['hasNextPageNumber']
   
        return dictionary