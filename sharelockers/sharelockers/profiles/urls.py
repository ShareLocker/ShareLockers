from django.conf.urls import url
from profiles import views as users_views
# from django.views.generic import RedirectView

urlpatterns = [
    url(r'^register/$', users_views.user_register, name="user_register"),
    url(r'^login/$',  'django.contrib.auth.views.login',  name='view_login'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', name='view_logout'),
]
