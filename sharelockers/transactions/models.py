from django.db import models
from items.models import Item
from profiles.models import Profile
from lockers.models import Locker


class Purchase(models.Model):
    buyer = models.ForeignKey(Profile, related_name="bought_item", related_query_name="bought_item_set")
    seller = models.ForeignKey(Profile, related_name="sold_item", related_query_name="sold_item_set")
    date = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    item = models.ForeignKey(Item)
    payment_method = models.CharField(max_length=255)

class Unlock(models.Model):
    profile = models.ForeignKey(Profile)
    waiting = models.BooleanField(default=True)
    time = models.DateTimeField(auto_now_add=True)
    locker = models.ForeignKey(Locker, null=True) # FIXME make this False

    def __str__(self):
        status = '+'  # '+' indicates completed, '-' is waiting
        if self.waiting:
            status = '-'
        return '{}  {}@{} by {}'.format(status, self.locker, self.time, self.profile)
