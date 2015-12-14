# -*- coding: utf-8 -*-
from django.db import models
from django.core.urlresolvers import reverse
from django.db.models import Sum, F

class Client(models.Model):
    phone_number = models.CharField('Телефон', max_length=12)
    name = models.CharField('Имя', max_length=50)
    last_name = models.CharField('Фамилия', max_length=50)
    address = models.TextField('Адрес')

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

    def __str__(self):
        return self.last_name

    def full_name(self):
        return '%s %s' % (self.last_name, self.name)

class OrderQuerySet(models.QuerySet):
    def amount(self):
        return self.annotate(amount=Sum(F('items__cost')*F('items__amount')))

class Order(models.Model):
    add_date = models.DateTimeField('Дата заказа', auto_now_add=True)
    last_change_date = models.DateTimeField('Дата изменения', auto_now=True)
    client = models.ForeignKey(
        Client, related_name='orders', verbose_name='Заказчик')
    archive = models.BooleanField('В архив', default=False)
    
    objects = OrderQuerySet.as_manager()
    
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        ordering = ('-add_date',)

    def __str__(self):
        return str(self.id)

    def get_absolute_url(self):
        return reverse('order:order-detail', args=(self.pk,))


class Item(models.Model):
    name = models.CharField('Товар', max_length=255)
    cost = models.FloatField('Цена', max_length=255)
    amount = models.FloatField('Количество', max_length=255)
    order = models.ForeignKey(Order, related_name='items', verbose_name='Заказ')

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

    def __str__(self):
        return str(self.name)

    def get_absolute_url(self):
        return reverse('order:item-detail', args=(self.pk,))
