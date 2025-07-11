"use client"

import { motion } from "framer-motion"
import { Home, MapPin, Zap, GraduationCap, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "court", icon: MapPin, label: "Courts" },
  { id: "match", icon: Zap, label: "Match" },
  { id: "classes", icon: GraduationCap, label: "Classes" },
  { id: "profile", icon: User, label: "Profile" },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-card mx-auto max-w-sm">
        <div className="flex justify-around items-center py-3 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(item.id)}
                className={`relative p-3 rounded-2xl transition-all duration-300 ${
                  isActive ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-white/70"}`} />
                <span className={`text-xs mt-1 block ${isActive ? "text-white" : "text-white/70"}`}>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
