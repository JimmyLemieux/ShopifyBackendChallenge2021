import bs4
import requests
import base64
from base64 import b64encode
import io
import re
import json
import os.path
from bs4 import BeautifulSoup
import os
from google.cloud import vision
from google.cloud.vision_v1 import types

class ImageRepo:

    JsonBlockImages = []
    IMAGE_JSON_DUMP_PATH = './images.json'
    
    #set up google env variable
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'total-service-312222-d9f7c9b9eac0.json'



    def __init__(self):
        if os.path.isfile(self.IMAGE_JSON_DUMP_PATH) and os.stat(self.IMAGE_JSON_DUMP_PATH) != 0:
            with io.open(self.IMAGE_JSON_DUMP_PATH) as f:
                try:
                    self.JsonBlockImages = json.loads(f.read())
                except:
                    print("JSON not in file")
                    return
        # populate this data from the file
        pass
    
    #google cloud vision detect tags in an image

    def detect_labels_image(self, imageUrl):
        client = vision.ImageAnnotatorClient()
        image = vision.Image()
        image.source.image_uri= imageUrl

        response = client.label_detection(image=image)
        labels = response.label_annotations
        print('Labels:')
        response_labels = []
        for label in labels:
            response_labels.append(label.description)
            print (label.description)
        return response_labels
    
    def convertBase64ToImage(self, imageUrl):
        baseUrl = base64.b64encode(requests.get(imageUrl).content)
        i = base64.b64decode(baseUrl)
        i = io.BytesIO(i)

    def downloadSingle(self, imageUrl, name, tags):
        #decode the base64
        baseUrl = base64.b64encode(requests.get(imageUrl).content)

        imgObjectToSave = {
            "name": name,
            "tags": tags,
            "imageUrl": imageUrl
        }
        block = json.dumps(imgObjectToSave)
        self.JsonBlockImages.append(json.dumps(imgObjectToSave))
        self.dumpNewImageToJson()
        return block
    
    def downloadBatchPage(self, pageUrl):
        response = requests.get(pageUrl)
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img')
        print (soup.prettify())

        urls = [img['src'] for img in img_tags]

        for url in urls:
            imgObjectToSave = {
                "name": "Batch Image",
                "tags": [],
                "imageUrl": url
            }
            self.JsonBlockImages.append(json.dumps(imgObjectToSave))

        # for url in urls:
        #     filename = re.search(r'/([\w_-]+[.](jpg|gif|png|.))$', url)
        #     if not filename:
        #         print ("The regex did not match this file")
        #         continue
    

    def getImagesByTags(self, tags):
        jsonImageBlocksMatch = []
        print (len(self.JsonBlockImages))
        for block in self.JsonBlockImages:
            jsonObject = json.loads(block)
            jsonTags = jsonObject["tags"]
            for t in jsonTags:
                if t in tags:
                    jsonImageBlocksMatch.append(block)
                    break
        return jsonImageBlocksMatch
    
    def getImages(self):
        return self.JsonBlockImages

    #this should happend if a save button is pressed
    def dumpNewImageToJson(self):
        print("this is here")
        print(len(self.JsonBlockImages))
        with io.open(self.IMAGE_JSON_DUMP_PATH, 'w', encoding='utf-8') as f:
            json.dump(self.JsonBlockImages, f)
        pass
