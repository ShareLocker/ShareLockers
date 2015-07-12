from django.db import models
from lockers.models import Locker
from profiles.models import Profile


class Item(models.Model):
    owner = models.ForeignKey(Profile)
    locker = models.ForeignKey(Locker, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return "{}'s {}".format(self.owner, self.title)