from django.db import models
from lockers.models import Locker
from profiles.models import Profile
from faker import Faker
import random


class Item(models.Model):
    owner = models.ForeignKey(Profile)
    locker = models.ForeignKey(Locker, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return "{}'s {}".format(self.owner, self.title)


def create_items(num):
    fake = Faker()
    for profile in Profile.objects.all():
        for _ in range(num):
            title = fake.sentence(nb_words=2)
            description = fake.sentence(nb_words=7)
            price = round(random.uniform(1, 100), 2)
            item = Item(owner=profile, title=title, description=description, price=price)
            item.save()
