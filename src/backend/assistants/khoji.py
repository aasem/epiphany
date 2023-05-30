from flask import Blueprint, request, jsonify
from decouple import config
from langchain import PromptTemplate, OpenAI
from langchain.chains import LLMChain

khoji_blueprint = Blueprint('khoji', __name__)  # create a blueprint

openai_api_key = config('OPENAI_KEY')  # use a unique key name to avoid conflicts
if openai_api_key is None or openai_api_key == "":
        print("API_KEY is not set")
        exit(1)

# initialize the OpenAI model
llm = OpenAI(temperature=0.3, model_name="gpt-3.5-turbo", openai_api_key=openai_api_key)

# Create the prompt template
template = """
I want you to act as a strategic communication expert. Extract a numeric list of major narratives and lines of pursuance for each narrative from the following text:

Text: {input_text}.
Narratives:
Lines of Pursuance:
"""

prompt_template = PromptTemplate(
    input_variables=["input_text"],
    template=template
    )

llm_chain = LLMChain(
      llm=llm, 
      prompt=prompt_template
      )

@khoji_blueprint.route('/api/v1/khoji', methods=['POST'])
def analyze_text():
    data = request.get_json()
    input_text = data.get('userInput', '')
    output_text = llm_chain.run({"input_text": input_text})
    return jsonify(output_text)