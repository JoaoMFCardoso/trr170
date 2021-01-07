'''
Created on 7 Jan 2021

@author: Joao M. F. Cardoso
'''
import unittest
import configparser
from connection import dvconnection
from metrics import operations

class UserOperationsTest(unittest.TestCase):

    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
    
    ops = operations.Operations(trr177_connection)

    def test_count_all_users(self):
        count = self.ops.count_all_users()
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_users_per_role(self):
        count = self.ops.count_users_per_role()
        self.assertIs(type(count), dict, 'Must return a dict')
        
    def test_count_users_per_affiliation(self):
        count = self.ops.count_users_per_affiliation()
        self.assertIs(type(count), dict, 'Must return a dict')
        
    
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()