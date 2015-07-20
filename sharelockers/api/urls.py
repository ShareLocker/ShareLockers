from django.conf.urls import include, url
from rest_framework import routers
from api import views
# import profiles.views

router = routers.DefaultRouter()
router.register(r'lockers', views.LockerViewSet, base_name="lockers")
router.register(r'profiles', views.ProfileViewSet, base_name="profiles")
router.register(r'hubs', views.HubViewSet, base_name="hubs")
router.register(r'owneditems', views.OwnedItemViewSet, base_name="owneditems")
router.register(r'unlocks', views.UnlockViewSet, base_name="unlocks")
router.register(r'purchases', views.PurchaseViewSet, base_name="purchases")

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/mycredits/$', views.my_credits_view),
]
