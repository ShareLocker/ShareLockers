#ShareLockers API v0.3
(under active development)

##API Endpoints
####Key:
(_emphasized items are not yet implemented_)

(XX Items surrounded by X's should not be allowed/used XX)

**NOTE: All Endpoint URLs are prefixed with /api**


Verb	|	URL	|	Action
---	|	---	|	---
GET	|	/owneditems	|	Show a list of my items and links to their individual pages, including nested objects with full item details
POST	|	/owneditems	|	Create a new item I can sell
GET	|	/owneditems/{id}	|	Show details on given item, including id, what actions are allowed (buy/sell/open), creation time, title/desc/price, owner, locker, and _transaction history (filtered to current user_)
DELETE	|	/owneditems/{id}	|	Delete item from system (_but leave all related transactions intact_)
PUT	|	/owneditems/{id}	|	Update item information (logs an Update transaction), **including stocking or restocking to/from a locker**
GET	|	/profiles	|	List user profiles
POST	|	/profiles	|	Create a new profile (requires existing user without profile)
GET	|	/profiles/{id}	|	Show user details (profile id, user id, user rating, description, alias/display name)
PUT	|	/profiles/{id}	|	Update profile information
DELETE	|	/profiles/{id}	|	Delete user (_leave transaction history_)
GET	|	/hubs	|	Show a list of all hubs, including full nested hub detail info _optionally filterable by proximity or user’s location list_
POST	|	/hubs	|	Create a new hub with relevant details (_not currently used, but should eventually replace the non-API version in use_)
GET	|	/hubs/{id}	|	Show hub details plus a list of lockers at this hub and with full nested detail view, including contents (item_set) and available actions (Buy, Sell, Open)
PUT	|	/hubs/{id}	|	Update hub info (_must be hub owner_)
DELETE	|	/hubs/{id}	|	Delete a hub (_must be hub owner_)
GET	|	/lockers	|	Get list of all lockers with full nested detail view, including contents (item_set) and available actions (Buy, Sell, Open)
POST	|	/lockers	|	Create a new locker (_must be hub owner_)
GET	|	/lockers/{id}	|	Get locker detail view, including contents (item_set) and available actions (Buy, Sell, Open)
PUT	|	/lockers/{id}	|	Update a  locker (_must be hub owner_)
DELETE	|	/lockers/{id}	|	Delete a locker (_must be hub owner_)
GET	|	/purchases	|	List my purchases
POST	|	/purchases	|	Try to buy an item (provide item # _Some locker logic not yet implemented_
GET	|	/purchases/{id}	|	Get purchase detail view
XXPUTXX	|	XX/purchases/{id}XX	|	XXUpdate purchase info (_must be purchase owner_)XX
XXDELETEXX	|	XX/purchases/{id}XX	|	XXDelete a purchase (_if owner_)XX
GET	|	/unlocks	|	List _my_ unlocks, _but may also want to see unlocks by others related to my items…_
POST	|	/unlocks	|	Try to unlock an item (provide item #, **must set waiting=True)
GET	|	/unlocks/{id}	|	Get unlock detail view
XXPUTXX	|	XX/unlocks/{id}XX	|	XXUpdate unlock info (_must be owner_)XX
XXDELETEXX	|	XX/unlocks/{id}XX	|	XXDelete an unlock (_if owner_)XX
