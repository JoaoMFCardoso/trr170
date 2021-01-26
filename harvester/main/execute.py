'''
Created on 10 Dec 2020

@author: Joao M. F. Cardoso
'''
from harvester.connection import dvconnection
from harvester.operations import general_operations
from harvester.operations import dataset_operations
from harvester.operations import dataverse_operations
from harvester.operations import file_operations
from harvester.operations import user_operations
import configparser


# The main method.


def main():
    # Get the configurations from config.ini
    config = configparser.ConfigParser()
    config.read('../config.ini')
    
    base_url = config['TRR170_DV']['base_url']
    api_key = config['TRR170_DV']['api_key']
    
    trr177_connection = dvconnection.Connection(base_url, api_key)
   
    gen_ops = general_operations.GeneralOperations(trr177_connection)
    dataverse_ops = dataverse_operations.DataverseOperations(trr177_connection)
    dataset_ops = dataset_operations.DatasetOperations(trr177_connection)
    file_ops = file_operations.FileOperations(trr177_connection)
    user_ops = user_operations.UserOperations(trr177_connection)
    
    #Dataverse
    #r11 = dataverse_ops.get_dataverse_ids()

    #print('1all: ' + str(len(r11)) + " : " + str(r11))

    #Dataset
    #r21 = dataset_ops.get_dataset_ids()
    #r22 = dataset_ops.get_dataset_ids('p')
    #r23 = dataset_ops.get_dataset_ids('d')
    #r24 = dataset_ops.get_dataset_total_views()
    r25 = dataset_ops.get_dataset_total_views('p')
    #r26 = dataset_ops.get_dataset_total_views('d')
    #r27 = dataset_ops.get_dataset_total_unique_views()
    #r28 = dataset_ops.get_dataset_total_unique_views('p')
    #r29 = dataset_ops.get_dataset_total_unique_views('d')
    #r211 = dataset_ops.get_dataset_total_downloads('p')
    #r212 = dataset_ops.get_dataset_total_unique_downloads('p')
    #r213 = dataset_ops.get_dataset_total_citations('p')


    #print('2all: ' + str(len(r21)) + " : " + str(r21))
    #print('2pub: ' + str(len(r22)) + " : " + str(r22))
    #print('2dra: ' + str(len(r23)) + " : " + str(r23))
    #print('tvall: ' + str(len(r24)) + " : " + str(r24))
    print('tvpub: ' + str(len(r25)) + " : " + str(r25))
    #print('tvdra: ' + str(len(r26)) + " : " + str(r26))
    #print('tuvall: ' + str(len(r27)) + " : " + str(r27))
    #print('tuvpub: ' + str(len(r28)) + " : " + str(r28))
    #print('tuvdra: ' + str(len(r29)) + " : " + str(r29))
    #print('tdpub: ' + str(len(r211)) + " : " + str(r211))
    #print('tudpub: ' + str(len(r212)) + " : " + str(r212))
    #print('tcpub: ' + str(len(r213)) + " : " + str(r213))


if __name__ == '__main__':
    main()