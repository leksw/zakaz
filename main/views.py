# -*- coding: utf-8 -*-
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormMixin, UpdateView
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.http import JsonResponse


from .models import Client, Order, Item
from .forms import ClientForm, AddOrder


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
    if request.method == 'POST':
        form = AddOrder(request.POST)
        
        if form.is_valid():
            phone_number = form.cleaned_data.get('phone_number')
            name = form.cleaned_data.get('name')
            last_name = form.cleaned_data.get('last_name')
            address = form.cleaned_data.get('address')
            item = form.cleaned_data.get('item')
            quantity = form.cleaned_data.get('quantity')
            cost = form.cleaned_data.get('cost')
            
            client = Client(
                phone_number = phone_number,
                name = name, last_name = last_name,
                address = address)
            client.save()
            
            order = Order(client=client)
            order.save()
            
            item = Item(
                name=item,
                amount=quantity,
                cost=cost,
                order=order)
            item.save()    

            return HttpResponseRedirect('/')
    else:
        form = AddOrder()

    return render(request, 'add_order_form.html', {'form': form})

def archive(request):
    if request.method == 'GET':
        id = request.GET['id']
        if id:
            item = Order.objects.get(id=int(id))
            item.archive = True
            item.save()

            return JsonResponse({'all':'ok'})        
