import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { SendHorizonal, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {useSelector} from 'react-redux';


const socket = io(import.meta.env.VITE_APP_SERVER_URL);

const Chatbot = () => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const user=useSelector((state)=>state.auth.user);
  const userId=user?._id;

  useEffect(() => {
    socket.on("botTyping", () => {
      setIsTyping(true);
    });

    socket.on("receiveMessage", (data) => {
      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, { text: data.reply, user: "Bot" }]);
    });

    return () => {
      socket.off("botTyping");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, user: "You" }]);
    socket.emit("sendMessage", { message: input, userId });

    setIsTyping(true);
    setInput("");
  };


  return (
    <div className="fixed bottom-4 right-4">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg border flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Smart City Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-white text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"} my-2`}>
                <div className={`px-3 py-2 rounded-lg max-w-[75%] ${msg.user === "You" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-900"}`}>
                  <strong>{msg.user}:</strong> 
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="font-semibold">Bot:</span>
                <div className="flex space-x-1">
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="flex items-center p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all ml-2"
            >
              <SendHorizonal size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
