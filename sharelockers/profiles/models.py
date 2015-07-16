from django.db import models
from django.contrib.auth.models import User
from faker import Factory
import random
from hubs.models import Location


class Profile(models.Model):
    user = models.OneToOneField(User)
    rating = models.IntegerField(null=True, default=0)
    description = models.TextField(max_length=255, null=True)
    alias = models.CharField(max_length=255)
    location = models.ForeignKey(Location, null=True)
    # stripe_token = models.CharField(max_length=255, null=True)
    credits = models.DecimalField(max_digits=5, decimal_places=2, default=100)

    def __str__(self):
        return '{} (id: {})'.format(self.alias, self.id)


local_users = ['Alan', 'John', 'Brendan', 'Falon', 'Manish']


def create_users():
    for i in local_users:
        user = User.objects.create_user(
            "{}".format(i),
            "{}@sharelockers.com".format(i),
            "{}".format(i)
        )
        user.save()
    create_profiles()


def create_profiles():
    fake = Factory.create()
    for user in User.objects.all():
        rating = random.randint(1, 5)
        description = fake.text(max_nb_chars=20)
        alias = "{}".format(user)
        profile = Profile(user=user, rating=rating, description=description, alias=alias)
        profile.save()
