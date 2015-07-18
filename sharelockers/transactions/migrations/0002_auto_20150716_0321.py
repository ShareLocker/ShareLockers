# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='code',
            field=models.CharField(default='asdfefoe', max_length=255, db_index=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='reservation',
            name='instructions',
            field=models.TextField(null=True, blank=True),
        ),
    ]
