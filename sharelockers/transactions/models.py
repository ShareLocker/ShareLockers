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
    payment_method = models.CharField(max_length=255, default='CC')

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

class Request(models.Model):
    buyer = models.ForeignKey(Profile, related_name="want",
                    related_query_name="want_set")
    seller = models.ForeignKey(Profile, related_name="requested",
                    related_query_name="requested_set")

    status_options = (
        (1, "outstanding"), # requested, no other action taken yet
        (2, "rejected"),    # potential seller removed request
        (3, "withdrawn"),   # potential buyer removed request
        (4, "expired"),     # potential seller never stocked and time ran out
        (11, "reserved"),  # in locker, waiting for buyer
        (12, "halted"),    # after stocking, potential seller changes mind
        (13, "abandoned"), # potential buyer no longer wants stocked item
    )
    status = models.IntegerField(choices=status_options)

    created_at = models.DateTimeField(auto_now_add=True)
    stocked_at = models.DateTimeField()
    ended_at = models.DateTimeField()
