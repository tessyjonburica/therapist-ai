"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Share2, Trash2, Edit3, X, Grid3X3, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import TopNavbar from "./TopNavbar"

interface Memory {
  id: string
  title: string
  content: string
  date: string
  emotion: string
  category: string
  isFavorite: boolean
  isShared: boolean
  backgroundColor: string
  emoji: string
  insights?: string
}

interface MemoryLaneProps {
  onMenuClick?: () => void
}

export default function MemoryLane({ onMenuClick }: MemoryLaneProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedEmotion, setSelectedEmotion] = useState("all")
  const [selectedTime, setSelectedTime] = useState("all")
  const [selectedMessages, setSelectedMessages] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const memories: Memory[] = [
    {
      id: "1",
      title: "First Love Confession",
      content:
        "Dear Alex, I've been wanting to tell you this for a long time. Every time I see you, my heart skips a beat. Your smile lights up the room, and just being near you makes everything feel a little better. The truth is, I've fallen for you. It's more than a crush — it's this deep, quiet feeling that's grown over time. I care about you so much, more than I've ever said out loud. I don't know what you'll think or feel after reading this, but I couldn't keep it to myself any longer. I just needed you to know. — I love you.",
      date: "April 15,2025",
      emotion: "love",
      category: "confession",
      isFavorite: true,
      isShared: false,
      backgroundColor: "bg-gradient-to-br from-pink-300 to-pink-400",
      emoji: "💕",
      insights:
        "This memory marks a significant emotional peak in your recent journey. It was written 3 days after a period of uncertainty you documented last month. The word 'complete' appears five times in your Memory Lane, suggesting a meaningful transition.",
    },
    {
      id: "2",
      title: "Apology to Love",
      content:
        "Dear Alex, I've been wanting to tell you this for so long. Every time I see you, my heart skips a beat. Your smile lights up the room, and I find myself...",
      date: "April 31,2026",
      emotion: "apology",
      category: "relationship",
      isFavorite: false,
      isShared: false,
      backgroundColor: "bg-gradient-to-br from-green-300 to-green-400",
      emoji: "🙏",
      insights: "A moment of vulnerability and growth in your relationship journey.",
    },
    {
      id: "3",
      title: "Happy Birthday!",
      content:
        "Dear Alex, I've been wanting to tell you this for so long. Every time I see you, my heart skips a beat. Your smile lights up the room, and I find myself...",
      date: "April 25,2026",
      emotion: "celebration",
      category: "birthday",
      isFavorite: false,
      isShared: true,
      backgroundColor: "bg-gradient-to-br from-pink-300 to-pink-400",
      emoji: "🎉",
      insights: "Celebrating special moments strengthens emotional bonds.",
    },
    {
      id: "4",
      title: "Letting Go",
      content:
        "Dear Alex, I've been wanting to tell you this for a long time. Every time I see you, my heart skips a beat. Your smile lights up the room, and just being near you makes...",
      date: "April 25,2026",
      emotion: "sad",
      category: "closure",
      isFavorite: false,
      isShared: false,
      backgroundColor: "bg-gradient-to-br from-blue-300 to-blue-400",
      emoji: "💙",
      insights: "Processing difficult emotions is an important part of healing.",
    },
    {
      id: "5",
      title: "Thank You Love",
      content:
        "Dear Alex, I've been wanting to tell you this for so long. Every time I see you, my heart skips a beat. Your smile lights up the room, and I find myself...",
      date: "April 7,2026",
      emotion: "grateful",
      category: "appreciation",
      isFavorite: false,
      isShared: false,
      backgroundColor: "bg-gradient-to-br from-purple-300 to-pink-400",
      emoji: "💖",
      insights: "Expressing gratitude deepens emotional connections.",
    },
    {
      id: "6",
      title: "Happy Mood",
      content:
        "Dear Alex, I've been wanting to tell you this for so long. Every time I see you, my heart skips a beat. Your smile lights up the room, and I find myself...",
      date: "April 18,2026",
      emotion: "happy",
      category: "joy",
      isFavorite: false,
      isShared: false,
      backgroundColor: "bg-gradient-to-br from-cyan-300 to-blue-400",
      emoji: "😊",
      insights: "Moments of pure joy are precious and worth celebrating.",
    },
  ]

  const emotions = [
    { value: "all", label: "All Emotions", emoji: "" },
    { value: "love", label: "💕 Love" },
    { value: "heartbreak", label: "💔 Heartbreak" },
    { value: "happy", label: "😊 Happy" },
    { value: "sad", label: "😢 Sad" },
    { value: "celebration", label: "🎉 Celebrations" },
    { value: "grateful", label: "🙏 Grateful" },
    { value: "apology", label: "🙏 Apology" },
  ]

  const timeFilters = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "year", label: "Last Year" },
  ]

  const messageFilters = [
    { value: "all", label: "All Messages" },
    { value: "favorites", label: "⭐ Favorites" },
    { value: "recent", label: "📝 Recently Edited" },
    { value: "shared", label: "🔗 Shared" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "meaningful", label: "Most Meaningful" },
  ]

  const filteredMemories = memories.filter((memory) => {
    if (selectedEmotion !== "all" && memory.emotion !== selectedEmotion) return false
    if (selectedMessages === "favorites" && !memory.isFavorite) return false
    if (selectedMessages === "shared" && !memory.isShared) return false
    return true
  })

  const handleFavorite = (memoryId: string) => {
    console.log("Toggle favorite for:", memoryId)
  }

  const handleShare = (memoryId: string) => {
    console.log("Share memory:", memoryId)
  }

  const handleDelete = (memoryId: string) => {
    console.log("Delete memory:", memoryId)
    setSelectedMemory(null)
  }

  const handleEdit = (memoryId: string) => {
    console.log("Edit in FrameText:", memoryId)
    setSelectedMemory(null)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <TopNavbar title="" onMenuClick={onMenuClick} />
      </div>

      {/* Desktop Filters - Original Layout */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {emotions.map((emotion) => (
                  <SelectItem key={emotion.value} value={emotion.value}>
                    {emotion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMessages} onValueChange={setSelectedMessages}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {messageFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

      {/* Mobile Controls */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900">Memory Lane</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? "rotate-180" : ""}`} />
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{filteredMemories.length} memories</span>
            </div>
          </div>

          {/* Expandable Filter Section */}
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-3 border-t border-gray-100"
            >
              {/* Emotion Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emotion</label>
                <Select value={selectedEmotion} onValueChange={setSelectedEmotion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select emotion" />
                  </SelectTrigger>
                  <SelectContent>
                    {emotions.map((emotion) => (
                      <SelectItem key={emotion.value} value={emotion.value}>
                        {emotion.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time and Message Filters */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeFilters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <Select value={selectedMessages} onValueChange={setSelectedMessages}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {messageFilters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full">
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
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-8">
          {/* Desktop: Original Grid/List Layout */}
          <div className="hidden lg:block">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className={`${memory.backgroundColor} p-6 text-white relative`}>
                      <div className="absolute top-4 right-4 text-2xl">{memory.emoji}</div>
                      <h3 className="text-lg font-semibold mb-2">{memory.title}</h3>
                      <p className="text-sm opacity-90">{memory.date}</p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{memory.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFavorite(memory.id)
                            }}
                            className={`p-1 rounded ${memory.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
                          >
                            <Star className="w-4 h-4" fill={memory.isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(memory.id)
                            }}
                            className="p-1 rounded text-gray-400 hover:text-blue-500"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 rounded text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="p-1 rounded text-gray-400 hover:text-gray-600">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className="flex">
                      <div className={`${memory.backgroundColor} w-48 p-6 text-white relative flex-shrink-0`}>
                        <div className="absolute top-4 right-4 text-2xl">{memory.emoji}</div>
                        <h3 className="text-lg font-semibold mb-2">{memory.title}</h3>
                        <p className="text-sm opacity-90">{memory.date}</p>
                      </div>
                      <div className="flex-1 p-6">
                        <p className="text-gray-600 mb-4 line-clamp-2">{memory.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleFavorite(memory.id)
                              }}
                              className={`p-2 rounded ${memory.isFavorite ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}
                            >
                              <Star className="w-4 h-4" fill={memory.isFavorite ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShare(memory.id)
                              }}
                              className="p-2 rounded text-gray-400 hover:text-blue-500"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded text-gray-400 hover:text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="p-2 rounded text-gray-400 hover:text-gray-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile: New Optimized Layout */}
          <div className="lg:hidden">
            {viewMode === "list" ? (
              <div className="space-y-4">
                {filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className="flex">
                      <div className={`${memory.backgroundColor} w-32 p-4 text-white relative flex-shrink-0`}>
                        <div className="absolute top-3 right-3 text-xl">{memory.emoji}</div>
                        <h3 className="text-sm font-semibold mb-1 leading-tight">{memory.title}</h3>
                        <p className="text-xs opacity-90">{memory.date}</p>
                        <div className="absolute bottom-3 left-4">
                          <span className="text-xs px-2 py-1 bg-white/20 rounded-full">
                            {memory.emotion.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">{memory.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleFavorite(memory.id)
                              }}
                              className={`p-1.5 rounded-full ${memory.isFavorite ? "text-yellow-500" : "text-gray-400"}`}
                            >
                              <Star className="w-4 h-4" fill={memory.isFavorite ? "currentColor" : "none"} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShare(memory.id)
                              }}
                              className="p-1.5 rounded-full text-gray-400"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-full text-gray-400">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <button className="p-1.5 rounded-full text-gray-400">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className={`${memory.backgroundColor} p-4 text-white relative`}>
                      <div className="absolute top-3 right-3 text-lg">{memory.emoji}</div>
                      <h3 className="text-sm font-semibold mb-1 leading-tight pr-8">{memory.title}</h3>
                      <p className="text-xs opacity-90">{memory.date}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{memory.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFavorite(memory.id)
                            }}
                            className={`p-1 rounded-full ${memory.isFavorite ? "text-yellow-500" : "text-gray-400"}`}
                          >
                            <Star className="w-3.5 h-3.5" fill={memory.isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShare(memory.id)
                            }}
                            className="p-1 rounded-full text-gray-400"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button className="p-1 rounded-full text-gray-400">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Memory Detail Modal */}
      <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
        <DialogContent className="max-w-2xl lg:max-w-2xl max-w-sm mx-4 lg:mx-auto max-h-[80vh] lg:max-h-[80vh] overflow-y-auto">
          {selectedMemory && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{selectedMemory.date}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">close</span>
                </div>
                <button onClick={() => setSelectedMemory(null)} className="p-1 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
                <div
                  className={`${selectedMemory.backgroundColor} rounded-lg p-6 text-white relative w-full lg:w-80 flex-shrink-0`}
                >
                  <div className="absolute top-4 right-4 text-2xl">{selectedMemory.emoji}</div>
                  <h2 className="text-xl font-semibold mb-4">{selectedMemory.title}</h2>
                  <p className="text-sm leading-relaxed">{selectedMemory.content}</p>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Memory Insights</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedMemory.insights}</p>
                  </div>

                  <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                    <Button
                      onClick={() => handleFavorite(selectedMemory.id)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Star className="w-4 h-4" fill={selectedMemory.isFavorite ? "currentColor" : "none"} />
                      <span>Favourites</span>
                    </Button>
                    <Button
                      onClick={() => handleShare(selectedMemory.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>

                  <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                    <Button
                      onClick={() => handleDelete(selectedMemory.id)}
                      variant="destructive"
                      className="flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                    <Button
                      onClick={() => handleEdit(selectedMemory.id)}
                      className="gradient-primary hover:gradient-primary-hover text-white border-0 flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit in FrameText</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
