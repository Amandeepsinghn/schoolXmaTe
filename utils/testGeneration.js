const axios = require("axios");
require("dotenv").config();

const testGeneration = async (subject, title, difficulty) => {
  headers = {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    "Content-Type": "application/json",
  };

  data = {
    model: "Compound-Beta", // Change this to gpt-4 for more structured outputs
    messages: [
      {
        role: "system",
        content:
          "You are an expert educational test generator. Your only task is to create high-quality multiple-choice tests in valid JSON format.",
      },
      {
        role: "user",
        content: `
        Create a multiple-choice test on the subject of ${subject}, focusing specifically on ${title}. Generate exactly 10 questions based on difficulty level ${difficulty}. Each question should have:
        
        - A clear and concise question text.
        - An "options" object containing exactly 4 options labeled "A", "B", "C", and "D". The options should be structured like this:
            "options": [{ "A": "option_text", "B": "option_text", "C": "option_text", "D": "option_text" }]
        - The correct answer indicated by a string key ("A", "B", "C", or "D").
        
        Return only valid JSON in the following format:
        
        {
            "title": "<Short, descriptive title>",
            "questions": [
            {
                "question": "<Question text>",
                "options": 
                {
                    "A": "Option A text",
                    "B": "Option B text",
                    "C": "Option C text",
                    "D": "Option D text"
                },
                "correct_option": "<A|B|C|D>"
            },
            ...
            ]
        }
        
        Do not include any explanations, comments, or formatting outside the JSON. Ensure the provided JSON is both syntactically correct (no missing brackets, commas, quotes, etc.) and structurally valid (proper nesting, consistent key-value formatting, valid data types).
        `,
      },
    ],
    temperature: 0.7,
    max_tokens: 2048,
  };
  const result = await generateTest(data, headers);
  return result;
};

const generateTest = async (data, headers) => {
  try {
    const response = await axios.post(process.env.GROQ_API_URL, data, { headers });
    const test = response.data.choices[0].message.content;

    const result = test.replace("\n", "");
    const finalResult = JSON.parse(result);

    return finalResult;
  } catch (error) {
    console.log(error);
    return "Please try again later";
  }
};

module.exports = { testGeneration };
