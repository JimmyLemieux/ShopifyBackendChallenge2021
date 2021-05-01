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