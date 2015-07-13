from django.conf.urls import url
from lockers import views as locker_views
from django.views.generic import ListView
from lockers.models import Locker
from hubs.models import Hub
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^hub_list_bs.html$', locker_views.HubListView.as_view(), name="view_hubs"),
]
