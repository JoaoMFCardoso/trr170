'''
Created on 9 Dec 2020

@author: Joao M. F. Cardoso
'''
from pyDataverse.api import Api

# A class to establish a connection to a given Dataverse
class Connection:
    base_url = ''
    api_token = ''
    
    def __init__(self, b, a):
        self.base_url = b
        self.api_token = a

# The connection function. 
# It receives an instance of the Connection class.
# Returns a connection to a Dataverse API
    def connect(self):
        dataverse_api = Api(self.base_url, self.api_token)
        return dataverse_api