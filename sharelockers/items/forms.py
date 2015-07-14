from django import forms
import transactions.models as trans_models
from items.models import Item


class RequestForm(forms.ModelForm):
    class Meta:
        model = trans_models.Request
        fields = ()

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ('title', 'description', 'price')
