from django.shortcuts import render
import django.views.generic as django_views
from django.views.generic.edit import CreateView
from items.models import Item
from items.forms import RequestForm
from hubs.models import Hub


class MarketplaceView(django_views.ListView):
	model=Item
	template_name="marketplace.html"
	context_object_name='items'
	paginate_by=100
	hub = None

	def dispatch(self, *args, **kwargs):
		self.hub = Hub.objects.get(pk=kwargs['pk'])
		return super(MarketplaceView, self).dispatch(*args, **kwargs)

	def get_queryset(self):
		# FIXME: attach hubs to profiles, then we can narrow this to the hub
		return Hub.objects.all()

	def get_context_data(self, *args, **kwargs):
		context = super(MarketplaceView, self).get_context_data(**kwargs)
		context['hub'] = self.hub
		return context


class RequestCreateView(CreateView):
	form_class = RequestForm
	success_url = "/marketplace.html"
	template_name="make_request.html"
	item = None

	def dispatch(self, *args, **kwargs):
		self.item = Item.objects.get(pk=kwargs['pk'])
		return super(RequestCreateView, self).dispatch(*args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(RequestCreateView, self).get_context_data(**kwargs)
		context['item'] = self.item
		return context

	def form_valid(self, form):
		form.item = self.item
		form.buyer = self.request.user
		form.seller = self.item.owner
		form.status = 1
		form.save()
		return super(RequestCreateView, self).form_valid(form)
