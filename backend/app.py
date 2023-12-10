from flask import Flask, request
from datetime import date
import requests
import json
import os
import re
import openai
from dotenv import load_dotenv
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

prompt_crime = "Check if the given text lies in the following categories 1) Crime - the given text has a crime description related data could be about (drug dealing, rape, women harassment, bribery, human trafficking), 2) Not Crime - the text has in general data not related to crime, 3) Spam - text contains spam or gibberish text basically something that does not make sense. Provide the output strictly in the ID form that is 1 if the text belongs to crime category, 2 if it belongs to non crime and 3 if is spam."

prompt_similarity = """Check if the two given texts are similiar or not. Strictly return only a json like {"similar":"yes"} if and only if the similarity percentage turns out to be greater than 70 percent else strictly return {"similar":"no"}"""

@app.route('/detectSpam', methods=["POST"])
@cross_origin(supports_credentials=True)
def crimenotcrime():
    if request.method == 'POST':
        data = request.get_json()
        chunk = data["chunk"]
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=(f"{prompt_crime}\n{chunk}"),
            temperature=0.5,
            max_tokens=1024,
            n=1,
            stop=None
        )

        services = response.choices[0]["text"].strip()
        temp = re.findall(r'\d+', services)
        res = list(map(int, temp))
        return ({"Class":res[0]})

@app.route('/detectSpam2', methods=["POST"])
@cross_origin(supports_credentials=True)
def crimecrime():
    if request.method == 'POST':
        data = request.get_json()
        chunk = data["chunk"]
        if chunk == "drug dealing":
            return ({"Class":1})
        if chunk == "child fight":
            return ({"Class":2})
        return ({"Class":3})

@app.route('/detectSimilarity', methods=["POST"])
def textsimilarity():
    if request.method == 'POST':
        data = request.get_json()
        chunk1 = data["chunk1"]
        chunk2 = data["chunk2"]
        count_yes = 0
        for chunk in chunk2:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=(f"{prompt_similarity}\n{chunk1}\n{chunk}"),
                temperature=0.5,
                max_tokens=1024,
                n=1,
                stop=None
            )

            services = response.choices[0]["text"].strip()
            final = services.find("{")
            services = json.loads(services[final:])
            if services["similar"].lower() == "yes":
                count_yes +=1
        return ({"Total count":len(chunk2),"Total matches":count_yes})

if __name__ == '__main__':
   app.run()