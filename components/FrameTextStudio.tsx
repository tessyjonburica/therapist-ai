"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Share2, Copy, Download, Facebook, Twitter, Instagram, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import TopNavbar from "./TopNavbar"

interface FrameTextStudioProps {
  onMenuClick?: () => void
}

export default function FrameTextStudio({ onMenuClick }: FrameTextStudioProps) {
  const [message, setMessage] = useState(
    "Every day with you feels like a beautiful gift. I am endlessly grateful for your love.",
  )
  const [selectedFont, setSelectedFont] = useState("Nunito")
  const [selectedSize, setSelectedSize] = useState("16")
  const [selectedMood, setSelectedMood] = useState("romantic")
  const [selectedTextColor, setSelectedTextColor] = useState("pink")
  const [selectedBackground, setSelectedBackground] = useState("transparent")
  const [selectedShape, setSelectedShape] = useState("rounded")
  const [selectedBorderEmoji, setSelectedBorderEmoji] = useState("❤️")
  const [showBorderEmojis, setShowBorderEmojis] = useState(true)
  const [activeTab, setActiveTab] = useState("colors")
  const [isShareOpen, setIsShareOpen] = useState(false)

  const moodOptions = [
    {
      id: "grateful",
      label: "🙏 Grateful",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      textColor: "text-yellow-600",
      message:
        "Thank you for being such an incredible part of my life. I am endlessly grateful for your love and support.",
    },
    {
      id: "romantic",
      label: "💕 Romantic",
      color: "bg-pink-100 text-pink-800 border-pink-300",
      textColor: "text-pink-600",
      message: "Every day with you feels like a beautiful gift. I am endlessly grateful for your love.",
    },
    {
      id: "heartbroken",
      label: "💔 Heartbroken",
      color: "bg-red-100 text-red-800 border-red-300",
      textColor: "text-red-600",
      message: "Sometimes love means letting go, even when it breaks your heart into a million pieces.",
    },
    {
      id: "happy",
      label: "😊 Happy",
      color: "bg-green-100 text-green-800 border-green-300",
      textColor: "text-green-600",
      message: "Your smile lights up my world and fills my heart with pure joy and happiness.",
    },
    {
      id: "sad",
      label: "😢 Sad",
      color: "bg-blue-100 text-blue-800 border-blue-300",
      textColor: "text-blue-600",
      message: "In these quiet moments, I find myself missing you more than words can express.",
    },
    {
      id: "celebratory",
      label: "🎉 Celebratory",
      color: "bg-purple-100 text-purple-800 border-purple-300",
      textColor: "text-purple-600",
      message: "Here is to all the beautiful moments we have shared and the amazing adventures still to come!",
    },
  ]

  const textColorOptions = [
    { id: "pink", color: "bg-pink-400", textColor: "text-pink-600", name: "Pink" },
    { id: "purple", color: "bg-purple-400", textColor: "text-purple-600", name: "Purple" },
    { id: "blue", color: "bg-blue-400", textColor: "text-blue-600", name: "Blue" },
    { id: "green", color: "bg-green-400", textColor: "text-green-600", name: "Green" },
    { id: "yellow", color: "bg-yellow-400", textColor: "text-yellow-600", name: "Yellow" },
    { id: "orange", color: "bg-orange-400", textColor: "text-orange-600", name: "Orange" },
    { id: "red", color: "bg-red-400", textColor: "text-red-600", name: "Red" },
    { id: "gray", color: "bg-gray-400", textColor: "text-gray-600", name: "Gray" },
    { id: "black", color: "bg-black", textColor: "text-black", name: "Black" },
    { id: "white", color: "bg-white border-2 border-gray-300", textColor: "text-white", name: "White" },
  ]

  const backgroundOptions = [
    {
      id: "transparent",
      color: "bg-transparent border-2 border-dashed border-gray-300",
      bgClass: "bg-transparent",
      name: "Transparent",
    },
    { id: "white", color: "bg-white border-2 border-gray-300", bgClass: "bg-white", name: "White" },
    { id: "black", color: "bg-black", bgClass: "bg-black", name: "Black" },
    { id: "pink", color: "bg-pink-100", bgClass: "bg-pink-100", name: "Pink" },
    { id: "purple", color: "bg-purple-100", bgClass: "bg-purple-100", name: "Purple" },
    { id: "blue", color: "bg-blue-100", bgClass: "bg-blue-100", name: "Blue" },
    { id: "green", color: "bg-green-100", bgClass: "bg-green-100", name: "Green" },
    { id: "yellow", color: "bg-yellow-100", bgClass: "bg-yellow-100", name: "Yellow" },
    { id: "orange", color: "bg-orange-100", bgClass: "bg-orange-100", name: "Orange" },
    { id: "red", color: "bg-red-100", bgClass: "bg-red-100", name: "Red" },
    { id: "gray", color: "bg-gray-100", bgClass: "bg-gray-100", name: "Gray" },
    // Gradient backgrounds
    {
      id: "gradient-pink",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      bgClass: "bg-gradient-to-br from-pink-400 to-pink-600",
      name: "Pink Gradient",
    },
    {
      id: "gradient-purple",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      bgClass: "bg-gradient-to-br from-purple-400 to-purple-600",
      name: "Purple Gradient",
    },
    {
      id: "gradient-blue",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      bgClass: "bg-gradient-to-br from-blue-400 to-blue-600",
      name: "Blue Gradient",
    },
    {
      id: "gradient-green",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      bgClass: "bg-gradient-to-br from-green-400 to-green-600",
      name: "Green Gradient",
    },
    {
      id: "gradient-sunset",
      color: "bg-gradient-to-br from-orange-400 to-pink-600",
      bgClass: "bg-gradient-to-br from-orange-400 to-pink-600",
      name: "Sunset Gradient",
    },
    {
      id: "gradient-ocean",
      color: "bg-gradient-to-br from-blue-400 to-teal-600",
      bgClass: "bg-gradient-to-br from-blue-400 to-teal-600",
      name: "Ocean Gradient",
    },
    // New Pattern Backgrounds
    {
      id: "pattern-dots",
      color: "bg-white",
      bgClass: "bg-white",
      name: "Polka Dots",
      pattern:
        "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 3px, transparent 3px), radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.3) 3px, transparent 3px)",
      patternSize: "20px 20px",
    },
    {
      id: "pattern-hearts",
      color: "bg-pink-50",
      bgClass: "bg-pink-50",
      name: "Hearts",
      pattern: "radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.4) 2px, transparent 2px)",
      patternSize: "25px 25px",
    },
    {
      id: "pattern-waves",
      color: "bg-blue-50",
      bgClass: "bg-blue-50",
      name: "Waves",
      pattern:
        "linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(59, 130, 246, 0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(59, 130, 246, 0.1) 75%)",
      patternSize: "30px 30px",
    },
  ]

  const shapeOptions = [
    { id: "rounded", shape: "rounded-lg", name: "Rounded" },
    { id: "circle", shape: "rounded-full", name: "Circle" },
    { id: "square", shape: "rounded-none", name: "Square" },
    { id: "pill", shape: "rounded-full", name: "Pill" },
  ]

  const emojiOptions = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💘",
    "💙",
    "💚",
    "💛",
    "🧡",
    "💜",
    "🤍",
    "🖤",
    "💯",
    "💫",
    "⭐",
    "✨",
    "🌟",
    "🔥",
    "🙏",
    "😊",
    "😍",
    "🥰",
    "😘",
    "🎉",
  ]

  const fontSizeOptions = ["14", "16", "18", "20", "24", "28", "32", "36", "40"]

  const getSelectedTextColor = () => {
    const color = textColorOptions.find((c) => c.id === selectedTextColor)
    return color?.textColor || "text-pink-600"
  }

  const getSelectedBackground = () => {
    const bg = backgroundOptions.find((b) => b.id === selectedBackground)
    return bg?.bgClass || "bg-transparent"
  }

  const getSelectedBackgroundStyle = () => {
    const bg = backgroundOptions.find((b) => b.id === selectedBackground)
    if (bg?.pattern) {
      return {
        backgroundImage: bg.pattern,
        backgroundSize: bg.patternSize,
        backgroundRepeat: "repeat",
      }
    }
    return {}
  }

  const getSelectedShape = () => {
    const shape = shapeOptions.find((s) => s.id === selectedShape)
    return shape?.shape || "rounded-lg"
  }

  const handleMoodChange = (moodId: string) => {
    setSelectedMood(moodId)
    const mood = moodOptions.find((m) => m.id === moodId)
    if (mood) {
      setMessage(mood.message)
      // Auto-select appropriate text color based on mood
      switch (moodId) {
        case "grateful":
          setSelectedTextColor("yellow")
          break
        case "romantic":
          setSelectedTextColor("pink")
          break
        case "heartbroken":
          setSelectedTextColor("red")
          break
        case "happy":
          setSelectedTextColor("green")
          break
        case "sad":
          setSelectedTextColor("blue")
          break
        case "celebratory":
          setSelectedTextColor("purple")
          break
      }
    }
  }

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(message)
    const url = encodeURIComponent(window.location.href)

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(message)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
        break
      case "instagram":
        navigator.clipboard.writeText(message)
        break
      case "download":
        const element = document.createElement("a")
        const file = new Blob([message], { type: "text/plain" })
        element.href = URL.createObjectURL(file)
        element.download = "message.txt"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        break
    }
    setIsShareOpen(false)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm flex-shrink-0">
        <TopNavbar title="" showNewButton={true} newButtonText="New Message" onMenuClick={onMenuClick} />
      </div>

      {/* Desktop Layout - Enhanced with Scrolling */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">FrameText Studio</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white border-0" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Share Your Message</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <Button
                            variant="outline"
                            onClick={() => handleShare("copy")}
                            className="flex items-center space-x-2"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy Text</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleShare("download")}
                            className="flex items-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleShare("facebook")}
                            className="flex items-center space-x-2 text-blue-600"
                          >
                            <Facebook className="w-4 h-4" />
                            <span>Facebook</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleShare("twitter")}
                            className="flex items-center space-x-2 text-blue-400"
                          >
                            <Twitter className="w-4 h-4" />
                            <span>Twitter</span>
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleShare("instagram")}
                            className="flex items-center space-x-2 text-pink-600 col-span-2"
                          >
                            <Instagram className="w-4 h-4" />
                            <span>Copy for Instagram</span>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-lg p-8 mb-6 flex items-center justify-center min-h-[300px]">
                  <motion.div
                    key={`${selectedFont}-${selectedSize}-${selectedTextColor}-${selectedBackground}-${selectedShape}-${selectedMood}-${showBorderEmojis}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-center max-w-md p-6 ${getSelectedTextColor()} ${getSelectedBackground()} ${getSelectedShape()} relative shadow-lg`}
                    style={{
                      fontFamily: selectedFont,
                      fontSize: `${selectedSize}px`,
                      lineHeight: 1.5,
                      ...getSelectedBackgroundStyle(),
                    }}
                  >
                    {/* Border Emojis */}
                    {showBorderEmojis && (
                      <>
                        <div className="absolute -top-2 -left-2 text-lg">{selectedBorderEmoji}</div>
                        <div className="absolute -top-2 -right-2 text-lg">{selectedBorderEmoji}</div>
                        <div className="absolute -bottom-2 -left-2 text-lg">{selectedBorderEmoji}</div>
                        <div className="absolute -bottom-2 -right-2 text-lg">{selectedBorderEmoji}</div>
                      </>
                    )}

                    {message}
                  </motion.div>
                </div>

                {/* Message Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      rows={3}
                      placeholder="Type your message here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Panel - Enhanced with Independent Scrolling */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col min-h-0">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Customize Your Message</h3>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Mood Selection */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Mood</h4>
                <div className="grid grid-cols-2 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodChange(mood.id)}
                      className={`p-2 rounded-lg text-xs font-medium transition-colors border ${
                        selectedMood === mood.id
                          ? mood.color + " ring-2 ring-offset-2 ring-pink-500"
                          : mood.color + " hover:opacity-80"
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nunito">Nunito</SelectItem>
                    <SelectItem value="Sans serif">Sans serif</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}px
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Colors, Background, Shape Tabs */}
              <div>
                <div className="flex space-x-4 mb-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("colors")}
                    className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                      activeTab === "colors"
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Colors
                  </button>
                  <button
                    onClick={() => setActiveTab("background")}
                    className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                      activeTab === "background"
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Background
                  </button>
                  <button
                    onClick={() => setActiveTab("shape")}
                    className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                      activeTab === "shape"
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Shape
                  </button>
                </div>

                {/* Colors Tab */}
                {activeTab === "colors" && (
                  <div className="grid grid-cols-5 gap-2">
                    {textColorOptions.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedTextColor(color.id)}
                        className={`w-12 h-12 rounded-full ${color.color} ${
                          selectedTextColor === color.id ? "ring-2 ring-offset-2 ring-gray-400" : ""
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                )}

                {/* Background Tab */}
                {activeTab === "background" && (
                  <div className="grid grid-cols-4 gap-2">
                    {backgroundOptions.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setSelectedBackground(bg.id)}
                        className={`w-12 h-12 rounded ${bg.color} ${
                          selectedBackground === bg.id ? "ring-2 ring-offset-2 ring-gray-400" : ""
                        }`}
                        style={
                          bg.pattern
                            ? {
                                backgroundImage: bg.pattern,
                                backgroundSize: bg.patternSize,
                                backgroundRepeat: "repeat",
                              }
                            : {}
                        }
                        title={bg.name}
                      />
                    ))}
                  </div>
                )}

                {/* Shape Tab */}
                {activeTab === "shape" && (
                  <div className="grid grid-cols-4 gap-2">
                    {shapeOptions.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setSelectedShape(shape.id)}
                        className={`w-12 h-12 border-2 ${shape.shape} ${
                          selectedShape === shape.id
                            ? "border-pink-500 bg-pink-100"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        title={shape.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Border Emoji Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Border Emojis</h4>
                  <p className="text-xs text-gray-500">Show decorative emojis around the message</p>
                </div>
                <Switch checked={showBorderEmojis} onCheckedChange={setShowBorderEmojis} />
              </div>

              {/* Border Emoji Selection */}
              {showBorderEmojis && (
                <div className="pb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Border Emoji</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {emojiOptions.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBorderEmoji(emoji)}
                        className={`w-8 h-8 text-lg rounded flex items-center justify-center ${
                          selectedBorderEmoji === emoji ? "bg-pink-100 ring-2 ring-pink-500" : "hover:bg-gray-100"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Enhanced with Scrolling */}
      <div className="lg:hidden flex flex-col flex-1 min-h-0">
        {/* Scrollable Mobile Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Live Preview */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center min-h-[220px] flex-shrink-0">
            <motion.div
              key={`${selectedFont}-${selectedSize}-${selectedTextColor}-${selectedBackground}-${selectedShape}-${selectedMood}-${showBorderEmojis}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-center max-w-xs p-4 ${getSelectedTextColor()} ${getSelectedBackground()} ${getSelectedShape()} relative shadow-lg`}
              style={{
                fontFamily: selectedFont,
                fontSize: `${selectedSize}px`,
                lineHeight: 1.4,
                ...getSelectedBackgroundStyle(),
              }}
            >
              {/* Border Emojis */}
              {showBorderEmojis && (
                <>
                  <div className="absolute -top-1 -left-1 text-sm">{selectedBorderEmoji}</div>
                  <div className="absolute -top-1 -right-1 text-sm">{selectedBorderEmoji}</div>
                  <div className="absolute -bottom-1 -left-1 text-sm">{selectedBorderEmoji}</div>
                  <div className="absolute -bottom-1 -right-1 text-sm">{selectedBorderEmoji}</div>
                </>
              )}
              {message}
            </motion.div>
          </div>

          {/* Message Input */}
          <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none"
                rows={3}
                placeholder="Type here!"
              />
              <button className="mt-2 p-2 text-gray-400 hover:text-gray-600">
                <Upload className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Customization */}
          <div className="bg-white pb-8">
            <div className="p-4">
              <h4 className="text-base font-medium text-gray-900 mb-4">Customize Your Message</h4>

              {/* Mood Selection */}
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Mood</h5>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodChange(mood.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors border ${
                        selectedMood === mood.id
                          ? mood.color + " ring-2 ring-offset-2 ring-pink-500"
                          : mood.color + " hover:opacity-80"
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Controls */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nunito">Nunito</SelectItem>
                      <SelectItem value="Sans serif">Sans serif</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontSizeOptions.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-4">
                <div className="flex space-x-4 border-b border-gray-200">
                  {["Colors", "Background", "Shape"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                        activeTab === tab.toLowerCase()
                          ? "border-pink-500 text-pink-600"
                          : "border-transparent text-gray-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors Tab */}
              {activeTab === "colors" && (
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {textColorOptions.slice(0, 10).map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedTextColor(color.id)}
                      className={`w-12 h-12 rounded-full ${color.color} ${
                        selectedTextColor === color.id ? "ring-2 ring-offset-2 ring-gray-400" : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              )}

              {/* Background Tab */}
              {activeTab === "background" && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {backgroundOptions.slice(0, 15).map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBackground(bg.id)}
                      className={`w-12 h-12 rounded ${bg.color} ${
                        selectedBackground === bg.id ? "ring-2 ring-offset-2 ring-gray-400" : ""
                      }`}
                      style={
                        bg.pattern
                          ? {
                              backgroundImage: bg.pattern,
                              backgroundSize: bg.patternSize,
                              backgroundRepeat: "repeat",
                            }
                          : {}
                      }
                      title={bg.name}
                    />
                  ))}
                </div>
              )}

              {/* Shape Tab */}
              {activeTab === "shape" && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {shapeOptions.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setSelectedShape(shape.id)}
                      className={`w-12 h-12 border-2 ${shape.shape} ${
                        selectedShape === shape.id
                          ? "border-pink-500 bg-pink-100"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      title={shape.name}
                    />
                  ))}
                </div>
              )}

              {/* Border Emoji Toggle */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Border Emojis</h5>
                  <p className="text-xs text-gray-500">Show decorative emojis</p>
                </div>
                <Switch checked={showBorderEmojis} onCheckedChange={setShowBorderEmojis} />
              </div>

              {/* Border Emoji Selection */}
              {showBorderEmojis && (
                <div className="pb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Border Emoji</h5>
                  <div className="grid grid-cols-8 gap-2">
                    {emojiOptions.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedBorderEmoji(emoji)}
                        className={`w-10 h-10 text-lg rounded flex items-center justify-center ${
                          selectedBorderEmoji === emoji ? "bg-pink-100 ring-2 ring-pink-500" : "hover:bg-gray-100"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
