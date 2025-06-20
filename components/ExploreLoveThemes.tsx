"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, Save, Share2, Edit3, X, Heart, Sparkles, Globe, Zap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import TopNavbar from "./TopNavbar"

interface Theme {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  icon: React.ReactNode
  backgroundColor: string
  textColor: string
  sampleText: string
  aiPrompts: string[]
  isPopular?: boolean
  isFavorite?: boolean
}

interface ExploreLoveThemesProps {
  onMenuClick?: () => void
}

export default function ExploreLoveThemes({ onMenuClick }: ExploreLoveThemesProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("most-used")
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")
  const [appliedTheme, setAppliedTheme] = useState<Theme | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const themes: Theme[] = [
    {
      id: "first-love",
      title: "First Love Theme",
      description: "This theme will make your writing have a warm, nostalgic feel with soft pink color accents.",
      fullDescription: "First love is unforgettable—capture those raw, warm feelings in a message that stays with you.",
      category: "romantic",
      icon: <Heart className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-pink-400 to-pink-500",
      textColor: "text-white",
      sampleText: "I still remember the first time we laughed together. That moment changed me.",
      aiPrompts: [
        "I still remember the first time we laughed together. That moment changed me.",
        "There's something about first love that remains with us forever. It's the purest form of love, untainted by expectations.",
      ],
      isPopular: true,
      isFavorite: false,
    },
    {
      id: "long-distance",
      title: "Long Distance Theme",
      description:
        "Bridge the miles with heartfelt, hopeful messages that keep your connection strong despite the physical separation.",
      fullDescription: "Bridge the gap with words that make distance feel smaller.",
      category: "romantic",
      icon: <Globe className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-blue-400 to-blue-500",
      textColor: "text-white",
      sampleText: "Even from miles away, you feel close.",
      aiPrompts: ["Even from miles away, you feel close.", "Distance means nothing when someone means everything."],
      isPopular: false,
      isFavorite: true,
    },
    {
      id: "healing",
      title: "Healing Theme",
      description:
        "Express closure, acceptance, and emotional healing after a relationship ends. Find peace in your journey.",
      fullDescription: "Find strength and healing in words during difficult transitions.",
      category: "heartbroken",
      icon: <Sparkles className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-purple-400 to-purple-500",
      textColor: "text-white",
      sampleText: "I'm not broken — I'm becoming.",
      aiPrompts: [
        "I'm not broken — I'm becoming.",
        "Healing isn't about forgetting, it's about finding peace with what was.",
      ],
      isPopular: false,
      isFavorite: false,
    },
    {
      id: "gratitude",
      title: "Gratitude Theme",
      description: "Express deep appreciation and thankfulness for the love and support in your life.",
      fullDescription: "Celebrate the gift of love with heartfelt gratitude.",
      category: "grateful",
      icon: <Star className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
      textColor: "text-white",
      sampleText: "Thank you for being my constant source of joy.",
      aiPrompts: [
        "Thank you for being my constant source of joy.",
        "Gratitude fills my heart when I think of all you've given me.",
      ],
      isPopular: true,
      isFavorite: true,
    },
    {
      id: "celebration",
      title: "Celebration Theme",
      description: "Mark special moments and milestones with joyful, festive messages.",
      fullDescription: "Celebrate love's beautiful moments with vibrant expressions.",
      category: "celebratory",
      icon: <Zap className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-green-400 to-teal-400",
      textColor: "text-white",
      sampleText: "Every day with you is worth celebrating!",
      aiPrompts: [
        "Every day with you is worth celebrating!",
        "Here's to all the beautiful moments we've shared and many more to come.",
      ],
      isPopular: false,
      isFavorite: false,
    },
    {
      id: "comfort",
      title: "Comfort Theme",
      description: "Offer gentle support and understanding during difficult times.",
      fullDescription: "Provide warmth and comfort when words matter most.",
      category: "sad",
      icon: <Heart className="w-6 h-6" />,
      backgroundColor: "bg-gradient-to-br from-indigo-400 to-blue-400",
      textColor: "text-white",
      sampleText: "You're not alone in this. I'm here with you.",
      aiPrompts: [
        "You're not alone in this. I'm here with you.",
        "Sometimes the most powerful thing we can do is simply be present.",
      ],
      isPopular: false,
      isFavorite: false,
    },
  ]

  const categories = [
    { id: "all", label: "All", emoji: "" },
    { id: "grateful", label: "Grateful", emoji: "🙏" },
    { id: "romantic", label: "Romantic", emoji: "💕" },
    { id: "heartbroken", label: "Heartbroken", emoji: "💔" },
    { id: "happy", label: "Happy", emoji: "😊" },
    { id: "celebratory", label: "Celebratory", emoji: "🎉" },
    { id: "sad", label: "Sad", emoji: "😢" },
  ]

  const sortOptions = [
    { value: "most-used", label: "Most Used" },
    { value: "all", label: "All" },
    { value: "new", label: "New" },
    { value: "favourites", label: "Favourites" },
    { value: "most-meaningful", label: "Most Meaningful" },
  ]

  const filteredThemes = themes.filter((theme) => {
    const matchesCategory = selectedCategory === "all" || theme.category === selectedCategory
    const matchesSearch =
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSort =
      sortBy === "all" ||
      (sortBy === "favourites" && theme.isFavorite) ||
      (sortBy === "most-used" && theme.isPopular) ||
      sortBy === "new" ||
      sortBy === "most-meaningful"
    return matchesCategory && matchesSearch && matchesSort
  })

  const handleApplyTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    setShowApplyModal(true)
    setCustomPrompt(theme.aiPrompts[0])
  }

  const handleConfirmApply = () => {
    if (selectedTheme) {
      setAppliedTheme(selectedTheme)
      setShowApplyModal(false)
      // Show success modal
      setTimeout(() => {
        setSelectedTheme(selectedTheme)
      }, 100)
    }
  }

  const handleFavorite = (themeId: string) => {
    // Handle favorite toggle
    console.log("Toggle favorite for theme:", themeId)
  }

  const handleSave = (themeId: string) => {
    // Handle save
    console.log("Save theme:", themeId)
  }

  const handleShare = (themeId: string) => {
    // Handle share
    console.log("Share theme:", themeId)
  }

  const handleEditInFrameText = (themeId: string) => {
    // Handle edit in FrameText
    console.log("Edit in FrameText:", themeId)
    setSelectedTheme(null)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <TopNavbar title="Explore Love Themes" onMenuClick={onMenuClick} />

      {/* Desktop Layout - Original */}
      <div className="hidden lg:block">
        {/* Subtitle */}
        <div className="bg-white px-6 py-2 border-b border-gray-200">
          <p className="text-sm text-gray-600">Find the perfect theme to express you feelings.</p>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 space-y-4">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "gradient-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.emoji && <span className="mr-1">{category.emoji}</span>}
                {category.label}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Theme Cards */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThemes.map((theme) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Theme Header */}
                <div className={`${theme.backgroundColor} ${theme.textColor} p-6 relative`}>
                  <div className="absolute top-4 right-4">
                    {theme.isPopular && <Star className="w-5 h-5 text-yellow-300 fill-current" />}
                    {theme.isFavorite && !theme.isPopular && <Heart className="w-5 h-5 text-red-300 fill-current" />}
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    {theme.icon}
                    <h3 className="text-lg font-semibold">{theme.title}</h3>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed">{theme.description}</p>
                </div>

                {/* Theme Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{theme.title.replace(" Theme", "")}</h4>
                    <p className="text-sm text-gray-600 mb-3">{theme.fullDescription}</p>
                    <p className="text-sm text-gray-800 italic">"{theme.sampleText}"</p>
                  </div>

                  <Button
                    onClick={() => handleApplyTheme(theme)}
                    className={`w-full ${theme.backgroundColor} hover:opacity-90 ${theme.textColor} border-0`}
                  >
                    Apply Theme
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout - New Optimized */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Mobile Subtitle */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <p className="text-sm text-gray-600">Find the perfect theme to express you feelings.</p>
        </div>

        {/* Mobile Category Filters */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "gradient-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.emoji && <span>{category.emoji}</span>}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Search and Sort */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
            >
              <span>{sortOptions.find((option) => option.value === sortBy)?.label || "Most Used"}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Sort Dropdown */}
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-gray-100"
            >
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </div>

        {/* Mobile Theme Cards */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            {filteredThemes.map((theme) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              >
                {/* Theme Header */}
                <div className={`${theme.backgroundColor} ${theme.textColor} p-4 relative`}>
                  <div className="absolute top-3 right-3">
                    {theme.isPopular && <Star className="w-4 h-4 text-yellow-300 fill-current" />}
                    {theme.isFavorite && !theme.isPopular && <Heart className="w-4 h-4 text-red-300 fill-current" />}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-lg">{theme.icon}</div>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 leading-tight">{theme.title}</h3>
                  <p className="text-xs opacity-90 leading-relaxed line-clamp-2">{theme.description}</p>
                </div>

                {/* Theme Content */}
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{theme.fullDescription}</p>
                    <p className="text-xs text-gray-800 italic line-clamp-2">"{theme.sampleText}"</p>
                  </div>

                  <Button
                    onClick={() => handleApplyTheme(theme)}
                    className={`w-full text-xs h-8 ${theme.backgroundColor} hover:opacity-90 ${theme.textColor} border-0`}
                  >
                    Apply Theme
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Theme Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-lg lg:max-w-lg max-w-sm mx-4 lg:mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Apply "{selectedTheme?.title?.replace(" Theme", "")}" Theme</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedTheme && (
              <div className={`${selectedTheme.backgroundColor} ${selectedTheme.textColor} rounded-lg p-6`}>
                <h4 className="text-lg font-semibold mb-2">{selectedTheme.title.replace(" Theme", "")}</h4>
                <p className="text-sm opacity-90">{selectedTheme.fullDescription}</p>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900 mb-3">AI Prompts Options</h4>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
                placeholder="Enter your custom prompt..."
              />
              {selectedTheme && <p className="text-xs text-gray-500 mt-2">{selectedTheme.aiPrompts[1]}</p>}
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleConfirmApply}
                className="flex-1 gradient-primary hover:gradient-primary-hover text-white border-0"
              >
                Apply Theme
              </Button>
              <Button onClick={() => setShowApplyModal(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Theme Applied Success Modal */}
      <Dialog open={!!appliedTheme && !showApplyModal} onOpenChange={() => setAppliedTheme(null)}>
        <DialogContent className="max-w-lg lg:max-w-lg max-w-sm mx-4 lg:mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                "{appliedTheme?.title?.replace(" Theme", "")}" Theme is applied.
              </h3>
              <button onClick={() => setAppliedTheme(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {appliedTheme && (
              <div className="flex justify-center">
                <div
                  className={`${appliedTheme.backgroundColor} ${appliedTheme.textColor} rounded-lg p-6 max-w-sm text-center`}
                >
                  <p className="text-sm leading-relaxed">{appliedTheme.sampleText}</p>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={() => handleFavorite(appliedTheme?.id || "")}
                variant="outline"
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white border-0"
              >
                <Star className="w-4 h-4" />
                <span>Favourites</span>
              </Button>
              <Button
                onClick={() => handleSave(appliedTheme?.id || "")}
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => handleShare(appliedTheme?.id || "")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button
                onClick={() => handleEditInFrameText(appliedTheme?.id || "")}
                className="flex-1 gradient-primary hover:gradient-primary-hover text-white border-0 flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit in FrameText</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
