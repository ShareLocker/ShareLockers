from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from lockers.models import Locker
from profiles.models import Profile
from hubs.models import Hub, Location
from items.models import Item
from .serializers import LockerSerializer, UserSerializer, ProfileSerializer, HubSerializer, OwnedItemsSerializer
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


class OwnedItemsViewSet(viewsets.ModelViewSet):
    serializer_class = OwnedItemsSerializer
    queryset = Item.objects.all()