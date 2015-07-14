from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib import messages
from profiles.models import Profile
from profiles.forms import UserForm, ProfileForm, ReservationForm
from items.models import Item
from items.forms import ItemForm
# view classes
import django.views.generic as django_views
from django.views.generic.edit import CreateView

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


class SelfInventoryView(django_views.ListView):
    model = Item
    template_name="my_items.html"
    context_object_name='items'
    paginate_by=100

    def get_queryset(self):
        profile = self.request.user.profile
        return profile.item_set.all()


class ReservationCreateView(CreateView):
    form_class = ReservationForm
    success_url = "/my_items.html"
    template_name="reservation/make_reservation.html"
    item = None

    def dispatch(self, *args, **kwargs):
        self.item = Item.objects.get(pk=kwargs['pk'])
        return super(ReservationCreateView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(ReservationCreateView, self).get_context_data(**kwargs)
        context['item'] = self.item
        return context

    def form_valid(self, form):
        form.instance.item = self.item
        form.instance.seller = self.request.user.profile
        form.instance.status = 1
        print(form.instance.buyer.alias)
        msg_text = "You have reserved " + self.item.title
        msg_text += " for user " + form.instance.buyer.alias
        messages.add_message(self.request, messages.SUCCESS, msg_text)
		# form.save()
        return super(ReservationCreateView, self).form_valid(form)
