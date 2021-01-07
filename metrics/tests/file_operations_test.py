'''
Created on 7 Jan 2021

@author: Joao M. F. Cardoso
'''
import unittest
import configparser
from connection import dvconnection
from metrics import operations

class FileOperationsTest(unittest.TestCase):

    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
    
    ops = operations.Operations(trr177_connection)

    def test_count_all_file(self):
        count = self.ops.count_all('file')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_to_month_file(self):
        count = self.ops.count_to_month('file', '2020', '12')
        self.assertIs(type(count), int, 'Must return an int')
        
    def test_count_by_days_file(self):
        count = self.ops.count_by_days('file', '365')
        self.assertIs(type(count), int, 'Must return an int')
    
    def test_count_file_by_file_content_type(self):
        count = self.ops.count_file_by_file_content_type('text/tab-separated-values')
        self.assertIs(type(count), int, 'Must return an int')    
    
    def test_count_all_files_by_file_content_type(self):
        count = self.ops.count_all_files_by_file_content_type()
        self.assertIs(type(count), dict, 'Must return an dict')
        
    
if __name__ == "__main__":
    #import sys;sys.argv = ['', 'Test.testName']
    unittest.main()