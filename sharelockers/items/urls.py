from django.conf.urls import url
from items import views as item_views

urlpatterns = [
    url(r'^marketplace/(\?h=(?P<pk>\d+))?$', item_views.MarketplaceView.as_view(),
        name="view_marketplace"),
    url(r'^requests/create/q=(?P<pk>\d+)$', item_views.RequestCreateView.as_view(),
        name="make_request"),
    url(r'^items/create/$', item_views.ItemCreateView.as_view(),
        name="make_item"),
    url(r'^reservations/seller/r=(?P<pk>\d+)$', item_views.ReservationSellerView.as_view(),
        name="reservation_seller_detail"),
    url(r'^reservations/buyer/r=(?P<pk>\d+)$', item_views.ReservationBuyerView.as_view(),
        name="reservation_buyer_detail"),
    url(r'^reservations/email/r=(?P<pk>\d+)/(?P<code>\w+)$',
        item_views.ReservationHashView.as_view(), name="reservation_buyer_detail"),
]
