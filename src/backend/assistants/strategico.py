from flask import Blueprint, request, jsonify
from decouple import config
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate

strategico_blueprint = Blueprint('strategico', __name__)  # create a blueprint

openai_api_key = config('API_KEY')
if openai_api_key is None or openai_api_key == "":
        print("API_KEY is not set")
        exit(1)

template = """You are an expert strategic communication assistant.
{history}
{input}
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


@strategico_blueprint.route('/api/v1/strategico', methods=['POST'])


def strategico():
    data = request.get_json()
    user_prompt = data.get('message', '')
    response = conversation.predict(input=user_prompt)
    return jsonify({'message': response})
