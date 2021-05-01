all: dep start


server:
	export FLASK_APP=main.py
	flask run
dep:
	pip3 install -r requirements.txt

start:
	python3 main.py