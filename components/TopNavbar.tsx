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
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">VALENTINO <span className="brown">AI</span></h1>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight -mt-1">Your personal AI therapist</p>
                </div>
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
