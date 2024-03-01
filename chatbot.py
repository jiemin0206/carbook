
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = 'AIzaSyB13pZm892gnIBX9_u5P4phILwuSQZgy0E'
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-pro")

@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    data = request.json
    user_input = data['userInput']
    response = model.generate_content([user_input])
    return jsonify({'reply': response.text})

if __name__ == '__main__':
    app.run(debug=True)
