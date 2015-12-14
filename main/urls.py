# -*- coding: utf-8 -*-
from django.conf.urls import url

from .views import (
    OrderListView, OrderUpdateView, OrderDetailView, add_order, archive)


urlpatterns = [
    url(r'^$', OrderListView.as_view(), name='order-list'),
    url(r'^order/(?P<pk>[0-9]+)/$', OrderDetailView.as_view(), name='order-detail'),
    url(r'^add/$', add_order, name='order-add'),
    url(r'^change/(?P<pk>[0-9]+)/$',
        OrderUpdateView.as_view(),
        name='order-change'),
    url(r'^archive_ajax/$', archive, name='order-archive'),
    
]