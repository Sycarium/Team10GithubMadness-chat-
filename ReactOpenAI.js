    /**
 * This file contains a React component for a chatbot application that uses the OpenAI API to generate responses.
 * The component allows the user to select from six different chatbots and send messages to the active chatbot.
 * The responses from the chatbot are displayed below the input field.
 *
 * Axiom: This code implements the principle of modularity by encapsulating the chatbot logic in a Chatbot class.
 */

    import axios from "axios";  
    import React, { useState } from "react";
    import openai from "openai";

    // Set up the OpenAI API client
    
    const api_key = "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";
   openai.api_key = api_key;
    // Define the Chatbot class
    class Chatbot {
    constructor(id, name, api_key) {
        this.id = id;
        this.name = name;
        this.conversation_history = "";
        this.active = false;
        
        this.api_key = api_key;
        openai.api_key = api_key; // Initialize the OpenAI API client with this chatbot's API key
    
    }

    generateResponse(user_input, setResponse) {
        // Get the conversation history for this chatbot
        const history = this.conversation_history;
      
        // Concatenate the user input and conversation history into a prompt
        const prompt = history + user_input;
      
        // Make an HTTP POST request to the OpenAI API using Axios
        axios
          .post("https://api.openai.com/v1/engines/davinci/completions", {
            prompt,
            max_tokens: 1024,
            n: 1,
            stop: null,
            temperature: 0.7,
          }, {
            headers: {
              Authorization: `Bearer ${this.api_key}`
            }
          })
          .then((response) => {
            // Extract the response from the API output
            const message = response.data.choices[0].text.trim();
      
            // Store the conversation history for this chatbot
            this.conversation_history = prompt + message;
      
            // Set the response as the state of the component
            setResponse(message);
          })
          .catch((error) => {
            console.error(error);
          });
      } 
    }
    // Create six instances of Chatbot
    const chatbots = [
    new Chatbot("chatbot1", "Alice", "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"),
    new Chatbot("chatbot2", "Bob", "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"),
    new Chatbot("chatbot3", "Charlie", "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"),
    new Chatbot("chatbot4", "David", "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"),
    new Chatbot("chatbot5", "Eve", "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"),
    new Chatbot("chatbot6", "Frank", "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"),
    ];

    // Set the first chatbot to be active by default
    chatbots[0].active = true;

    function ChatbotComponent() {
    // Set up state to hold the response from the chatbot
    const [response, setResponse] = useState("");

    // Set up state to hold the ID of the active chatbot (defaults to the first chatbot)
    const [activeChatbotId, setActiveChatbotId] = useState(chatbots[0].id);

    // Function to activate a chatbot by setting its ID as the active chatbot ID
    function activateChatbot(chatbotId) {
        setActiveChatbotId(chatbotId);
    }

    // Function to send a user message to the active chatbot and set the response in state
    function sendMessage(userInput) {
        // Find the chatbot with the active ID
        const activeChatbot = chatbots.find((chatbot) => chatbot.id === activeChatbotId);

    
        // Generate a response from the active chatbot and set it in state using setResponse
        activeChatbot.generateResponse(userInput, setResponse);
        }
    
        return (
        <div>
            {/* Render a button for each chatbot */}
            {chatbots.map((chatbot) => (
            <button
                key={chatbot.id}
                onClick={() => activateChatbot(chatbot.id)}
                // Add the "active" class to the button if it corresponds to the active chatbot
                className={activeChatbotId === chatbot.id ? "active" : ""}
            >
                {chatbot.name}
            </button>
            ))}
    
            {/* Render a text input for the user to send messages */}
            <input
            type="text"
            onChange={(event) => sendMessage(event.target.value)}
            placeholder="Type your message here..."
            />
    
            {/* Render the chatbot's response */}
            <div>{response}</div>
        </div>
        );
    }
    export default ChatbotComponent;