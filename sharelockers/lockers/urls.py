from django.conf.urls import url
from lockers import views as locker_views
from django.views.generic import ListView
from lockers.models import Locker
from hubs.models import Hub
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^hub_list_bs.html$', ListView.as_view(
                                    model=Hub,
                                    template_name="lockers/hub_list_bs.html",
                                    context_object_name='hubs',
                                    paginate_by=30,
                                    ), name="view_hubs"),
]
