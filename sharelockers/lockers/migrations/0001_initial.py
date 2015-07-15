# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0001_initial'),
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Locker',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('column', models.IntegerField(choices=[(1, 'A'), (2, 'B'), (3, 'C'), (4, 'D'), (5, 'E'), (6, 'F'), (7, 'G'), (8, 'H')])),
                ('row', models.IntegerField()),
                ('hub', models.ForeignKey(to='hubs.Hub')),
                ('owner', models.ForeignKey(to='profiles.Profile', null=True)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='locker',
            unique_together=set([('hub', 'row', 'column')]),
        ),
    ]
