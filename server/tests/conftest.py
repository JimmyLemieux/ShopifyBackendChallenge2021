import pytest
from flask import Flask, request, jsonify


import main as flaskr


@pytest.fixture
def client(app):
	with flaskr.app.test_client() as client:
		yield client
