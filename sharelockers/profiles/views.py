from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib import messages
from profiles.models import Profile
from profiles.forms import UserForm, ProfileForm
import stripe
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.views.generic import TemplateView

from profiles.forms import UserForm, ProfileForm, UserReservationForm, HashReservationForm
from items.models import Item
from items.forms import ItemForm
from hubs.models import Location
# view classes
import django.views.generic as django_views
from django.views.generic.edit import CreateView
from decimal import Decimal
from django.core.mail import send_mail
from sharelockers import settings


def user_register(request):
    if request.method == "GET":
        user_form = UserForm()
        profile_form = ProfileForm()
    elif request.method == "POST":
        user_form = UserForm(request.POST)
        profile_form = ProfileForm(request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save(commit=False)  # setting password done in forms.py
            user.alias = user.username
            user.save()
            # extra password thing
            # password = user.password # The form doesn't know to call this special method on user.
            # user.set_password(password)
            # user.save() # You must call authenticate before login. :(
            # end extra password thing
            profile = profile_form.save(commit=False)
            if Location.objects.count() > 0:
                profile.location = Location.objects.all()[0]
            profile.user = user
            profile.save()
            user = authenticate(username=request.POST['username'],
                                password=request.POST['password'])
            login(request, user)
            messages.add_message(
                request, messages.SUCCESS,
                "Congratulations, {}, on creating your new account! You are now logged in.".format(
                    user.username))
            send_mail("Welcome to Share Lockers",
                    "Your account on sharelockers.come has been created!",
                    settings.EMAIL_HOST_USER, [user.email], fail_silently=False)
            return redirect('view_index')
    return render(request, "profiles/register.html", {'user_form': user_form,
                                                      'profile_form': profile_form,
                                                      })


from django.views.decorators.csrf import csrf_exempt


@csrf_exempt  # FIXME: Before pushing to heroku
def stripe_charge_view(request):
    if request.method == "POST":
        # Set your secret key: remember to change this to your live secret key in production
        # See your keys here https://dashboard.stripe.com/account/apikeys
        stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

        # Get the credit card details submitted by the form
        token = request.POST['stripeToken']
        charge = None
        # Create the charge on Stripe's servers - this will charge the user's card
        try:
            charge = stripe.Charge.create(
                amount=10000,  # amount in cents, again
                currency="usd",
                source=token,
                description="Example charge"
            )
        except stripe.error.CardError as e:
            # The card has been declined
            return HttpResponse('Card declined, please try again.')
            pass

        print("Adding {} credits to {}'s account".format(100.00, request.user.profile))

    request.user.profile.credits += Decimal(10.00)
    request.user.profile.save()

    return HttpResponse('Charged {}{} via token "{}"'.format(charge.amount / 100, str.upper(charge.currency), token))
    # FIXME: Redirect to a meaningful place, with a message that they were charged
    # request.user.profile.stripe_token = token


class SelfInventoryView(django_views.ListView):
    model = Item
    template_name = "my_items.html"
    context_object_name = 'items'
    paginate_by = 100

    def get_queryset(self):
        profile = self.request.user.profile
        return profile.item_set.all()


class ReservationCreateView(TemplateView):
    # form_class = UserReservationForm
    # success_url = "/my_items.html"
    template_name = "reservation/make_reservation.html"
    item = None

    def dispatch(self, *args, **kwargs):
        self.item = Item.objects.get(pk=kwargs['pk'])
        return super(ReservationCreateView, self).dispatch(*args, **kwargs)

    # def get_success_url(self):
    #     return reverse('reservation_seller_detail', kwargs = {'pk':self.item.id})

    def get_context_data(self, **kwargs):
        context = super(ReservationCreateView, self).get_context_data(**kwargs)
        context['item'] = self.item
        context['hash_form'] = HashReservationForm()
        context['user_form'] = UserReservationForm()
        return context

    def post(self, *args, **kwargs):
        if 'hash_reservation' in self.request.POST:

            print("hash form submitted")
            hash_form = HashReservationForm(self.request.POST)
            reservation = hash_form.save(commit=False)
            reservation.item = self.item
            reservation.seller = self.request.user.profile
            reservation.status = 1
            reservation.code = reservation.make_code()
            reservation.save()
            msg_text = "You have reserved " + self.item.title
            msg_text += " as a hash based reservation "
            messages.add_message(self.request, messages.SUCCESS, msg_text)
        else:
            user_form = UserReservationForm(self.request.POST)
            reservation = user_form.save(commit=False)
            reservation.item = self.item
            reservation.seller = self.request.user.profile
            reservation.status = 1
            reservation.save()
            msg_text = "You have reserved " + self.item.title
            msg_text += " for user " + reservation.buyer.alias
            messages.add_message(self.request, messages.SUCCESS, msg_text)
        final_url = HttpResponseRedirect(reverse('reservation_seller_detail', kwargs = {'pk':self.item.id}))
        return final_url


class ReservationDeleteView(django_views.RedirectView):
    permanent = False
    query_string = False
    # pattern_name = 'self_inventory'
    url = '/my_items.html'

    def dispatch(self, *args, **kwargs):
        item = Item.objects.get(pk=kwargs['pk'])
        item.remove_reservations_seller()

        message_text = "You have lifted the reservation on " + item.title
        messages.add_message(self.request, messages.SUCCESS, message_text)
        return super(ReservationDeleteView, self).dispatch(*args, **kwargs)
