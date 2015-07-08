from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from lockers.models import Locker
from profiles.models import Profile
from .serializers import LockerSerializer, UserSerializer, ProfileSerializer
from django.contrib.auth.models import User


class LockerViewSet(viewsets.ModelViewSet):
    serializer_class = LockerSerializer

    def get_queryset(self):
        return Locker.objects.filter(owner = self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user.profile)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user profiles to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer