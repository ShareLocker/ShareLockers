from django.shortcuts import render
import django.views.generic as django_views
from django.views.generic.edit import UpdateView, CreateView
from items.models import Item
from items.forms import RequestForm, ItemForm, UnlockForm
from hubs.models import Hub
from transactions.models import Reservation
from django.views.generic.base import TemplateView
from django.core.urlresolvers import reverse


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
		form.instance.item = self.item
		form.instance.buyer = self.request.user
		form.instance.seller = self.item.owner
		form.instance.status = 1
		return super(RequestCreateView, self).form_valid(form)


class ItemCreateView(CreateView):
	form_class = ItemForm
	success_url = "my_items.html"
	template_name = "items/make_item.html"

	def form_valid(self, form):
		form.instance.owner = self.request.user.profile
		return super(ItemCreateView, self).form_valid(form)
		# form.save()


class ReservationSellerView(UpdateView):
	model = Reservation
	fields = ['buyer', 'instructions']
	template_name = "reservation/reservation_seller.html"
	success_url = '/my_items.html'
	reservation = None

	def dispatch(self, *args, **kwargs):
		item = Item.objects.get(pk=kwargs['pk'])
		self.reservation = item.active_reservation()
		return super(ReservationSellerView, self).dispatch(*args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(ReservationSellerView, self).get_context_data(**kwargs)
		context['reservation'] = self.reservation
		context['hash_url'] = self.request.build_absolute_uri(reverse('view_index')) \
								+ self.reservation.url()
		return context

	def get_object(self):
		return self.reservation


class ReservationBuyerView(CreateView):
	form_class = UnlockForm
	success_url = "/my_items.html"
	template_name = "reservation/reservation_buyer.html"
	reservation = None

	def dispatch(self, *args, **kwargs):
		self.reservation = Reservation.objects.get(pk=kwargs['pk'])
		return super(ReservationBuyerView, self).dispatch(*args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(ReservationBuyerView, self).get_context_data(**kwargs)
		context['reservation'] = self.reservation
		profile = self.request.user.profile
		right_user = False
		if profile == self.reservation.buyer:
			right_user = True
		context['right_user'] = right_user
		return context

	def form_valid(self, form):
		profile = self.request.user.profile
		locker = self.reservation.item.locker
		form.instance.profile = profile
		form.instance.locker = locker
		hub.poll_open(locker.column, locker.row)
		return super(ReservationBuyerView, self).form_valid(form)


class ReservationHashView(CreateView):
	form_class = UnlockForm
	success_url = "/my_items.html"
	template_name = "reservation/reservation_hash.html"
	item = None
	reservation = None
	code = None

	def dispatch(self, *args, **kwargs):
		self.reservation = Reservation.objects.get(pk=kwargs['pk'])
		self.code = kwargs['code']
		return super(ReservationHashView, self).dispatch(*args, **kwargs)

	def get_context_data(self, **kwargs):
		context = super(ReservationHashView, self).get_context_data(**kwargs)
		context['reservation'] = self.reservation
		right_hash = False
		print(self.code + " : " + self.reservation.code)
		if self.code == self.reservation.code:
			right_hash = True
		context['right_hash'] = right_hash
		return context

	def form_valid(self, form):
		profile = self.request.user.profile
		locker = self.reservation.item.locker
		hub = locker.hub
		form.instance.profile = profile
		form.instance.locker = locker
		hub.poll_open(locker.column, locker.row)
		return super(ReservationBuyerView, self).form_valid(form)
