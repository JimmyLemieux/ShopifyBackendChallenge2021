# ShopifyBackendChallenge2021

## Preparing the server

```
cd server
pip3 install virtualenv
virtualenv env
source env/bin/activate #enable the virtual container
pip3 install -m requirements.txt
export FLASK_APP=main.py
make server
```

## Preparing the client

```
cd client
npm install
ng serve
Open the app on http://localhost:4200
```
## Running server side tests
```
python3 -m pytest
```

## Features

## Server endpoints (main.py)

```
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
from Repo.ImageRepo import ImageRepo #just use this to import the class from another file
import json
import asyncio


repo = ImageRepo()

@app.route('/addImage', methods=['POST'])
@cross_origin()
def save_image():
    data = request.json
    # print (data)
    tags = repo.detect_labels_image(data["imageUrl"])
    print ("from the controller: ")
    print (tags)
    resp = repo.downloadSingle(data["imageUrl"], data["name"], tags)
    return resp, 200

@app.route('/getImageByTag', methods=['POST'])
@cross_origin()
def getImageByTag():
    print (request.body)
    data = request.json
    tags = data["tags"]
    resp = repo.getImagesByTags(tags)
    return jsonify(resp)

@app.route('/getImages',  methods=['GET'])
@cross_origin()
def getImages():
    resp = repo.getImages()
    return jsonify(resp)

@app.route('/addImageBatchPage', methods=['POST'])
@cross_origin()
def imageBatchPage():
    print (request.json)
    data = request.json
    repo.downloadBatchPage(data["pageUrl"])
    repo.dumpNewImageToJson()
    return "done"

@app.route('/triggerSave', methods=['POST'])
@cross_origin()
def triggerSave():
    repo.dumpNewImageToJson()
    return "done"

@app.route('/generateImageTags', methods=['POST'])
@cross_origin()
def generateImageTags():
    data = request.json
    repo.detect_labels_image(data["imageUrl"])
    return "done"
```

## Server Side Features
- Basic Restful client that uses Python and Flask to provide Get and Post endpoints. 
- Persisting images with the use of a JSON file. Structured in such a way:
```
[
  {
	"name": "some_image_name_provided",
	"imageUrl": "where_the_image_is_coming_from",
	"tags": [
	  	"Google vision AI response tags"
	  	...
	  ]
  }
]
```
- Google Vision Ai Image classification is used to provide tags for an image (Account Suspended)

## Next Steps

- Remove the need for a static JSON file and to move to an RDS instance or somesort of DB
- Add more security and tests for the backend

## Example of adding Image to the Repo

![](CreateImages.gif)

## Example of Search Images and Image Retreival

![](SearchImages.gif)

## Please Note

- If you are planning to run this locally the upload image feature will not work. For security reasons, I have removed the Google Vision Ai Creds json from the repo.




