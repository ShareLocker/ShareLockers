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
    locker = models.ForeignKey(Locker, null=True)  # FIXME make this False

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
    item = models.ForeignKey(Item)
    instructions = models.TextField(blank=True, null=True)

    status_options = (
        (1, "outstanding"),  # requested, no other action taken yet
        (2, "rejected"),  # potential seller removed request
        (3, "withdrawn"),  # potential buyer removed request
        (4, "expired"),  # time ran out and system cleared item
    )
    status = models.IntegerField(choices=status_options)

    created_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def age(self):
        from django.utils import timezone

        return (timezone.now() - self.created_at).total_days()


class Reservation(models.Model):
    buyer = models.ForeignKey(Profile, related_name="ready",
                              related_query_name="ready_set", null=True)
    seller = models.ForeignKey(Profile, related_name="stocked",
                               related_query_name="stocked_set")
    item = models.ForeignKey(Item)
    instructions = models.TextField(blank=True, null=True)
    code = models.CharField(db_index=True, max_length=255)

    status_options = (
        (1, "reserved"),  # in locker, waiting for buyer
        (2, "halted"),  # after stocking, potential seller changes mind
        (3, "abandoned"),  # potential buyer no longer wants stocked itemd
        (4, "processed"),  # time ran out and processing action was taken
    )
    status = models.IntegerField(choices=status_options)

    created_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    def age(self):
        from django.utils import timezone

        return (timezone.now() - self.created_at).total_days()

    def is_open(self):
        if self.status == 1:
            return True
        else:
            return False

    def url(self):
        st = "reservation_h_"
        st += str(self.id) + ".html/" + self.code
        return st
