# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import (
    OrderListView, OrderDetailView, add_order, archive, change_order)


urlpatterns = [
    url(r'^$', OrderListView.as_view(), name='order-list'),
    url(r'^order/(?P<pk>[0-9]+)/$',
        OrderDetailView.as_view(), name='order-detail'),
    url(r'^add/$', add_order, name='order-add'),
    url(r'^change/(?P<pk>[0-9]+)/$', change_order, name='order-change'),
    url(r'^archive_ajax/$', archive, name='order-archive'),
]
