from django.conf.urls import url
from items import views as item_views

urlpatterns = [
    url(r'^marketplace(?P<pk>\d+).html$', item_views.MarketplaceView.as_view(),
                                                name="view_marketplace"),
    url(r'^make_request(?P<pk>\d+).html$', item_views.RequestCreateView.as_view(),
                                                name="make_request"),
]
