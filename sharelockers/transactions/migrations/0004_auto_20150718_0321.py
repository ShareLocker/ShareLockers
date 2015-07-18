# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_unlock_by_proxy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='buyer',
            field=models.ForeignKey(blank=True, related_query_name='ready_set', related_name='ready', to='profiles.Profile', null=True),
        ),
    ]
