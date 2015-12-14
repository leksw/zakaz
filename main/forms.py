# -*- coding: utf-8 -*-
import re

from django.forms import ModelForm
from django import forms
from django.forms import CharField

from .models import Client


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
                field.widget.attrs['class'] = 'form-control input-medium bfh-phone'
                field.widget.attrs['data-format'] = '+7 (ddd) dd-dd-ddd'
            else:
                field.widget.attrs['class'] = 'form-control'
    
    phone_number = PhoneField(label='Телефон')
    last_name = forms.CharField(label='Фамилия', max_length=100)
    name = forms.CharField(label='Имя', max_length=100)
    address = forms.CharField(
        label='Адрес', max_length=100, widget=forms.Textarea(attrs={'rows': '5'}))
    item = forms.CharField(label='Товар', max_length=100)
    quantity = forms.CharField(label='Количество', max_length=100)
    cost = forms.CharField(label='Стоимость', max_length=100)


class ClientForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'

    class Meta:
        model = Client
        fields = ['phone_number', 'last_name', 'name', 'address']
