# ShareLockers

##MVP API:
Verb |	URL	        | Action
-----|--------------|-------
GET	| /lockers/{id}  |	Lists details on locker (hub, row, column, owner)
POST| /lockers/{id}  |	Opens locker, sets owner to current user
GET|  /profiles/{id} |	Show user details
GET	| /hubs/{id}     |	Show a list of lockers at this hub and their owners and available actions (Open)

##Other endpoints:
Verb |	URL	        | Action
-----|--------------|-------
GET	| /lockers/     | Lists my lockers (for current user)
GET | /profiles/    | List registered profiles
POST| /lockers/     | Create a new locker


