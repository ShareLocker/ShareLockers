# ShareLockers

##MVP API:
Verb |	URL	| Action
-----|------|-------
GET	| /locker/{id} |	Lists details on locker (hub, row, column, owner)
POST|	/locker/{id} |	Opens locker, sets owner to current user
GET|	/profile/{id} |	Show user details
GET	| /hub/{id} |	Show a list of lockers at this hub and their owners and available actions (Open)
