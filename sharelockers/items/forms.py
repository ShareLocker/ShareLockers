from django import forms
import transactions.models as trans_models


class RequestForm(forms.ModelForm):
    class Meta:
        model = trans_models.Request
        fields = ()
