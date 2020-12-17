'''
Created on 10 Dec 2020

@author: Joao M. F. Cardoso
'''
from connection import dvconnection
import configparser
import json
import requests
from urllib import request
from metrics import operations

# The main method.
def main():
    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
   
    ops = operations.Operations(trr177_connection)
    
    #r1 = ops.count_file_by_file_content_type('application/matlab-mat')
    #r2 = ops.count_all_files_by_file_content_type()
    #r3 = ops.get_all_dataset_filecount()
    #r4 = ops.count_datasets_by_filecount(1)
    #r5 = ops.count_datasets_by_keyword('Titan')
    #r6 = ops.get_all_dataverse_datasetcount()
    #r7 = ops.get_dataset_size()
    #r8 = ops.get_dataverse_size()
    #r9 = ops.count_all_users()
    #r10 = ops.count_users_per_role()
    r11 = ops.count_users_per_affiliation()
    
    #print(r1)
    #print(r2)
    #print(r3)
    #print(r4)
    #print(r5)
    #print(r6)
    #print(r7)
    #print(r8)
    #print(r9)
    #print(r10)
    print(r11)


if __name__ == '__main__':
    main()