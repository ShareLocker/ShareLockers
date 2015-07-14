from django.conf.urls import url
<<<<<<< HEAD
import profiles.views as profiles_views
=======
from profiles import views as users_views
from profiles.views import ReservationCreateView
>>>>>>> a6e3452948c97c597963e8d1048bb5c055e843fe
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^register/$', profiles_views.user_register, name="user_register"),
    url(r'^login/$',  'django.contrib.auth.views.login',  name='view_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
<<<<<<< HEAD
    url(r'^charge/$', profiles_views.stripe_charge_view),
=======
    url(r'^my_items.html$', users_views.SelfInventoryView.as_view(),
                                    name='self_inventory'),
    url(r'^make_reservation(?P<pk>\d+).html$', users_views.ReservationCreateView.as_view(),
                                    name='make_reservation'),
>>>>>>> a6e3452948c97c597963e8d1048bb5c055e843fe
]
