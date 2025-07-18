"use client"

import { motion } from "framer-motion"
import { Home, GraduationCap, Zap, Bell, User } from "lucide-react"

interface CoachBottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "classes", icon: GraduationCap, label: "Classes" },
  { id: "matches", icon: Zap, label: "Matches" },
  { id: "requests", icon: Bell, label: "Requests" },
  { id: "profile", icon: User, label: "Profile" },
]

export default function BottomNav({ activeTab, onTabChange }: CoachBottomNavProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-between w-[90vw] max-w-md mx-auto px-4 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-200">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              className="relative flex items-center justify-center w-12 h-12"
            >
              <div
                className={`absolute w-full h-full rounded-full transition-all duration-300 pointer-events-none ${
                  isActive ? 'shadow-[0_0_12px_4px_#D7EE34]' : ''
                }`}
              ></div>
              <Icon
                className={`w-6 h-6 z-10 transition duration-300 ${
                  isActive ? 'text-[#D7EE34]' : 'text-gray-600'
                }`}
              />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

