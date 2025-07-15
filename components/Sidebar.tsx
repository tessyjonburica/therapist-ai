"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Palette, Settings, Layers, X } from "lucide-react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isMobileOpen: boolean
  setIsMobileOpen: (open: boolean) => void
}

const menuItems = [
  { id: "chat", icon: MessageCircle, label: "AI Therapist Chat" },
  { id: "frametext", icon: Palette, label: "FrameText Studio" },
  { id: "memory", icon: Layers, label: "Memory Lane" },
  { id: "themes", icon: Heart, label: "Explore Love Themes" },
  { id: "profile", icon: Settings, label: "Profile & Setting" },
]

export default function Sidebar({ activeView, setActiveView, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const handleMenuClick = (viewId: string) => {
    setActiveView(viewId)
    setIsMobileOpen(false) // Close mobile sidebar after selection
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <img
              src="/images/valentino-logo-desktop.png"
              alt="Valentino AI - Your personal relationship guide"
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive ? "gradient-primary text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white flex flex-col shadow-2xl"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-center flex-1 pr-8">
                  <img
                    src="/images/valentino-logo-mobile.png"
                    alt="Valentino AI - Your personal relationship guide"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = activeView === item.id

                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                          isActive
                            ? "gradient-primary text-white shadow-lg transform scale-[1.02]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-600"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-base font-medium block truncate">{item.label}</span>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Version 1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">© 2025 Valentino AI</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
