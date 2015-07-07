# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
        ('lockers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('locker', models.ForeignKey(to='lockers.Locker', null=True)),
                ('owner', models.ForeignKey(to='profiles.Profile')),
            ],
        ),
    ]
