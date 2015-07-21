# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('hubs', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rating', models.IntegerField(default=0, null=True)),
                ('description', models.TextField(null=True, max_length=255)),
                ('alias', models.CharField(max_length=255)),
                ('credits', models.DecimalField(default=100, max_digits=5, decimal_places=2)),
                ('location', models.ForeignKey(null=True, to='hubs.Location')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
