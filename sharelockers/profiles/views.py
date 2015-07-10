from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.contrib import messages
from profiles.models import Profile
from profiles.forms import UserForm, ProfileForm


def user_register(request):
    if request.method == "GET":
        user_form = UserForm()
        profile_form = ProfileForm()
    elif request.method == "POST":
        user_form = UserForm(request.POST)
        profile_form = ProfileForm(request.POST)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
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

