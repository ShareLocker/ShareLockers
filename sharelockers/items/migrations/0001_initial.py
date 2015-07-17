# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import items.models


class Migration(migrations.Migration):

    dependencies = [
        ('lockers', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('photo', models.ImageField(blank=True, upload_to=items.models.upload_photo_to, default=None, null=True)),
                ('locker', models.ForeignKey(null=True, to='lockers.Locker', blank=True)),
                ('owner', models.ForeignKey(to='profiles.Profile')),
            ],
        ),
    ]
