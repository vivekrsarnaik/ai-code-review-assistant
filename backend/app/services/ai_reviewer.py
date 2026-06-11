from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def review_code_with_ai(language: str, code: str):

    prompt = f"""
You are a senior software engineer performing a code review.

Review this {language} code.

Provide:
1. Bugs
2. Performance improvements
3. Security concerns
4. Best practices
5. Overall rating out of 10

Code:
{code}
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content