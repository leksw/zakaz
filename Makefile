manage=python manage.py

flake8=flake8 --max-complexity=7

run:
	PYTHONPATH=$(PYTHONPATH) $(manage) runserver $(IP):$(PORT)

test:
	$(flake8) --exclude=migrations,settings.py main order
	PYTHONPATH=$(PYTHONPATH) $(manage) test

migrate:
	PYTHONPATH=$(PYTHONPATH) $(manage) migrate

makemigrations:
	PYTHONPATH=$(PYTHONPATH) $(manage) makemigrations