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
    owner = models.ForeignKey(Profile, null=True)  # FIXME remove after MVP

    class Meta:
        unique_together = ('hub', 'row', 'column',)

    def __str__(self):
        return 'h:{}-c:{}-r:{} :: {}'.format(self.hub, self.column, self.row, self.item_set.first())

    def local_code(self):
        ret_st = ""
        ret_st += self.get_column_display()
        ret_st += str(self.row)
        return ret_st

    def status(self, profile):
        if self.item_set.exists:
            item = self.item_set.all()[0]
            if item.owner == profile:
                return 2  # you own it
            else:
                if item.is_reserved():
                    if item.reserved_for(profile):
                        return 3  # reserved for you
                    else:
                        return 4  # reserved for someone else
                else:
                    return 1  # not yours, but not reserved, so you can buy
        else:
            return 0  # empty locker
