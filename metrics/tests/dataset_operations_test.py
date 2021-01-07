'''
Created on 7 Jan 2021

@author: Joao M. F. Cardoso
'''
import unittest
import configparser
from connection import dvconnection
from metrics import operations

class DatasetOperationsTest(unittest.TestCase):

    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
    
    ops = operations.Operations(trr177_connection)

    def test_count_all_dataset(self):
        count = self.ops.count_all('dataset')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_to_month_dataset(self):
        count = self.ops.count_to_month('dataset', '2020', '12')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_by_days_dataset(self):
        count = self.ops.count_by_days('dataset', '365')
        self.assertIs(type(count), int, 'Must return an int')

    def test_count_by_subject_dataset(self):
        count = self.ops.count_by_subject('dataset', 'Earth and Environmental Sciences')
        self.assertIs(type(count), int, 'Must return an int')    
    
    def test_get_dataset_ids(self):
        count = self.ops.get_dataset_IDs()
        self.assertIs(type(count), list, 'Must return an List')    
    
    def test_count_datasets_by_subject_to_month(self):
        count = self.ops.count_datasets_by_subject_to_month('Earth and Environmental Sciences', '2020', '12')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_datasets_by_keyword(self):
        count = self.ops.count_datasets_by_keyword('Titan')
        self.assertIs(type(count), int, 'Must return an int')  
        
    def test_count_datasets_by_filecount(self):
        count = self.ops.count_datasets_by_filecount('2')
        self.assertIs(type(count), int, 'Must return an int') 
    
    def test_get_all_datasets_filecount(self):
        count = self.ops.get_all_dataset_filecount()
        self.assertIs(type(count), dict, 'Must return an dict')
        
    def test_get_size_dataset(self):
        count = self.ops.get_dataset_size()
        self.assertIs(type(count), dict, 'Must return a dict')  
    
    def test_count_dataset_versions(self):
        count = self.ops.count_dataset_versions()
        self.assertIs(type(count), dict, 'Must return a dict')
    
    def test_count_dataset_draft_versions(self):
        count = self.ops.count_dataset_draft_versions()
        self.assertIs(type(count), dict, 'Must return a dict')
          
    def test_get_dataset_distributors(self):
        count = self.ops.get_dataset_distributors()
        self.assertIs(type(count), dict, 'Must return a dict')
    
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()