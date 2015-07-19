# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_auto_20150718_0321'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='email',
            field=models.EmailField(max_length=254, null=True, blank=True),
        ),
    ]
