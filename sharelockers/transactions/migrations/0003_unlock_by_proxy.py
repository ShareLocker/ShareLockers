# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0002_auto_20150716_0321'),
    ]

    operations = [
        migrations.AddField(
            model_name='unlock',
            name='by_proxy',
            field=models.BooleanField(default=False),
        ),
    ]
