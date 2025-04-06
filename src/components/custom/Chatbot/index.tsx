import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from "react-icons/fi";
import Button from "@/components/Atoms/Controls/Button";
import Form from "@/components/Molecules/Form";
import dayjs from "dayjs";

// Types for our chatbot
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatbotWidgetProps {
  initiallyOpen?: boolean;
  botName?: string;
  welcomeMessage?: string;
  inputPlaceholder?: string;
  onSendMessage?: (message: string) => Promise<string>;
  className?: string;
}

// Generate unique message IDs
const generateId = () => `msg_${Math.random().toString(36).substr(2, 9)}`;

const formatTime = (date: Date) => {
  return dayjs(date).format("hh:mm A");
};

/**
 * Floating Chatbot Widget component that provides a toggleable chat interface
 */
const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  initiallyOpen = false,
  botName = "Support Bot",
  welcomeMessage = "Hi there! How can I help you today?",
  inputPlaceholder = "Type your message...",
  onSendMessage,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          text: welcomeMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, welcomeMessage, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let botResponse =
        "Thank you for your message. I'll get back to you soon.";

      if (onSendMessage) {
        botResponse = await onSendMessage(inputValue);
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: "Sorry, I encountered an error. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatWindowVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 },
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <FiMessageSquare className="text-white w-6 h-6" />
        </Button>
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-xl shadow-xl sm:w-96 flex flex-col"
            style={{ maxHeight: "calc(100vh - 6rem)", maxWidth: "420px" }}
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-4 bg-primary-400 rounded-t-xl flex justify-between items-center">
              <h3 className="text-white font-medium text-lg">{botName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white focus:outline-none hover:opacity-80"
                  aria-label="Minimize chat"
                >
                  <FiMinimize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setMessages([]);
                  }}
                  className="text-white focus:outline-none hover:opacity-80"
                  aria-label="Close chat"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-neutral-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-primary-400 text-white"
                        : "bg-white border border-neutral-200 text-neutral-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words text-sm">
                      {message.text}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500 mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-2">
                    <div className="flex gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-neutral-300 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Send message area */}
            <Form onSubmit={handleSendMessage}>
              <div className="p-4 border-t border-neutral-200 flex items-center gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={inputPlaceholder}
                  className="flex-1 bg-neutral-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  isLoading={isLoading}
                  aria-label="Send message"
                >
                  {isLoading ? null : <FiSend className="w-5 h-5" />}
                </Button>
              </div>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;
