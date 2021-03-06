from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, serializers
from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub, Location
from items.models import Item
from transactions.models import Unlock, Purchase, Reservation, Request
from .serializers import LockerSerializer, UserSerializer, ProfileSerializer, \
    HubSerializer, OwnedItemsSerializer, UnlockSerializer, PurchaseSerializer, \
    MakePurchaseSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.core.mail import send_mail
from sharelockers import settings

from rest_framework.response import Response  # FIXME: Temporary


class LockerViewSet(viewsets.ModelViewSet):
    serializer_class = LockerSerializer

    def get_queryset(self):
        # return Locker.objects.filter(owner = self.request.user.profile)
        return Locker.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        column = instance.column
        row = instance.row
        hub = Hub.objects.get(secret_key=1)
        # FIXME: depreciate opening by Locker object entirely
        # hub.open(column, row) # open using Arduino as server
        hub.poll_open(column, row)  # open using Arduino as polling device
        unlock = Unlock(profile=self.request.user.profile, locker=instance)
        unlock.save()

        return Response(serializer.data)

        # return super(LockerViewSet, self).update(self, request, *args, **kwargs)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_serializer(self, *args, **kwargs):


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
    # queryset = Item.objects.all()

    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user.profile)

    # stocks item after locker has been opened, or updates item
    def update(self, request, *args, **kwargs):
        # print(dir(request))
        # print(request.data)
        if 'pk' in kwargs: # if not, this isn't working
            item = Item.objects.get(pk=kwargs['pk'])
            if item.has_request(): # was requested when stocked
                # turn request into reservation
                request = item.get_request()
                buyer = request.buyer
                reservation = Reservation(buyer=buyer, seller=request.seller,
                                            item=item, status=1)
                reservation.code = reservation.make_code()
                reservation.save()
                request.delete()
                send_mail("Requested Item has Been Stocked!","""\
The item you requested has been stocked in a share locker by the owner. \
It is now available for pickup.
Item details:
Item: {}
Details: {}
Price: {}

If the item has a non-zero price, then payment may be required for you to pick it \
up. Thanks for using ShareLockers. Sharing is caring.

-ShareLockers Team""".format(reservation.item.title, reservation.item.description,
                        reservation.item.price),
                        settings.EMAIL_HOST_USER, [buyer.user.email], fail_silently=settings.EMAIL_SILENT)
        r = super(OwnedItemViewSet, self).update(request, *args, **kwargs)
        return r


class UnlockViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows unlock actions to be viewed or edited.
    """
    queryset = Unlock.objects.all()
    serializer_class = UnlockSerializer

    def perform_create(self, serializer):
        print('Validating Unlock, user: ', end="")
        # FIXME: Verrify this code
        # print(serializer.data)
        print(self.request.user.profile)
        # print(" unlock by "+opener)
        # opener_id = serializer.data['profile']
        # opener = Profile.objects.get(id=opener_id)
        # print(opener)
        opener = self.request.user.profile
        locker_id = serializer.data['locker']
        locker = Locker.objects.get(id=locker_id)
        if locker.item_set.all():
            item = locker.item_set.first()  # FIXME: Do we want to allow multiple items?
            owner = item.owner
        else:
            owner = opener  # If locker is empty, whoever tries to open it is temporarily the owner
            item = None

        # Logged in button-pusher  == locker.item.owner
        if opener != owner:
            print("You don't have access to this item, it belongs to {}".format(owner))
            raise serializers.ValidationError("You don't have access to this item, it belongs to {}".format(owner))

        # Set hub waiting/row/column for next time the hub polls the server
        print("Setting up for locker {} to open when server is polled".format(locker.local_code()))
        hub = locker.hub
        hub.poll_open(locker.column, locker.row)
        # hub.waiting = True
        # hub.waiting_col = locker.column
        # hub.waiting_row = locker.row
        # hub.save()

        # Destock the item from the locker
        if item:
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
        return PurchaseSerializer  # for list/retrieve/destroy/update.

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
        credits = buyer.credits
        serializer_data = {'buyer': buyer.pk,
                           'seller': seller.pk,
                           'price': price,
                           'item': item.pk,
                           }
        serializer = PurchaseSerializer(data=serializer_data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        # Validations
        # if buyer == seller: # FIXME: do correct validation for buyer
        #     print("You can't buy {}, because you already own it".format(item))
        #     raise serializers.ValidationError('Buyer and seller cannot be the same user.')
        # return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        if price > credits:
            print("Insufficient funds. {} needs {} more credits to buy {}".format(buyer, price - credits, item))
            raise serializers.ValidationError('Insufficient funds. Buy more credits to proceed with purchase.')
            return Response(serializer.data,
                            status=status.HTTP_402_PAYMENT_REQUIRED)  # FIXME: Delete after verifying that this will probably never be called
        elif item.is_reserved():
            reservation = item.active_reservation()
            if reservation.buyer == buyer:
                reservation.delete()
            else:
                print("This item is reserved for someone else.")
                raise serializers.ValidationError('Attempted to purchase a reserved item without permissions.')
                return Response(serializer.data, status=status.HTTP_401_UNATHORIZED)

        # Change owners
        print("Transferring ownership of item {} from {} to {}".format(item, seller, buyer))
        buyer.credits -= price
        buyer.save()
        seller.credits += price
        seller.save()
        item.owner = buyer
        item.save()


        # return super().perform_create(serializer) # Override this so that we can return our own full serializer
        print(serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        # FIXME: How to return the full object rather than the limited one used for POSTing?
        #         If this doesn't work, just return super()... as above instead
        # FIXME: Sanity check on how this Purchase is done




import json

def my_credits_view(request):
    try:
        data = {'credits': float(request.user.profile.credits)}
        return HttpResponse(json.dumps(data), content_type = "application/json")
    except AttributeError:
        return HttpResponse('Error: You must be logged in to see your credits.')
