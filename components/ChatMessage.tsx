"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  type: "ai" | "user" | "options"
  content: string
  timestamp: Date
  options?: string[]
}

interface ChatMessageProps {
  message: Message
  onOptionClick: (option: string) => void
}

export default function ChatMessage({ message, onOptionClick }: ChatMessageProps) {
  if (message.type === "options") {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex flex-wrap gap-3 max-w-2xl">
          {message.options?.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onOptionClick(option)}
                variant="outline"
                className="h-auto py-3 px-5 rounded-full border-2 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 text-sm lg:text-base font-medium transition-all duration-200 hover:shadow-sm whitespace-nowrap"
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-end space-x-3 max-w-[85%] lg:max-w-2xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
      >
        {message.type === "ai" && (
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">AI</span>
          </div>
        )}

        {message.type === "user" && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        )}

        <div
          className={`rounded-2xl px-5 py-4 shadow-sm ${
            message.type === "user" ? "gradient-primary text-white" : "bg-white text-gray-800 border border-gray-100"
          }`}
        >
          <p className="text-sm lg:text-base leading-relaxed">{message.content}</p>
        </div>
      </div>
    </motion.div>
  )
}
