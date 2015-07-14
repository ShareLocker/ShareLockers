from django.shortcuts import render
import django.views.generic as django_views
from django.views.generic.edit import UpdateView, CreateView
from hubs.models import Hub, Location
from lockers.forms import LocationForm

# Create your views here.
class HubListView(django_views.ListView):
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


class HubEditView(UpdateView):
	model = Hub
	fields = ['name', 'location']
	template_name="lockers/hub_edit_bs.html"
	success_url = '/hub_list_bs.html'


class LocListView(CreateView):
	form_class = LocationForm
	success_url = "/loc_list_bs.html"
	template_name="lockers/loc_list_bs.html"

	def get_context_data(self, **kwargs):
		kwargs['locations'] = Location.objects.all()
		return super(LocListView, self).get_context_data(**kwargs)


class LocEditView(UpdateView):
	model = Location
	fields = ['description', 'latitude', 'longitude', 'host']
	template_name="lockers/loc_edit_bs.html"
	success_url = '/loc_list_bs.html'
