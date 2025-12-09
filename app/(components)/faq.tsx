"use client";

import { useState } from "react";
import { Send, Bot } from "lucide-react";

type Message = { sender: "user" | "bot"; text: string };

export default function HelpPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am your Subtract Help Bot. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const faqs = [
    {
      keywords: ["login"],
      question: "How do I login?",
      answer: "To login, go to the Login page and enter your email and password.",
    },
    {
      keywords: ["account", "create"],
      question: "How do I create an account?",
      answer:
        "To create an account, click Sign Up and fill out the required fields.",
    },
    {
      keywords: ["forgot", "password"],
      question: "I forgot my password. What do I do?",
      answer:
        "Click 'Forgot Password' and enter your email to reset your password.",
    },
    {
      keywords: ["error", "system"],
      question: "The system shows an error. What should I do?",
      answer:
        "System errors may be caused by server issues. Please try again later.",
    },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Keyword matching first
    const lower = input.toLowerCase();
    let botReply: string = "";

    for (const f of faqs) {
      if (f.keywords.some((k) => lower.includes(k))) {
        botReply = f.answer;
        break;
      }
    }

    if (!botReply) {
      // Show temporary "Thinking..." message
      const thinkingMessage: Message = { sender: "bot", text: "Thinking..." };
      setMessages((prev) => [...prev, thinkingMessage]);

      try {
        const res = await fetch("/api/ai-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });

        const data = await res.json();
        botReply = data.text || "Sorry, I couldn't generate a response.";
      } catch (err) {
        botReply = "Error connecting to AI bot.";
      }

      const finalReply = botReply || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [
        ...prev.filter((m) => m.text !== "Thinking..."),
        { sender: "bot", text: finalReply },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botReply || "Sorry, I couldn't generate a response." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen  p-4">
      {/* BOT CARD */}
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">Help Bot</h1>
        </div>

        <div className="h-[350px] overflow-y-auto border rounded-xl p-4 bg-gray-100 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            className="flex-1 border rounded-xl p-2 outline-none"
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="bg-white p-4 rounded-xl shadow">
              <summary className="cursor-pointer font-medium text-lg">
                {f.question}
              </summary>
              <p className="mt-2 text-gray-700">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
