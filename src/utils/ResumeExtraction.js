
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // assumes your env variable is set
});

exports.getKeywordsFromAI = async (jobPosition) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // Use 'gpt-4o', 'gpt-4', or 'gpt-3.5-turbo'
    messages: [
      {
        role: 'system',
        content: 'You are an AI assistant that extracts key skills and keywords for job positions.',
      },
      {
        role: 'user',
        content: `List the key skills and keywords for the job position: "${jobPosition}" in a comma separated format.`,
      },
    ],
    temperature: 0.3,
    max_completion_tokens: 100,
  });

  // Correct field to access in chat API response
  if (response.choices && response.choices.length > 0) {
    return response.choices[0].message.content
      .split(',')
      .map(keyword => keyword.trim())
      .filter(Boolean);
  }
  return [];
};

