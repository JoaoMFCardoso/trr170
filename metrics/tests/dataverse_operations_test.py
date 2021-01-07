'''
Created on 7 Jan 2021

@author: Joao M. F. Cardoso
'''
import unittest
import configparser
from connection import dvconnection
from metrics import operations

class DataverseOperationsTest(unittest.TestCase):

    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
    
    ops = operations.Operations(trr177_connection)

    def test_count_all_dataverse(self):
        count = self.ops.count_all('dataverse')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_to_month_dataverse(self):
        count = self.ops.count_to_month('dataverse', '2020', '12')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_by_days_dataverse(self):
        count = self.ops.count_by_days('dataverse', '365')
        self.assertIs(type(count), int, 'Must return an int')

    def test_count_by_subject_dataverse(self):
        count = self.ops.count_by_subject('dataverse', 'Earth and Environmental Sciences')
        self.assertIs(type(count), int, 'Must return an int')    
    
    def test_count_by_category_dataverse(self):
        count = self.ops.count_dataverse_by_category('Organization')
        self.assertIs(type(count), int, 'Must return an int')    
    
    def test_count_by_datasetcount_dataverse(self):
        count = self.ops.get_all_dataverse_datasetcount()
        self.assertIs(type(count), dict, 'Must return a dict')
        
    def test_get_size_dataverse(self):
        count = self.ops.get_dataverse_size()
        self.assertIs(type(count), dict, 'Must return a dict')  
        
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()