import { useState } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [messages, setMessages] = useState([]); // To store chat history
  const [input, setInput] = useState('');       // To store user input
  const [isLoading, setIsLoading] = useState(false); // Loading state while waiting for the API response

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    setInput('');
    setIsLoading(true);

    try {
      const response =await axios.post("http://localhost:3000/chatbot",{prompt:input});
      console.log(response);
      setMessages([...messages,{role:"assistant",content:response.data.response}])
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error fetching response' }]);
    }

    setIsLoading(false); 
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="input-box">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          rows="3"
        ></textarea>
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default App;
