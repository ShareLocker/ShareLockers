# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hub',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('secret_key', models.CharField(max_length=255)),
                ('occupied', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('description', models.CharField(max_length=255)),
                ('latitude', models.FloatField(null=True, blank=True)),
                ('longitude', models.FloatField(null=True, blank=True)),
                ('host', models.ForeignKey(related_name='managed_location', to='profiles.Profile', null=True)),
                ('residents', models.ManyToManyField(related_query_name='nearby_locations', to='profiles.Profile', related_name='nearby_location')),
            ],
        ),
        migrations.AddField(
            model_name='hub',
            name='location',
            field=models.ForeignKey(to='hubs.Location'),
        ),
    ]
