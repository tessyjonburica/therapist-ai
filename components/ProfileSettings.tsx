"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, CreditCard, Bell, Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import TopNavbar from "./TopNavbar"

interface ProfileSettingsProps {
  onMenuClick?: () => void
}

export default function ProfileSettings({ onMenuClick }: ProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState("account")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    sessionSummaries: true,
    creativeUpdates: false,
    weeklyInsights: false,
    themeRecommendations: true,
    specialOffers: true,
  })
  const [privacy, setPrivacy] = useState({
    storeHistory: true,
    useDataPersonalization: false,
  })

  const [formData, setFormData] = useState({
    email: "christopher@gmail.com",
    username: "Christopher",
    firstName: "Brown",
    lastName: "Christopher",
    currentPassword: "2874881776446",
    newPassword: "446816847",
    confirmPassword: "446816847",
  })

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ]

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: [
        "5 AI Therapist chats/day",
        "Basic text styling tools",
        "Save up to 10 messages",
        "Access to 3 love themes",
        "Limited customization options",
      ],
      current: true,
    },
    {
      name: "Standard",
      price: "$9.99",
      period: "/month",
      features: [
        "Everything in Free",
        "Unlimited message history",
        "Priority AI response time",
        "Full access to text styles",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/month",
      features: [
        "Everything in Standard",
        "Custom AI personality",
        "Premium animated templates",
        "Emotional growth insights",
        "Priority support & New features",
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <TopNavbar title="" onMenuClick={onMenuClick} />

      {/* Desktop Layout - Original */}
      <div className="hidden lg:flex flex-1">
        <div className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex space-x-6 mb-8 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Account Tab */}
          {activeTab === "account" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <p className="text-sm text-gray-600 mb-6">Update your personal details and profile picture.</p>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-medium">C</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Christopher</h4>
                    <p className="text-sm text-gray-500">Free</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update your password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current password*</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New password*</label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password*</label>
                    <div className="relative">
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gradient-primary hover:gradient-primary-hover text-white border-0">
                  Save changes
                </Button>
              </div>
            </motion.div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Plan</h3>
                <p className="text-sm text-gray-600 mb-6">You are currently on the Free Plan.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`border rounded-lg p-6 ${
                      plan.current ? "border-pink-500 bg-pink-50" : "border-gray-200"
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.current
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : plan.popular
                            ? "gradient-primary hover:gradient-primary-hover text-white border-0"
                            : "border border-gray-300 hover:bg-gray-50"
                      }`}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : plan.popular ? "Get Started" : "Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Push Notifications</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Session Summaries</h4>
                      <p className="text-sm text-gray-600">Receive a summary after each therapy session</p>
                    </div>
                    <Switch
                      checked={notifications.sessionSummaries}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, sessionSummaries: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Creative Style Updates</h4>
                      <p className="text-sm text-gray-600">
                        Be the first to know when new themes or FrameText styles are available to try.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.creativeUpdates}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, creativeUpdates: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Email Notifications</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Weekly Insights</h4>
                      <p className="text-sm text-gray-600">
                        Receive gentle journaling prompts or supportive notes during emotionally sensitive periods.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyInsights}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyInsights: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Theme Recommendations</h4>
                      <p className="text-sm text-gray-600">
                        Get personalized love themes or message ideas based on your recent activity.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.themeRecommendations}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, themeRecommendations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Special Offers</h4>
                      <p className="text-sm text-gray-600">Promotional emails and special discounts</p>
                    </div>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, specialOffers: checked }))}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Privacy Control</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Store Conversation History</h4>
                      <p className="text-sm text-gray-600">Keep a record of your conversations with the AI therapist</p>
                    </div>
                    <Switch
                      checked={privacy.storeHistory}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, storeHistory: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Use Data for Personalization</h4>
                      <p className="text-sm text-gray-600">
                        Allow us to analyze conversations to improve your experience
                      </p>
                    </div>
                    <Switch
                      checked={privacy.useDataPersonalization}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({ ...prev, useDataPersonalization: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Your Data</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Download Your Data</h4>
                      <p className="text-sm text-gray-600">Get a copy of all data associated with your account</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Delete Conversation History</h4>
                      <p className="text-sm text-gray-600">Remove all past conversations with the AI therapist</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-900">Delete Account</h4>
                      <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Layout - New Optimized */}
      <div className="lg:hidden flex flex-col flex-1">
        {/* Mobile Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id ? "gradient-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Account Tab - Mobile */}
          {activeTab === "account" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-medium">C</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Christopher</h4>
                    <p className="text-sm text-gray-500">Free</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current password*</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New password*</label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password*</label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full gradient-primary hover:gradient-primary-hover text-white border-0">
                Save changes
              </Button>
            </motion.div>
          )}

          {/* Subscriptions Tab - Mobile */}
          {activeTab === "subscriptions" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Current Plan</h3>
                <p className="text-sm text-gray-600 mb-4">You are currently on the Free Plan.</p>
              </div>

              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-lg p-4 border ${
                    plan.current ? "border-pink-500 bg-pink-50" : "border-gray-200"
                  }`}
                >
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-gray-900">{plan.name}</h4>
                    <div className="mt-2">
                      <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.current
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : plan.popular
                          ? "gradient-primary hover:gradient-primary-hover text-white border-0"
                          : "border border-gray-300 hover:bg-gray-50"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.popular ? "Get Started" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Notifications Tab - Mobile */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Session Summaries</h4>
                      <p className="text-sm text-gray-600">Receive a summary after each therapy session</p>
                    </div>
                    <Switch
                      checked={notifications.sessionSummaries}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, sessionSummaries: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Creative Style Updates</h4>
                      <p className="text-sm text-gray-600">
                        Be the first to know when new themes or FrameText styles are available to try.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.creativeUpdates}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, creativeUpdates: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Weekly Insights</h4>
                      <p className="text-sm text-gray-600">
                        Receive gentle journaling prompts or supportive notes during emotionally sensitive periods.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyInsights}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyInsights: checked }))}
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Theme Recommendations</h4>
                      <p className="text-sm text-gray-600">
                        Get personalized love themes or message ideas based on your recent activity.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.themeRecommendations}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, themeRecommendations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Special Offers</h4>
                      <p className="text-sm text-gray-600">Promotional emails and special discounts</p>
                    </div>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, specialOffers: checked }))}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Privacy Tab - Mobile */}
          {activeTab === "privacy" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Control</h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Store Conversation History</h4>
                      <p className="text-sm text-gray-600">Keep a record of your conversations with the AI therapist</p>
                    </div>
                    <Switch
                      checked={privacy.storeHistory}
                      onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, storeHistory: checked }))}
                    />
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-medium text-gray-900">Use Data for Personalization</h4>
                      <p className="text-sm text-gray-600">
                        Allow us to analyze conversations to improve your experience
                      </p>
                    </div>
                    <Switch
                      checked={privacy.useDataPersonalization}
                      onCheckedChange={(checked) =>
                        setPrivacy((prev) => ({ ...prev, useDataPersonalization: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Data</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Download Your Data</h4>
                      <p className="text-xs text-gray-600">Get a copy of all data associated with your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">Delete Conversation History</h4>
                      <p className="text-xs text-gray-600">Remove all past conversations with the AI therapist</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                    >
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex-1">
                      <h4 className="font-medium text-red-900 text-sm">Delete Account</h4>
                      <p className="text-xs text-red-600">Permanently delete your account and all associated data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
