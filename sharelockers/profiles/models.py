from django.db import models
from django.contrib.auth.models import User
from faker import Factory
import random


class Profile(models.Model):
    user = models.OneToOneField(User)
    rating = models.IntegerField(null=True, default=0)
    description = models.TextField(max_length=255, null=True)
    alias = models.CharField(max_length=255)
    # stripe_token = models.CharField(max_length=255, null=True)
    credits = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return '{} (id: {})'.format(self.alias, self.id)


def create_users(num):
    for i in range(1, num + 1):
        user = User.objects.create_user(
            "user{}".format(i),
            "user{}@theironyard.com".format(i),
            "user{}".format(i)
        )
        user.save()


def create_profiles():
    fake = Factory.create()
    for user in User.objects.all():
        rating = random.randint(1, 5)
        description = fake.text(max_nb_chars=20)
        alias = "I am {}".format(user)
        profile = Profile(user=user, rating=rating, description=description, alias=alias)
        profile.save()
