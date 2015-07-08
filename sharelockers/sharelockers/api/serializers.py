from lockers.models import Locker
from profiles.models import Profile
from django.contrib.auth.models import User
from rest_framework import serializers


class LockerSerializer(serializers.ModelSerializer): #FIXME: add Hyperlinked
    class Meta:
        model = Locker
        fields = ('hub', 'row', 'column', 'owner',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User

class ProfileSerializer(serializers.ModelSerializer): #FIXME: add Hyperlinked
    class Meta:
        model = Profile
        fields = ('user', 'rating', 'description', 'alias')
