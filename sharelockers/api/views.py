from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub, Location
from items.models import Item
from transactions.models import Unlock, Purchase
from .serializers import LockerSerializer, UserSerializer, ProfileSerializer,\
    HubSerializer, OwnedItemsSerializer, UnlockSerializer, PurchaseSerializer,\
    MakePurchaseSerializer
from django.contrib.auth.models import User


from rest_framework.response import Response # FIXME: Temporary

class LockerViewSet(viewsets.ModelViewSet):
    serializer_class = LockerSerializer

    def get_queryset(self):
        #return Locker.objects.filter(owner = self.request.user.profile)
        return Locker.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user.profile)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        column = instance.column
        row = instance.row
        hub = Hub.objects.get(secret_key=1)
        # hub.open(column, row) # open using Arduino as server
        hub.poll_open(column, row) # open using Arduino as polling device

        return Response(serializer.data)

        # return super(LockerViewSet, self).update(self, request, *args, **kwargs)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user profiles to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class HubViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows hubs to be viewed or edited.
    """
    queryset = Hub.objects.all()
    serializer_class = HubSerializer


class OwnedItemViewSet(viewsets.ModelViewSet):
    serializer_class = OwnedItemsSerializer
    queryset = Item.objects.all()

class UnlockViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows unlock actions to be viewed or edited.
    """
    queryset = Unlock.objects.all()
    serializer_class = UnlockSerializer

    def perform_create(self, serializer):
        print('Validating Unlock')
        # FIXME: There must be a better way to do the following authentication
        # print(serializer.data)
        opener_id = serializer.data['profile']
        opener = Profile.objects.get(id=opener_id)
        locker_id = serializer.data['locker']
        locker = Locker.objects.get(id=locker_id)
        item = locker.item_set.first() # FIXME: Do we want to allow multiple items?
        owner = item.owner

        # Logged in button-pusher  == locker.item.owner
        if opener != owner:
            print("You don't have access to this item, it belongs to {}".format(owner))
            return   # FIXME: How to provide error code in json?

        # Set hub waiting/row/column for next time the hub polls the server
        print("Setting up for locker {} to open when server is polled".format(locker.local_code()))
        hub = locker.hub
        hub.waiting = True
        hub.waiting_col = locker.column
        hub.waiting_row = locker.row
        hub.save()

        # Destock the item from the locker
        print("Destocking item {} from locker {}".format(item, item.locker))
        item.locker = None
        item.save()

        return super().perform_create(serializer)

class PurchaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows purchases to be viewed or edited.
    """
    queryset = Purchase.objects.all()
    # serializer_class = MakePurchaseSerializer
    def get_serializer_class(self):
        if self.action == 'create':
            return MakePurchaseSerializer
        return PurchaseSerializer # for list/retrieve/destroy/update.


    """
    "price": null,
    "payment_method": "",
    "buyer": null,
    "seller": null,
    "item": null

    +buyer = models.ForeignKey(Profile, related_name="bought_item", related_query_name="bought_item_set")
    +seller = models.ForeignKey(Profile, related_name="sold_item", related_query_name="sold_item_set")
    +date = models.DateTimeField(auto_now_add=True)
    +price = models.DecimalField(max_digits=5, decimal_places=2)
    +item = models.ForeignKey(Item)
    |payment_method = models.CharField(max_length=255)
    """

    def perform_create(self, serializer):
        print('Validating Purchase')
        # FIXME: There must be a better way to do the following authentication
        # print(serializer.data)
        buyer_id = serializer.data['buyer']  # FIXME: How to get this from session?
        buyer = Profile.objects.get(id=buyer_id)
        item_id = serializer.data['item']
        item = Item.objects.get(id=item_id)
        seller = item.owner
        locker = item.locker
        price = item.price  # TODO: Add payment method
        serializer_data = {'buyer': buyer,
                           'seller': seller,
                           'price': price,
                           'item': item,
                           }
        serializer = self.get_serializer(data=serializer_data)
        # Validations
        if buyer == seller:
            print("You can't buy {}, because you already own it".format(item))
            return   # FIXME: How to provide error code in json?

        # Change owners
        print("Transferring ownership of item {} from {} to {}".format(item, seller, buyer))
        item.owner = buyer
        item.save()

        return super().create(serializer)  # Jump back to create since we have a new serializer
        # FIXME: Purchase is not being created, but ownership is transferred
        # FIXME: Sanity check on how this Purchase is done