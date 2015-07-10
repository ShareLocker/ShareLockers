from django.shortcuts import render
from ipware.ip import get_ip
from hubs.models import Location, Hub
from lockers.models import Locker


def connected(request, akey):
	ip = get_ip(request)
	print(ip)
	if Hub.objects.filter(secret_key = akey).exists():
		this_hub = Hub.objects.get(secret_key = akey)
		this_hub.ip = ip
		this_hub.save()
	else:
		if Location.objects.count() == 0:
			loc1 = Location(description="place_holder", latitude=0.0, longitude=0.0)
			loc1.save()
		loc = Location.objects.get(pk=1)
		this_hub = Hub(name="blue", location=loc, secret_key=akey, ip=ip)
		this_hub.save()
		Nrow = 4
		Ncol = 2
		this_hub.Nrow = Nrow
		this_hub.Ncol = Ncol
		for i in range(Ncol):
			for j in range(Nrow):
				locker = Locker(hub = this_hub, row=j+1, column=i+1)
				locker.save()
	return render(request, "empty.html")


# def actuated(request):
# 	return render(request, "empty.html")


def finished(request, akey):
	ip = get_ip(request)
	if Hub.objects.filter(secret_key = akey).exists():
		this_hub = Hub.objects.get(secret_key = akey)
		if this_hub.ip != ip:
			print("Warning: IP of controller changed while lowering?")
		this_hub.occupied = False
		this_hub.save()
	else:
		print("Error: latch that doesn't exist claims it was lowered")
	return render(request, "empty.html")


def poll(request, akey):
	ip = get_ip(request)
	to_open = "#" # character which is not a question mark
	col = 1
	row = 1 # placeholders
	if Hub.objects.filter(secret_key = akey).exists():
		this_hub = Hub.objects.get(secret_key = akey)
		if this_hub.ip != ip:
			print("Warning: IP of controller changed while lowering?")
		print(" hub "+this_hub.secret_key+" polled us.")
		if this_hub.waiting:
			print("poll open data served")
			this_hub.waiting = False
			this_hub.save()
			to_open = "?"
			row = this_hub.waiting_row
			col = this_hub.waiting_col
	else:
		print("Error: latch that doesn't exist claims it was lowered")
	return render(request, "poll_response.html", {"to_open":to_open,
	 							"col":col, "row":row})