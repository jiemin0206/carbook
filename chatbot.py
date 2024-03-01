
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = 'AIzaSyB13pZm892gnIBX9_u5P4phILwuSQZgy0E'
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-pro")

@app.route('/chatbot', methods=['POST', 'OPTIONS'])
def chatbot_response():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, headers)  # Respond to preflight request with empty body

    data = request.json
    user_input = data['userInput']
    response = model.generate_content([user_input])
    return jsonify({'reply': response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
