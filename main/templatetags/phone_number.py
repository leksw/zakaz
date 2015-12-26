# -*- coding: utf-8 -*-
from django.template import Library


register = Library()


@register.filter
def phone_format(value):
    if not value:
        return ''
    return '+%s (%s) %s-%s-%s' % (
        value[0], value[1:4], value[5:7], value[8:10], value[-3:])
