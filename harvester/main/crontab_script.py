"""
Created on 10 Fev 2021

@author: Joao M. F. Cardoso
"""

from crontab import CronTab

cron = CronTab(user='root')
job = cron.new(command='python harvest_trr170.py')
job.dow.on('SUN')
cron.write()
