# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
        ('lockers', '0001_initial'),
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('payment_method', models.CharField(default='CC', max_length=255)),
                ('buyer', models.ForeignKey(related_name='bought_item', related_query_name='bought_item_set', to='profiles.Profile')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='sold_item', related_query_name='sold_item_set', to='profiles.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('instructions', models.TextField(blank=True, null=True)),
                ('status', models.IntegerField(choices=[(1, 'outstanding'), (2, 'rejected'), (3, 'withdrawn'), (4, 'expired')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ended_at', models.DateTimeField(blank=True, null=True)),
                ('buyer', models.ForeignKey(related_name='want', related_query_name='want_set', to='profiles.Profile')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='requested', related_query_name='requested_set', to='profiles.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('instructions', models.TextField(blank=True, null=True)),
                ('code', models.CharField(max_length=255, db_index=True)),
                ('email', models.EmailField(max_length=254, blank=True, null=True)),
                ('status', models.IntegerField(choices=[(1, 'reserved'), (2, 'halted'), (3, 'abandoned'), (4, 'processed')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ended_at', models.DateTimeField(blank=True, null=True)),
                ('buyer', models.ForeignKey(blank=True, null=True, related_query_name='ready_set', related_name='ready', to='profiles.Profile')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='stocked', related_query_name='stocked_set', to='profiles.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Unlock',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, primary_key=True, verbose_name='ID')),
                ('waiting', models.BooleanField(default=True)),
                ('by_proxy', models.BooleanField(default=False)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('locker', models.ForeignKey(null=True, to='lockers.Locker')),
                ('profile', models.ForeignKey(to='profiles.Profile')),
            ],
        ),
    ]
