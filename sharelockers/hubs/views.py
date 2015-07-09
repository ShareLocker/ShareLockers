from django.shortcuts import render
from ipware.ip import get_ip
from hubs.models import Location, Hub


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
	if Hub.objects.filter(secret_key = akey).exists():
		this_hub = Hub.objects.get(secret_key = akey)
		if this_hub.ip != ip:
			print("Warning: IP of controller changed while lowering?")
		print(" hub "+this_hub.secret_key+" polled us.")
	else:
		print("Error: latch that doesn't exist claims it was lowered")
	return render(request, "empty.html")
