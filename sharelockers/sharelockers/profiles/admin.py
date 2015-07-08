from django.contrib import admin
from .models import Profile
from profiles.forms import UserForm



admin.site.register(Profile)
