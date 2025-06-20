"use client"

import { Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import UserHeader from "./UserHeader"

interface TopNavbarProps {
  title: string
  showNewButton?: boolean
  onNewClick?: () => void
  newButtonText?: string
  onMenuClick?: () => void
}

export default function TopNavbar({
  title,
  showNewButton = false,
  onNewClick,
  newButtonText = "New Chat",
  onMenuClick,
}: TopNavbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 relative z-50">
      {/* Main Brand Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <img
                  src="/images/valentino-logo-mobile.png"
                  alt="Valentino AI - Your personal relationship guide"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {showNewButton && (
              <Button
                onClick={onNewClick}
                className="gradient-primary hover:gradient-primary-hover text-white border-0 px-3 sm:px-4 lg:px-6 text-sm lg:text-base h-9 sm:h-10"
              >
                <Plus className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline sm:hidden md:inline">{newButtonText}</span>
                <span className="xs:hidden sm:inline md:hidden">New</span>
              </Button>
            )}
            <UserHeader />
          </div>
        </div>
      </div>
    </div>
  )
}
