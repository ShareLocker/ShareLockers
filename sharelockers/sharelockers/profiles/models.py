from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User)
    rating = models.IntegerField()
    description = models.TextField(max_length=255)
    alias = models.CharField(max_length=255)
