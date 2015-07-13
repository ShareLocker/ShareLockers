from django.conf.urls import url
import profiles.views as profiles_views
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^register/$', profiles_views.user_register, name="user_register"),
    url(r'^login/$',  'django.contrib.auth.views.login',  name='view_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/'}),
    url(r'^charge/$', profiles_views.stripe_charge_view),
]
