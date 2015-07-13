from django.shortcuts import render
from django.views.generic import ListView
from hubs.models import Hub

# Create your views here.
class HubListView(ListView):
	model=Hub
	template_name="lockers/hub_list_bs.html"
	context_object_name='hubs'
	paginate_by=30

	def dispatch(self, *args, **kwargs):
		for hub in Hub.objects.all():
			if hub.polled_duration() > 60.:
				hub.connected = False
				hub.save()
		return super(HubListView, self).dispatch(*args, **kwargs)
