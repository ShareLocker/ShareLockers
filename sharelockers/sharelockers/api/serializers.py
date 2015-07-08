from lockers.models import Locker
from django.contrib.auth.models import User
from rest_framework import serializers


class LockerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Locker
        fields = ('hub', 'row', 'column', 'owner',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
