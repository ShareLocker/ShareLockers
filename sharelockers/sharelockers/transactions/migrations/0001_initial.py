# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('price', models.DecimalField(max_digits=5, decimal_places=2)),
                ('payment_method', models.CharField(max_length=255)),
                ('buyer', models.ForeignKey(related_query_name='bought_item_set', related_name='bought_item', to='profiles.Profile')),
                ('item', models.ForeignKey(to='items.Item')),
                ('seller', models.ForeignKey(related_query_name='sold_item_set', related_name='sold_item', to='profiles.Profile')),
            ],
        ),
    ]
