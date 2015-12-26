from django.contrib import admin

from .models import Client, Item, Order


class ItemInline(admin.TabularInline):
    model = Item


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    pass


def make_unarchived(modeladmin, request, queryset):
    queryset.update(archive=False)
make_unarchived.short_description = "Mark item as unarchive"


def make_archived(modeladmin, request, queryset):
    queryset.update(archive=True)
make_archived.short_description = "Mark item as archive"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'add_date', 'last_change_date', 'archive')
    list_editable = ('archive',)
    actions = [make_unarchived, make_archived]

    inlines = [
        ItemInline,
    ]


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'amount', 'cost')
