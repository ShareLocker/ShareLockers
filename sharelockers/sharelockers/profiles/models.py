from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User)
    rating = models.IntegerField(null=True, default=0)
    description = models.TextField(max_length=255, null=True)
    alias = models.CharField(max_length=255)

    def __str__(self):
        return self.alias

