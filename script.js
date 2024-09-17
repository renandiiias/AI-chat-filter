// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// Function to verify the message using GPT-4
async function verifyMessage(message) {
  const prompt = `
You are a content filter for a chat application. Analyze the following message and determine if it contains:

- Any form of profanity or offensive language, even if disguised using special characters, numbers, other languages, or combinations thereof.
- Terms related to "scam", "do not buy", or any similar or remotely related expressions.

If the message violates any of these rules, respond with "1".

If the message is clean and does not violate any rules, respond with "2".

Do not provide any additional explanation.

Message: "${message}"

Response:
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1,
      temperature: 0,
    }),
  });

  const data = await response.json();
  const result = data.choices[0].message.content.trim();
  return result;
}

// Function to send the message after verification
async function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  // Verify the message
  const result = await verifyMessage(message);

  if (result === '2') {
    // Message approved
    console.log('Message sent:', message);
    // Add your code here to send the message to the chat
  } else {
    // Message blocked
    alert('Your message contains prohibited content and cannot be sent.');
  }

  // Clear the input field
  messageInput.value = '';
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);
