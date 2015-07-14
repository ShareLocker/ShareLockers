from django.conf.urls import url
from profiles import views as users_views
from profiles.views import ReservationCreateView
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^register/$', users_views.user_register, name="user_register"),
    url(r'^login/$',  'django.contrib.auth.views.login',  name='view_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    url(r'^my_items.html$', users_views.SelfInventoryView.as_view(),
                                    name='self_inventory'),
    url(r'^make_reservation(?P<pk>\d+).html$', users_views.ReservationCreateView.as_view(),
                                    name='make_reservation'),
]
