from django.db import models
from profiles.models import Profile


class Location(models.Model):
    description = models.CharField(max_length=255)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    host = models.ForeignKey(Profile, null=True, related_name="managed_location")
    residents = models.ManyToManyField(Profile, related_name="nearby_location", related_query_name="nearby_locations")


class Hub(models.Model):
    name = models.CharField(max_length=255)
    location = models.ForeignKey(Location)
    secret_key = models.CharField(max_length=255, db_index=True)
    occupied = models.BooleanField(default=False)
    ip = models.CharField(null=True, max_length=255, db_index=True)
