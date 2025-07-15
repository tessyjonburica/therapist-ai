"use client"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/valentino-logo-desktop.png"
              alt="Valentino AI - Your personal relationship guide"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              About
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-500">
            <p>© 2025 Valentino AI. All rights reserved.</p>
            <p className="mt-1">Empowering relationships through AI-powered guidance</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
