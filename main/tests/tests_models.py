from django.test import TestCase

from ..models import Client


class TestClientModel(TestCase):
    fixtures = []

    def setUp(self):
        Client.objects.create(
            phone_number='123456789012',
            name='Василий',
            last_name='Васюков',
            address='ул. Василевская, 4')

    def test_client_model(self):
        vasya = Client.objects.get(name='Василий')
        self.assertEqual(str(vasya), 'Васюков')
        self.assertEqual(vasya.full_name(), 'Васюков Василий')
        self.assertEqual(vasya.phone_number, '123456789012')
        self.assertEqual(vasya.address, 'ул. Василевская, 4')
