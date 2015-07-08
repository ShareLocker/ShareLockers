from django.conf.urls import url
from hubs import views as arduino_views


urlpatterns = [
    url(r'^hubs/connected/(?P<akey>\d+)$', arduino_views.connected, name="arduino_turn_on"),
    # url(r'^hubs/actuated/$', arduino_views.actuated, name="arduino_received"),
    url(r'^hubs/finished/(?P<akey>\d+)$', arduino_views.finished, name="arduino_lowered"),
]
