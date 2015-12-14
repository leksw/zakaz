# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-14 09:00
from __future__ import unicode_literals

from django.db import migrations
from django.core.management import call_command


def loadfixture(apps, schema_editor):
    call_command('loaddata', 'data.xml')


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(loadfixture),
    ]