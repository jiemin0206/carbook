import os
import pandas as pd

from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import ChatGoogleGenerativeAI,HarmBlockThreshold,HarmCategory
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

os.environ["GOOGLE_API_KEY"] = "AIzaSyCnugJnCVtKfUcxNeWMPsa2UkdoSa0hG4Y"
os.environ['LANGCHAIN_TRACING_V2'] = 'true'
os.environ['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com'
os.environ['LANGCHAIN_API_KEY'] = 'ls__90bd0489414a44c79613d3421f2c9fc8'

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# LLM
llm = ChatGoogleGenerativeAI(temperature=0, model="gemini-pro",
    safety_settings={
        HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        })

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# search function
def process_query(user_input):
    global vectorstore
    global llm

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})

    template = """You are an customer service assistant for question-answering tasks.
                  Answer the question based only on the following context delimited by triple backtick.
                  context:```{context}```
                  If you cannot find the answer, tell them to be more precise.
                  You should reply in a friendly way.
                  Your should also provide the website link in the following format:
                  Org Name https://sacommunity.org/org/Org ID
                  Question: {question}
                  Answer:
                """
    prompt = ChatPromptTemplate.from_template(template)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    answer = ''

    for chunk in rag_chain.stream(user_input):
        answer += chunk

    return answer

app = Flask(__name__)
CORS(app)

@app.route('/chatbot', methods=['POST'])
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
    response = process_query(user_input)
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) # Allows access from any IP for network testing

