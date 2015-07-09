from django.db import models
from profiles.models import Profile


class Location(models.Model):
    description = models.CharField(max_length=255)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    host = models.ForeignKey(Profile, null=True, related_name="managed_location")
    residents = models.ManyToManyField(Profile, related_name="nearby_location", related_query_name="nearby_locations")


    def __str__(self):
        return self.description

class Hub(models.Model):
    name = models.CharField(max_length=255)
    location = models.ForeignKey(Location)
    secret_key = models.CharField(max_length=255, db_index=True)
    occupied = models.BooleanField(default=False)
    ip = models.CharField(null=True, max_length=255, db_index=True)

    waiting = models.BooleanField(default=False)
    waiting_row = models.IntegerField(default=1)
    waiting_col = models.IntegerField(default=1)

    def __str__(self):
        return self.name

    def open(self, col, row):
        from requests.packages import urllib3
        http = urllib3.PoolManager()
        astr = 'http://' + self.ip + '/?V='+str(col)+str(row)
        r = http.request('GET', astr)
        print(astr)
        self.occupied = True
        self.save()

    def poll_open(self, col, row):
        print("open request made through polling")
        self.waiting = True
        self.waiting_row = row
        self.waiting_col = col
        self.save() # do nothing until Arduino calls
