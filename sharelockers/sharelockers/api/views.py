from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from lockers.models import Locker
from .serializers import LockerSerializer, UserSerializer
from django.contrib.auth.models import User

class LockerViewSet(viewsets.ModelViewSet):
    serializer_class = LockerSerializer

    def get_queryset(self):
        return Locker.objects.filter(owner = self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer