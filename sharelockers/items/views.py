from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render

from items.forms import ItemForm


def create(request):
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('created'))
    else:
        form = ItemForm()

    return render(request, 'item.html', {
        'form': form,
    })
