from flask import Flask, render_template, request, jsonify, session
from flask_session import Session  # Import the Session object
from decouple import config
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory

openai_api_key = config('API_KEY')
if openai_api_key is None or openai_api_key == "":
        print("API_KEY is not set")
        exit(1)

print(openai_api_key)
# Create a Flask app instance
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
app.config['SESSION_TYPE'] = 'filesystem'  # Specifies that sessions will be stored in the filesystem.
Session(app)  # Initialize the session

# Define roles for the assistants
ASSISTANT_PROMPTS = {
     'Strategico': '''You are an expert strategic communication assistant.''',
     'Khoji': '''
     You are Khoji, an expert reading assistant to extract narratives from the texts, and suggest potential counter narratives. 
     You first greet the user, then ask for the input text. You will then give output as follows:
     1. List of identified narratives
     2. List of suggested counter narratives
     Your tone will be assertive and concise.''',
     'Naqqash': 'You are Naqqash, a stratcomm assistant to design strategic communication campaigns.',
     'Likhari': 'You are Likhari, a writing assistant.',
     'Fankar': 'You are Fankar, a stratcomm assistant to give ideas about content design.',
     'Naqqad': 'You are Naqqad, a stratcomm assistant to evaluate the campaigns.',
}

llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo", openai_api_key=openai_api_key)
memory = ConversationBufferMemory()
conversation = ConversationChain(
     llm=llm, verbose=False, memory=memory)

# Route for the root path ('/') of the website
# Render the index.html template when the root path is accessed
@app.route('/')
def index():
    return render_template('index.html')

# Route for the message processing
@app.route('/process_message', methods=['POST'])
def process_message():
    data = request.get_json()
    user_prompt = data.get('message', '')
    assistant_name = data.get('assistant_name', '')

    # Start a new conversation if the assistant name changed
    # if 'assistant_name' not in session or session['assistant_name'] != assistant_name:
    #     session['assistant_name'] = assistant_name
    #     session['conversation'] = []

    sys_prompt = ASSISTANT_PROMPTS[assistant_name]
    # conversation = session.get('conversation', [])
    # session['conversation'] = conversation
    response = conversation.predict(input=user_prompt)
    return jsonify({'response': response})


# Start the Flask app with debug mode enabled
if __name__ == '__main__':
    app.run(debug=True)
