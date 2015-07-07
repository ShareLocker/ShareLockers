from django.contrib import admin
from .models import Profile
from profiles.forms import UserForm


class UserAdmin(admin.ModelAdmin):
    form = UserForm

admin.site.register(Profile, UserAdmin)
