import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    setLoading(true);
    if (!input.trim()) return;
    try {
      const res = await axios.post("http://localhost:3000/bot/v1/message", {
        text: input,
      });
      if (res.status === 200) {
        setMessages([
          ...messages,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col bg-[#0d0d0d] text-white min-w-[400px]">

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d] z-20">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
          <h1 className="text-lg sm:text-xl font-bold">BotSpoof</h1>
          <FaUserCircle size={30} className="cursor-pointer" />
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-24 flex items-center justify-center">
        <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto px-4 flex flex-col space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-base sm:text-lg">
              👋 Hi, I'm{" "}
              <span className="text-green-500 font-semibold">BotSpoof</span>.
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-[75%] break-words ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white self-end"
                      : "bg-gray-800 text-gray-100 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-gray-700 text-gray-300 px-4 py-2 rounded-2xl max-w-[70%] self-start animate-pulse">
                  Bot is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input & Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d] z-20">
        <div className="max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto flex justify-center px-4 py-3">
          <div className="w-full flex bg-gray-900 rounded-full px-4 py-2 shadow-lg">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2 text-sm sm:text-base"
              placeholder="Ask BotSpoof..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full text-white font-medium text-sm sm:text-base transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
