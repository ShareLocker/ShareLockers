from django.conf.urls import url
from profiles import views as users_views
from django.views.generic import RedirectView

urlpatterns = [
    url(r'^register/$', users_views.user_register, name="view_register"),
]