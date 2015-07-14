from django import forms
import hubs.models as models


class LocationForm(forms.ModelForm):
    class Meta:
        model = models.Location
        fields = ('description', 'latitude', 'longitude', 'host')
