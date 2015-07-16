from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub
from items.models import Item
from transactions.models import Purchase, Unlock
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User


class ProfileSerializer(serializers.ModelSerializer):  # FIXME: add Hyperlinked
    class Meta:
        model = Profile
        fields = ('id', 'user', 'rating', 'description', 'alias', 'credits')

class OwnedItemsSerializer(serializers.ModelSerializer):
    item_set = ProfileSerializer(many=True, read_only=True)
    actions = SerializerMethodField()
    # thumbnail_url = SerializerMethodField()
    #
    #
    # def get_thumbnail_url(self, obj):
    #     return obj.photo.url

    def get_actions(self, obj):
        item = obj
        if item.locker is None:
            return ['can_stock', 'can_delete']
        else:
            return ['can_open']

    class Meta:
        model = Item

class LockerSerializer(serializers.ModelSerializer):  # FIXME: add Hyperlinked
    actions = SerializerMethodField() # FIXME: add color
    item_set = OwnedItemsSerializer(many=True, read_only=True)
    local_code = SerializerMethodField()
    # status = SerializerMethodField()

    def get_local_code(self, obj):
        return obj.local_code()

    def get_status(self, obj):
        locker = obj
        user = self.context['request'].user
        profile = user.profile
        return locker.status(profile)

    def get_actions(self, obj):
        locker = obj
        if locker.item_set.all(): # Has item(s)
            if locker.item_set.first().owner.user is None:  # FIXME: Change related name for item_set or make 1:1
                return ['can_stock']  # FIXME: Is this needed
            elif locker.item_set.first().owner.user == self.context['request'].user:
                return ['can_open']
            else:
                return ['can_buy']
                # return str(self.context['request'].user)
        return ['can_stock', 'can_open']

    class Meta:
        model = Locker
        fields = ('id', 'hub', 'row', 'column', 'owner', 'actions', 'item_set', 'local_code')


class HubSerializer(serializers.ModelSerializer):
    locker_set = LockerSerializer(many=True, read_only=True)  # A nested list of 'locker' items.

    class Meta:
        model = Hub
        fields = ('id', 'secret_key', 'name', 'location', 'ip', 'waiting', 'waiting_row', 'waiting_col', 'locker_set' )


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item

class UnlockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unlock
        fields = ('id', 'waiting', 'time', 'profile', 'locker')

class PurchaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Purchase
        # TODO: Add fields here?

class MakePurchaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Purchase
        fields = ('item', 'buyer')
