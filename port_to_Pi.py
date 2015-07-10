secret = '2'
ip = 'http://127.0.0.1:8000'
connect = ip + '/hubs/connected/' + secret
poll = ip + '/hubs/poll/' + secret
finished = ip + '/hubs/finished/' + secret

resp = requests.get(poll); resp.text
action, column, row = tuple(char for char in resp.text)[:3]
action, column, row

def poll_status():
    resp = requests.get(poll); resp.text
    action, column, row = tuple(char for char in resp.text)[:3]
    return action, column, row

def open_locker(column, row):
    print('Opening {}-{}'.format(column, row))
    print('Waiting 2s for motor')
    time.sleep(2)

for _ in range(2):
    action, column, row = poll_status()
    if action == '?':
        open_locker(column, row)
    time.sleep(1)
