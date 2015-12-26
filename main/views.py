# -*- coding: utf-8 -*-
from django.views.generic import ListView, DetailView
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponseBadRequest
from django.forms.models import modelformset_factory

from .models import Order, Item
from .forms import ClientForm, ItemForm
from .utils import get_dict_errors_formset


class OrderListView(ListView):
    queryset = Order.objects.amount()
    template_name = 'order_list.html'


class OrderDetailView(DetailView):
    model = Order
    template_name = 'order_detail.html'


class OrderUpdateView(ListView):
    template_name = 'change_order_form.html'

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        self.order = Order.objects.get(id=pk)
        return Item.objects.filter(order=self.order)


def add_order(request):
    content = {}
    Itemformset = modelformset_factory(
        Item, form=ItemForm, can_delete=True,
        max_num=1, min_num=1, validate_min=True)

    if request.method == 'POST':
        form = ClientForm(request.POST)
        formset = Itemformset(request.POST)

        if form.is_valid() and formset.is_valid():
            client = form.save()
            order = Order(client=client)
            order.save()

            instances = formset.save(commit=False)
            for item in instances:
                item.order = order
                item.save()
            for obj in formset.deleted_objects:
                obj.delete()
        else:
            return HttpResponseBadRequest(
                get_dict_errors_formset(formset, form))

    else:
        form = ClientForm()
        content['form'] = form

        formset = Itemformset(queryset=Item.objects.none())
        content['formset'] = formset

    return render(request, 'add_order_form.html', content)


def change_order(request, pk):
    content = {'pk': pk}
    order = Order.objects.get(id=int(pk))
    item = Item.objects.filter(order=order)

    Itemformset = modelformset_factory(
        Item, form=ItemForm, can_delete=True,
        max_num=1, min_num=1, validate_min=True)

    if request.method == 'POST':
        form = ClientForm(request.POST)
        formset = Itemformset(request.POST)

        if form.is_valid() and formset.is_valid():
            if form.has_changed():
                form.save()

            if formset.has_changed():
                instances = formset.save(commit=False)
                for item in instances:
                    item.order = order
                    item.save()
                for obj in formset.deleted_objects:
                    obj.delete()
        else:
            return HttpResponseBadRequest(
                get_dict_errors_formset(formset, form))
    else:
        formset = Itemformset(queryset=item)
        content['formset'] = formset

        form = ClientForm(initial=order.client.get_dict_object())
        content['form'] = form

    return render(request, 'change_order_form.html', content)


def archive(request):
    if request.method == 'GET':
        id = request.GET['id']
        if id:
            item = Order.objects.get(id=int(id))
            item.archive = True
            item.save()

            return JsonResponse({'all': 'ok'})
