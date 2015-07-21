from django.conf.urls import include, url
import profiles.views as profiles_views
from profiles import views as users_views
from profiles.views import ReservationCreateView
from django.contrib.auth.decorators import login_required
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^register/$', profiles_views.user_register, name="user_register"),
    url(r'^login/$', 'django.contrib.auth.views.login', name='view_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='view_logout'),
    url(r'^charge/$', profiles_views.stripe_charge_view),
    # Reservation management pages
    url(r'^reservations/$', login_required(users_views.SelfInventoryView.as_view()),
                            name='self_inventory'),
    url(r'^reservations/create/r=(?P<pk>\d+)$', login_required(users_views.ReservationCreateView.as_view()),
                            name='make_reservation'),
    url(r'^reservations/delete/r=(?P<pk>\d+)$', login_required(users_views.ReservationDeleteView.as_view()),
                            name='delete_reservation'),
    # Request management pages
    url(r'^requests/$', login_required(users_views.SelfRequestView.as_view()),
                            name='self_requests'),
    url(r'^requests/delete/q=(?P<pk>\d+)$', login_required(users_views.RequestDeleteView.as_view()),
                            name='delete_request'),
]
