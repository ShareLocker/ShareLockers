from django.db import models
from items.models import Item
from profiles.models import Profile


class Purchase(models.Model):
    buyer = models.ForeignKey(Profile, related_name="bought_item", related_query_name="bought_item_set")
    seller = models.ForeignKey(Profile, related_name="sold_item", related_query_name="sold_item_set")
    date = models.DateTimeField(auto_now_add=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    item = models.ForeignKey(Item)
    payment_method = models.CharField(max_length=255)
