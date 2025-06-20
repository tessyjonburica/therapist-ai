"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import ChatInterface from "@/components/ChatInterface"
import FrameTextStudio from "@/components/FrameTextStudio"
import ProfileSettings from "@/components/ProfileSettings"
import MemoryLane from "@/components/MemoryLane"
import ExploreLoveThemes from "@/components/ExploreLoveThemes"

type ViewType = "chat" | "frametext" | "profile" | "memory" | "themes"

export default function Home() {
  const [activeView, setActiveView] = useState<ViewType>("chat")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Close mobile sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileSidebarOpen])

  const renderActiveView = () => {
    const commonProps = {
      onMenuClick: () => setIsMobileSidebarOpen(true),
    }

    switch (activeView) {
      case "chat":
        return <ChatInterface {...commonProps} />
      case "frametext":
        return <FrameTextStudio {...commonProps} />
      case "profile":
        return <ProfileSettings {...commonProps} />
      case "memory":
        return <MemoryLane {...commonProps} />
      case "themes":
        return <ExploreLoveThemes {...commonProps} />
      default:
        return <ChatInterface {...commonProps} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0">{renderActiveView()}</div>
    </div>
  )
}
