from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub
from django.contrib.auth.models import User
from rest_framework import serializers


class LockerSerializer(serializers.ModelSerializer): #FIXME: add Hyperlinked
    can_open = serializers.SerializerMethodField()

    class Meta:
        model = Locker
        fields = ('id', 'hub', 'row', 'column', 'owner', 'can_open')

    def get_can_open(self, obj):
        return True  # FIXME: Add validation that I am the owner


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User

class ProfileSerializer(serializers.ModelSerializer): #FIXME: add Hyperlinked
    class Meta:
        model = Profile
        fields = ('id', 'user', 'rating', 'description', 'alias')

class HubSerializer(serializers.ModelSerializer):
    locker_set = LockerSerializer(many=True, read_only=True)  # A nested list of 'locker' items.

    class Meta:
        model = Hub
        fields = ('id', 'name','location', 'ip', 'locker_set')