from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib import messages
from profiles.models import Profile
from profiles.forms import UserForm, ProfileForm
import stripe


def user_register(request):
    if request.method == "GET":
        user_form = UserForm()
        profile_form = ProfileForm()
    elif request.method == "POST":
        user_form = UserForm(request.POST)
        profile_form = ProfileForm(request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            # extra password thing
			# password = user.password # The form doesn't know to call this special method on user.
			# user.set_password(password)
			# user.save() # You must call authenticate before login. :(
            # end extra password thing
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            user = authenticate(username=request.POST['username'],
                                password=request.POST['password'])
            login(request, user)
            messages.add_message(
                request, messages.SUCCESS,
                "Congratulations, {}, on creating your new account! You are now logged in.".format(
                    user.username))
            return redirect('view_index')
    return render(request, "profiles/register.html", {'user_form': user_form,
                                                      'profile_form': profile_form,
                                                      })

def stripe_charge_view(request):
    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here https://dashboard.stripe.com/account/apikeys
    stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

    # Get the credit card details submitted by the form
    token = request.POST['stripeToken']

    # Create the charge on Stripe's servers - this will charge the user's card
    try:
        charge = stripe.Charge.create(
            amount=1000,  # amount in cents, again
            currency="usd",
            source=token,
            description="Example charge"
        )
    except stripe.error.CardError as e:
        # The card has been declined
        pass
