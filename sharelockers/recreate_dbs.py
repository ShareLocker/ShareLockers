#from os import system
from subprocess import call

confirm = input('All database data/migrations will be delted. Are you sure you want to do this? [yN]')
if confirm == 'y':
    directories = ['api', 'hubs', 'items', 'lockers', 'profiles', 'transactions']
    for directory in directories:
        try:
            call(['mkdir', directory + '/migrations/'])
        except:
            pass
        call(['rm', '-rf', directory + '/migrations/*'])
    call(['mv', 'db.sqlite3', '../db-backup.sqlite3'])
    call(['python', 'manage.py', 'makemigrations'])
    call(['python', 'manage.py', 'migrate'])

    call(['python', 'manage.py', 'createsuperuser'])
