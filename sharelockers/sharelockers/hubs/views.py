from django.shortcuts import render
from ipware.ip import get_ip
from hubs.models import Location, Hub


def connected(request, akey):
	ip = get_ip(request)
	print(ip)
	if Hub.objects.filter(secret_key = akey).exists():
		this_hub = Hub.objects.get(secret_key = akey)
		this_hub.ip = ip
	else:
		if Location.objects.count() == 0:
			loc1 = Location(description="place_holder", latitude=0.0, longitude=0.0)
			loc1.save()
		loc = Location.objects.get(pk=1)
		this_hub = Hub(name="blue", location=loc, secret_key=akey, ip=ip)
	return render(request, "empty.html")


def actuated(request):
	return render(request, "empty.html")


def finished(request):
	return render(request, "empty.html")
