from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from decouple import config
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate

openai_api_key = config('API_KEY')
if openai_api_key is None or openai_api_key == "":
        print("API_KEY is not set")
        exit(1)

print(openai_api_key)
# Create a Flask app instance
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

template = """You are an expert strategic communication assistant.
Current conversation:
User: {history}
Strategico: {input}
"""

SYSPROMPT = PromptTemplate(
     input_variables=["history", "input"],
     template=template
)

llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo", openai_api_key=openai_api_key)
memory = ConversationBufferMemory()
conversation = ConversationChain(
     prompt=SYSPROMPT,
     llm=llm, 
     verbose=False, 
     memory=memory)

# Route for the root path ('/') of the website
# Render the index.html template when the root path is accessed
@app.route('/')
def index():
    return send_from_directory(os.path.join(app.root_path, 'public'), 'index.html')

# Route for the message processing
@app.route('/process_message', methods=['POST'])
def process_message():
    data = request.get_json()
    user_prompt = data.get('message', '')
    response = conversation.predict(input=user_prompt)
    return jsonify({'response': response})


# Start the Flask app with debug mode enabled
if __name__ == '__main__':
    app.run(debug=True)
