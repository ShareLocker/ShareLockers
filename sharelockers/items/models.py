from django.db import models
from lockers.models import Locker
from profiles.models import Profile
from faker import Factory
import random
import os
from PIL import Image
from django.utils.timezone import now


def upload_photo_to(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'photos/{}{}'.format(
        now().strftime("%Y%m%d%H%M%S"),
        filename_ext.lower())


class Item(models.Model):
    owner = models.ForeignKey(Profile)
    locker = models.ForeignKey(Locker, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    photo = models.ImageField(upload_to=upload_photo_to, null=True, blank=True, default=None)

    def __str__(self):
        return "{}'s {}".format(self.owner, self.title)

    def is_reserved(self):
        flag = False
        for res in self.reservation_set.all():
            if res.status == 1:
                flag = True
        return flag

    def reserved_for(self, profile):
        flag = False
        for res in self.reservation_set.all():
            if res.status == 1:
                if res.buyer == profile:
                    flag = True
        return flag

    def remove_reservations_seller(self):
        for res in self.reservation_set.all():
            if res.status == 1:
                res.status = 2
                res.save()

    def remove_reservations_buyer(self):
        for res in self.reservation_set.all():
            if res.status == 1:
                res.status = 3
                res.save()


fake_items = ['Belking Router', 'Laptop', 'Aspirin', 'Phone Charger', 'Wireless Mouse', 'Used Phone']
def create_items(num):
    fake = Factory.create()
    for profile in Profile.objects.all():
        for _ in range(num):
            title = random.choice(fake_items)
            description = fake.sentence(nb_words=4)
            price = round(random.uniform(1, 100), 2)
            item = Item(owner=profile, title=title, description=description, price=price)
            item.save()
