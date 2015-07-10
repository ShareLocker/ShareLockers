from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub
from items.models import Item
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField


class LockerSerializer(serializers.ModelSerializer):  # FIXME: add Hyperlinked
    actions = SerializerMethodField()

    def get_actions(self, obj):
        locker = obj
        if locker.owner is None:
            return ['can_stock']
        elif locker.owner == self.context['request'].user:
            return ['can_open']
        else:
            return ['can_buy']

    class Meta:
        model = Locker
        fields = ('id', 'hub', 'row', 'column', 'owner', 'actions')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User


class ProfileSerializer(serializers.ModelSerializer):  # FIXME: add Hyperlinked
    class Meta:
        model = Profile
        fields = ('id', 'user', 'rating', 'description', 'alias')


class HubSerializer(serializers.ModelSerializer):
    locker_set = LockerSerializer(many=True, read_only=True)  # A nested list of 'locker' items.

    class Meta:
        model = Hub
        fields = ('id', 'name', 'location', 'ip', 'locker_set')


class OwnedItemsSerializer(serializers.ModelSerializer):
    item_set = ProfileSerializer(many=True, read_only=True)
    actions = SerializerMethodField()

    def get_actions(self, obj):
        item = obj
        if item.locker is None:
            return ['can_stock', 'can_delete']
        else:
            return ['can_open']

    class Meta:
        model = Item
