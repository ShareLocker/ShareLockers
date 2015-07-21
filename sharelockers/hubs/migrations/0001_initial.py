# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hub',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('secret_key', models.CharField(max_length=255, db_index=True)),
                ('ip', models.CharField(null=True, max_length=255, db_index=True)),
                ('connected', models.BooleanField(default=False)),
                ('connected_at', models.DateTimeField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('polled_at', models.DateTimeField(auto_now_add=True)),
                ('waiting', models.BooleanField(default=False)),
                ('waiting_row', models.IntegerField(default=1)),
                ('waiting_col', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=255)),
                ('latitude', models.FloatField(null=True, blank=True)),
                ('longitude', models.FloatField(null=True, blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='hub',
            name='location',
            field=models.ForeignKey(to='hubs.Location'),
        ),
    ]
