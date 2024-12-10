import { useState } from "react"
import axios from "axios"
import "./Chatbot.css" // Ensure you have the Chatbot.css file imported

const Chatbot = () => {
  const [messages, setMessages] = useState([]) // Chat history
  const [input, setInput] = useState("") // User input

  const sendMessage = async () => {
    if (!input.trim()) return // Prevent empty submissions

    // Add the user's message to the chat
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    try {
      // Send the user's message to the backend
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      })

      // Add the bot's response to the chat
      const botMessage = { role: "assistant", content: response.data.reply }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error communicating with the chatbot API:", error)
      const errorMessage = {
        role: "assistant",
        content: "Sorry, there was an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    // Clear the input field
    setInput("")
  }

  return (
    <div className="chatbot-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h3>HYRA Chatbot</h3>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.role === "user" ? "user" : "ai"}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chatbot
