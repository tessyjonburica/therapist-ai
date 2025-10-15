"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessage from "./ChatMessage"
import TopNavbar from "./TopNavbar"
import { callGemini, generateChatTitle } from "@/lib/gemini"
import { saveChatsToStorage, loadChatsFromStorage, saveSingleChat, deleteChatFromStorage, Message, Chat } from "@/lib/storage"

interface ChatInterfaceProps {
  onMenuClick?: () => void
}

export default function ChatInterface({ onMenuClick }: ChatInterfaceProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [activeChatId, setActiveChatId] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const activeChat = chats.find((chat) => chat.id === activeChatId)

  // Load chats from localStorage on component mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const savedChats = loadChatsFromStorage()
        
        if (savedChats.length > 0) {
          setChats(savedChats)
          setActiveChatId(savedChats[0].id)
        } else {
          // Create initial chat if no saved chats
          const initialChat: Chat = {
            id: Date.now().toString(),
            title: "Therapy Session",
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
          }
          setChats([initialChat])
          setActiveChatId(initialChat.id)
          saveChatsToStorage([initialChat])
        }
      } catch (error) {
        console.error('Error loading chats:', error)
        // Fallback to initial chat
        const initialChat: Chat = {
          id: Date.now().toString(),
          title: "Therapy Session",
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
        }
        setChats([initialChat])
        setActiveChatId(initialChat.id)
      } finally {
        setIsLoading(false)
      }
    }

    loadChats()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeChat?.messages, isTyping])

  // Save chats to localStorage whenever they change
  useEffect(() => {
    if (chats.length > 0 && !isLoading) {
      saveChatsToStorage(chats)
    }
  }, [chats, isLoading])

  const createNewChat = async () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Session",
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
      const updatedChats: Chat[] = chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                {
                  id: "1",
                  type: "ai" as const,
                  content: "Hello! I'm here to help you. How are you feeling today?",
                  timestamp: new Date(),
                },
              ],
            }
          : chat,
      )
      setChats(updatedChats)
      return
    }

    const updatedChats = chats.filter((chat) => chat.id !== chatId)
    setChats(updatedChats)
    deleteChatFromStorage(chatId)

    // If we're closing the active chat, switch to another one
    if (chatId === activeChatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setActiveChatId(remainingChats[0].id)
      }
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeChat) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    // Add user message immediately
    const updatedChats = chats.map((chat) => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    )
    setChats(updatedChats)
    setInputValue("")
    setIsTyping(true)

    try {
      // Get AI response
      const aiResponse = await callGemini(inputValue, activeChat.messages)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }

      // Add AI response
      const finalChats = updatedChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      )
      setChats(finalChats)

      // Generate title for new chats (if this is the first user message)
      if (activeChat.messages.length === 2) { // Only AI greeting + options
        try {
          const title = await generateChatTitle(inputValue)
          const titledChats = finalChats.map((chat) =>
            chat.id === activeChatId ? { ...chat, title } : chat
          )
          setChats(titledChats)
        } catch (error) {
          console.error('Error generating chat title:', error)
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }

      const errorChats = updatedChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      )
      setChats(errorChats)
    } finally {
      setIsTyping(false)
    }
  }

  const handleOptionClick = async (option: string) => {
    if (!activeChat) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: option,
      timestamp: new Date(),
    }

    // Add user message immediately
    const updatedChats = chats.map((chat) => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    )
    setChats(updatedChats)
    setIsTyping(true)

    try {
      // Get AI response
      const aiResponse = await callGemini(option, activeChat.messages)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }

      // Add AI response
      const finalChats = updatedChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      )
      setChats(finalChats)

      // Generate title for new chats (if this is the first user message)
      if (activeChat.messages.length === 2) { // Only AI greeting + options
        try {
          const title = await generateChatTitle(option)
          const titledChats = finalChats.map((chat) =>
            chat.id === activeChatId ? { ...chat, title } : chat
          )
          setChats(titledChats)
        } catch (error) {
          console.error('Error generating chat title:', error)
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
      }

      const errorChats = updatedChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, errorMessage] }
          : chat
      )
      setChats(errorChats)
    } finally {
      setIsTyping(false)
    }
  }

  // Show loading state while chats are being loaded
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <TopNavbar
          title=""
          showNewButton={true}
          onNewClick={createNewChat}
          newButtonText="New Session"
          onMenuClick={onMenuClick}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Starting your private session...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <TopNavbar
        title=""
        showNewButton={true}
        onNewClick={createNewChat}
        newButtonText="New Session"
        onMenuClick={onMenuClick}
      />


      {/* Chat Tabs - Desktop optimized with better overflow handling */}
      {chats.length > 1 && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Active Sessions</h3>
            <span className="text-xs text-gray-500">{chats.length} sessions</span>
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
                <p className="text-sm text-gray-500">Private session - temporary</p>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSendMessage()
              }
            }}
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
