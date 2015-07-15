# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
        ('lockers', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('payment_method', models.CharField(max_length=255, default='CC')),
                ('buyer', models.ForeignKey(related_name='bought_item', to='profiles.Profile', related_query_name='bought_item_set')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='sold_item', to='profiles.Profile', related_query_name='sold_item_set')),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('instructions', models.TextField(blank=True, null=True)),
                ('status', models.IntegerField(choices=[(1, 'outstanding'), (2, 'rejected'), (3, 'withdrawn'), (4, 'expired')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ended_at', models.DateTimeField(blank=True, null=True)),
                ('buyer', models.ForeignKey(related_name='want', to='profiles.Profile', related_query_name='want_set')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='requested', to='profiles.Profile', related_query_name='requested_set')),
            ],
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('status', models.IntegerField(choices=[(1, 'reserved'), (2, 'halted'), (3, 'abandoned'), (4, 'processed')])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ended_at', models.DateTimeField(blank=True, null=True)),
                ('buyer', models.ForeignKey(related_name='ready', null=True, to='profiles.Profile', related_query_name='ready_set')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_name='stocked', to='profiles.Profile', related_query_name='stocked_set')),
            ],
        ),
        migrations.CreateModel(
            name='Unlock',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('waiting', models.BooleanField(default=True)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('locker', models.ForeignKey(to='lockers.Locker', null=True)),
                ('profile', models.ForeignKey(to='profiles.Profile')),
            ],
        ),
    ]
