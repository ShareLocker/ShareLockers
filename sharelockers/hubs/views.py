from django.shortcuts import render
from ipware.ip import get_ip
from hubs.models import Location, Hub
from lockers.models import Locker
from profiles.models import Profile
from django.contrib.auth.models import User
from transactions.models import Unlock
from django.utils import timezone


def connected(request, akey):
    ip = get_ip(request)
    if Hub.objects.filter(secret_key=akey).exists():
        print("Known hub connected at IP: "+ip)
        this_hub = Hub.objects.get(secret_key=akey)
        this_hub.flag_connect()
        this_hub.ip = ip
        this_hub.save()
    else:
        print("New hub connected at IP: "+ip)
        if Location.objects.count() == 0:
            loc1 = Location(description="place_holder", latitude=0.0,
                            longitude=0.0)
            loc1.save()
        loc = Location.objects.all()[0]
        this_hub = Hub(name="blue", location=loc, secret_key=akey, ip=ip)
        this_hub.flag_connect()
        this_hub.save()
        Nrow = 4
        Ncol = 2
        this_hub.Nrow = Nrow
        this_hub.Ncol = Ncol
        if Profile.objects.count() >= 1:
            owning_profile = Profile.objects.all()[0]
        else:
            user = User(username="blank_user", password="pass")
            user.save()
            user.set_password("pass")
            user.save() #
            owning_profile = Profile(user=user, alias="blank_user",
                                     description="hello world")
            owning_profile.save()
        for j in range(Nrow):
            for i in range(Ncol):
                locker = Locker(hub=this_hub, row=j + 1, column=i + 1,
                                owner=owning_profile)
                locker.save()
    return render(request, "empty.html")


# def actuated(request):
# 	return render(request, "empty.html")


def finished(request, akey):
    ip = get_ip(request)
    if Hub.objects.filter(secret_key=akey).exists():
        this_hub = Hub.objects.get(secret_key=akey)
        if this_hub.ip != ip:
            print("Warning: IP of controller changed while lowering?")
            this_hub.ip = ip
        this_hub.occupied = False
        this_hub.save()
    else:
        print("Error: latch that doesn't exist claims it was lowered")
    return render(request, "empty.html")


def poll(request, akey):
    ip = get_ip(request)
    to_open = "#"  # character which is not a question mark
    col = 1
    row = 1  # placeholders
    if Hub.objects.filter(secret_key=akey).exists():
        this_hub = Hub.objects.get(secret_key=akey)
        this_hub.polled_at = timezone.now()
        if this_hub.ip != ip:
            print("Warning: IP of controller changed to "+ip)
            this_hub.ip = ip
            this_hub.save()
        print(" hub " + this_hub.secret_key + " polled us.", end='')
        if this_hub.waiting:
            this_hub.waiting = False
            this_hub.save()
            to_open = "?"
            row = this_hub.waiting_row
            col = this_hub.waiting_col
            print(" -- Poll open data served for hub: {} col: {}, row {}".format(
                this_hub, col, row))

            # Set Unlock transaction's waiting attribute to False to indicate success
            unlock = Unlock.objects.last()
            # FIXME: This will only honor the most recent Unlock since the last poll
            unlock.waiting = False
            unlock.save()
            print('Unlock action {} is no longer waiting.'.format(unlock))
            # TODO: Set up queueing for multiple unlocks (check waiting Unlock objects rather than using hub.waiting_col, etc)
            # FIXME: It should also verify that the locker of the Unlock action is in this hub
        else:
            print(' -- No action to take.')
    else:
        print("Error: controller that doesn't exist polled us")
    return render(request, "poll_response.html", {"to_open": to_open,
                                                  "col": col, "row": row})
