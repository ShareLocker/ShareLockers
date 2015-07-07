from django.db import models
from hubs.models import Hub


class Locker(models.Model):
    hub = models.ForeignKey(Hub)
    row = models.IntegerField()
    column_options = (
        (1, 'A'),
        (2, 'B'),
        (3, 'C'),
        (4, 'D'),
        (5, 'E'),
        (6, 'F'),
        (7, 'G'),
        (8, 'H')
    )
    column = models.IntegerField(choices=column_options)

    class Meta:
        unique_together = ('hub', 'row', 'column',)
