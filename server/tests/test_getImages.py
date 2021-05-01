import json

def test_getImages(app, client):
    res = client.get('/getImages')
    assert res.status_code == 200