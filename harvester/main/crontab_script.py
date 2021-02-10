"""
Created on 10 Fev 2021

@author: Joao M. F. Cardoso
"""

from crontab import CronTab

cron = CronTab(tab="""* * * * * command""")
job = cron.new(command='python harvest_trr170.py')
cron.write()

for result in cron.run_scheduler():
    print("This was printed to stdout by the process.")


