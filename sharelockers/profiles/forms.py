from django import forms
from django.contrib.auth.models import User
from profiles.models import Profile
from transactions.models import Reservation


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    email = forms.EmailField(required=False)

    class Meta:
        model = User
        fields = ('username', 'password', 'email',)

    def save(self, commit=True):
        user = super(UserForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for fieldname in ['username', 'password', 'email']:
            self.fields[fieldname].help_text = None


class ProfileForm(forms.ModelForm):
    # description = forms.CharField(required=False)

    class Meta:
        model = Profile
        fields = ()


class UserReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ('buyer',)


class HashReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ()
