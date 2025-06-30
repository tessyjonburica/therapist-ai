"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 hover:bg-gray-100 h-9 sm:h-10 px-2 sm:px-3"
      >
        <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:block truncate max-w-[80px] sm:max-w-none">
          Hi, Christopher!
        </span>
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">C</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
      </Button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Mobile backdrop */}
            <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsDropdownOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
