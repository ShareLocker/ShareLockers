from django.conf.urls import url
from lockers import views as locker_views
from django.views.generic import ListView
from lockers.models import Locker
from hubs.models import Hub
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^hub_list_bs.html$', locker_views.HubListView.as_view(), name="view_hubs"),
    url(r'^hub_edit/(?P<pk>\d+)$', locker_views.HubEditView.as_view(), name="edit_hub"),

    url(r'^loc_list_bs.html$', locker_views.LocListView.as_view(), name="view_locs"),
    url(r'^loc_edit/(?P<pk>\d+)$', locker_views.LocEditView.as_view(), name="edit_loc"),
]
