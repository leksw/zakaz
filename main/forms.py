# -*- coding: utf-8 -*-
import re

from django.forms import ModelForm
from django import forms
from django.forms import CharField

from .models import Client, Item


class PhoneField(CharField):
    def to_python(self, value):
        value = super().to_python(value)
        value = re.sub(r'[^\w\s]+|[\s]', r'', value)
        return value


class AddOrder(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if field_name == 'phone_number':
                field.widget.attrs['class'] = \
                    'form-control input-medium bfh-phone'
                field.widget.attrs['data-format'] = '+7 (ddd) dd-dd-ddd'
            else:
                if field_name == 'quantity':
                    field.widget.attrs['class'] = 'form-control quantity'
                elif field_name == 'cost':
                    field.widget.attrs['class'] = 'form-control cost'
                else:
                    field.widget.attrs['class'] = 'form-control'

    phone_number = PhoneField(label='Телефон')
    last_name = forms.CharField(label='Фамилия', max_length=100)
    name = forms.CharField(label='Имя', max_length=100)
    address = forms.CharField(
        label='Адрес', max_length=100, widget=forms.Textarea(
            attrs={'rows': '5'}))
    item = forms.CharField(label='Товар', max_length=100)
    quantity = forms.CharField(label='Количество', max_length=100)
    cost = forms.CharField(label='Стоимость', max_length=100)

    def clean_phone_number(self):
        data = self.cleaned_data['phone_number']
        if len(data) < 11:
            raise forms.ValidationError('Phone number must have 11 numbers!')
        return data


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
