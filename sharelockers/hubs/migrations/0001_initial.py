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
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('secret_key', models.CharField(max_length=255, db_index=True)),
                ('ip', models.CharField(max_length=255, db_index=True, null=True)),
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
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='hub',
            name='location',
            field=models.ForeignKey(to='hubs.Location'),
        ),
    ]
