from django.db import models
from hubs.models import Hub
from profiles.models import Profile


class Locker(models.Model):
    hub = models.ForeignKey(Hub)
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
    row = models.IntegerField()
    owner = models.ForeignKey(Profile, null=True) # FIXME remove after MVP

    class Meta:
        unique_together = ('hub', 'row', 'column',)

    def __str__(self):
        return 'h:{}-c:{}-r:{}'.format(self.hub, self.column, self.row)