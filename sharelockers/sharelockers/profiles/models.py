from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers


class Profile(models.Model):
    user = models.OneToOneField(User)
    rating = models.IntegerField(null=True, default=0)
    description = models.TextField(max_length=255, null=True)
    alias = models.CharField(max_length=255)


class ProfileSerializer(serializers.ModelSerializer): #FIXME: add Hyperlinked
    class Meta:
        model = Profile
        fields = ('user', 'rating', 'description', 'alias')
