# -*- coding: utf-8 -*-
import re

from django.forms import ModelForm
from django.forms import CharField

from .models import Client, Item


class PhoneField(CharField):
    def to_python(self, value):
        value = super().to_python(value)
        value = re.sub(r'[^\w\s]+|[\s]', r'', value)
        return value


class ClientForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name == 'phone_number':
                field.widget.attrs['class'] = \
                    'form-control input-medium bfh-phone'
                field.widget.attrs['data-format'] = '+7 (ddd) dd-dd-ddd'
            else:
                field.widget.attrs['class'] = 'form-control'

    phone_number = PhoneField(label='Телефон')

    class Meta:
        model = Client
        fields = ['phone_number', 'last_name', 'name', 'address']


class ItemForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if 'amount' in field_name:
                field.widget.attrs['class'] = 'form-control quantity'
            elif 'cost' in field_name:
                field.widget.attrs['class'] = 'form-control cost'
            else:
                field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = Item
        fields = ['name', 'amount', 'cost']

    class Media:
        js = ('js/sum_order.js', 'js/change_fields_order.js')
