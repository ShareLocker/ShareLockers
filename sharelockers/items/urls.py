from django.conf.urls import url
from items import views as item_views

urlpatterns = [
    url(r'^marketplace(?P<pk>\d+).html$', item_views.MarketplaceView.as_view(),
        name="view_marketplace"),
    url(r'^make_request(?P<pk>\d+).html$', item_views.RequestCreateView.as_view(),
        name="make_request"),
    url(r'^make_item.html$', item_views.ItemCreateView.as_view(),
        name="make_item"),
    url(r'^reservation_s_(?P<pk>\d+).html$', item_views.ReservationSellerView.as_view(),
        name="reservation_seller_detail"),
    url(r'^reservation_b_(?P<pk>\d+).html$', item_views.ReservationBuyerView.as_view(),
        name="reservation_buyer_detail"),
    url(r'^reservation_h_(?P<pk>\d+).html/(?P<code>\w+)$',
        item_views.ReservationHashView.as_view(), name="reservation_buyer_detail"),
]
