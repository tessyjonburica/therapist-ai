"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessage from "./ChatMessage"
import TopNavbar from "./TopNavbar"

interface Message {
  id: string
  type: "ai" | "user" | "options"
  content: string
  timestamp: Date
  options?: string[]
  isTyping?: boolean
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

interface ChatInterfaceProps {
  onMenuClick?: () => void
}

export default function ChatInterface({ onMenuClick }: ChatInterfaceProps) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "AI Therapist Chat",
      createdAt: new Date(),
      messages: [
        {
          id: "1",
          type: "ai",
          content: "Hello there! How are you feeling today?",
          timestamp: new Date(),
        },
        {
          id: "2",
          type: "options",
          content: "",
          timestamp: new Date(),
          options: [
            "😊 I'm feeling good and calm.",
            "😰 I'm a bit anxious or stressed.",
            "😔 I'm feeling down or low today.",
            "🤔 I'm not sure how I feel right now.",
          ],
        },
      ],
    },
  ])

  const [activeChatId, setActiveChatId] = useState("1")
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find((chat) => chat.id === activeChatId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat?.messages, isTyping])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      createdAt: new Date(),
      messages: [
        {
          id: "1",
          type: "ai",
          content: "Hello! I'm here to help you. How are you feeling today?",
          timestamp: new Date(),
        },
      ],
    }

    setChats((prev) => [newChat, ...prev])
    setActiveChatId(newChat.id)
  }

  const closeChat = (chatId: string) => {
    if (chats.length === 1) {
      // Don't close the last chat, just clear its messages
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  {
                    id: "1",
                    type: "ai",
                    content: "Hello! I'm here to help you. How are you feeling today?",
                    timestamp: new Date(),
                  },
                ],
              }
            : chat,
        ),
      )
      return
    }

    setChats((prev) => prev.filter((chat) => chat.id !== chatId))

    // If we're closing the active chat, switch to another one
    if (chatId === activeChatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id)
      }
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setChats((prev) =>
      prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat)),
    )
    setInputValue("")

    // Simulate AI typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Thank you for sharing that with me. I understand how you're feeling. Would you like to explore this further?",
        timestamp: new Date(),
      }
      setChats((prev) =>
        prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiResponse] } : chat)),
      )
    }, 2000)
  }

  const handleOptionClick = (option: string) => {
    if (!activeChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: option,
      timestamp: new Date(),
    }

    setChats((prev) =>
      prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat)),
    )

    // Simulate AI typing response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I appreciate you sharing that with me. Let's explore this feeling together. What would you like to talk about?",
        timestamp: new Date(),
      }
      setChats((prev) =>
        prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiResponse] } : chat)),
      )
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <TopNavbar
        title="Chat"
        showNewButton={true}
        onNewClick={createNewChat}
        newButtonText="New Chat"
        onMenuClick={onMenuClick}
      />

      {/* Chat Tabs - Desktop optimized with better overflow handling */}
      {chats.length > 1 && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Active Chats</h3>
            <span className="text-xs text-gray-500">{chats.length} chats</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap flex-shrink-0 min-w-0 ${
                  activeChatId === chat.id
                    ? "gradient-primary text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <button
                  onClick={() => setActiveChatId(chat.id)}
                  className="flex-1 text-left truncate max-w-[120px] lg:max-w-[150px]"
                  title={chat.title}
                >
                  {chat.title}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeChat(chat.id)
                  }}
                  className={`p-1 rounded-full hover:bg-black/10 flex-shrink-0 ${
                    activeChatId === chat.id ? "text-white/80 hover:text-white" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Chat Header - Improved */}
      {chats.length === 1 && (
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{activeChat?.title}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Today</span>
              <button
                onClick={() => closeChat(activeChatId)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                title="Clear chat"
              >
                <X className="w-4 h-4" />
              </button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Container - Improved desktop spacing */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 lg:py-8 space-y-6 min-h-0 bg-gray-50"
      >
        <AnimatePresence>
          {activeChat?.messages.map((message) => (
            <ChatMessage key={message.id} message={message} onOptionClick={handleOptionClick} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AI</span>
            </div>
            <div className="bg-pink-100 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Mobile optimized */}
      <div className="bg-white border-t border-gray-200 p-4 lg:p-6 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="How are you feeling today?"
              className="pr-12 rounded-full border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-base lg:text-sm"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="gradient-primary hover:gradient-primary-hover text-white border-0 rounded-full w-12 h-12 p-0 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
