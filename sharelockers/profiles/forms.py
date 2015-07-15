from django import forms
from django.contrib.auth.models import User
from profiles.models import Profile
from transactions.models import Reservation

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'password',)

    def save(self, commit=True):
        user = super(UserForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('description', 'alias', 'location')


class UserReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ('buyer', )


class HashReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ()
