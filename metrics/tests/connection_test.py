"""
Created on 7 Jan 2021

@author: Joao M. F. Cardoso
"""
import unittest
import configparser
from metrics.connection import dvconnection


class ConnectionTest(unittest.TestCase):

    def test_connection_to_TRR170_DV(self):
        # Get the configurations from config.ini
        config = configparser.ConfigParser()
        config.read('../config.ini')

        base_url = config['TRR170_DV']['base_url']
        api_key = config['TRR170_DV']['api_key']

        trr177_connection = dvconnection.Connection(base_url, api_key)
        trr177_api = trr177_connection.connect()

        self.assertEqual(trr177_api.status, 'OK', 'Connection with the TRR170 Dataverse establishing correctly')


if __name__ == "__main__":
    unittest.main()
