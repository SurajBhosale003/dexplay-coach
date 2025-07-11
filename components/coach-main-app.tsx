"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CoachBottomNav from "@/components/coach-bottom-nav"
import CoachHomeScreen from "@/components/screens/coach-home-screen"
import CoachClassesScreen from "@/components/screens/coach-classes-screen"
import CoachMatchesScreen from "@/components/screens/coach-matches-screen"
import CoachRequestsScreen from "@/components/screens/coach-requests-screen"
import CoachProfileScreen from "@/components/screens/coach-profile-screen"

interface CoachMainAppProps {
  coach: any
}

export default function CoachMainApp({ coach }: CoachMainAppProps) {
  const [activeTab, setActiveTab] = useState("home")

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <CoachHomeScreen coach={coach} />
      case "classes":
        return <CoachClassesScreen coach={coach} />
      case "matches":
        return <CoachMatchesScreen coach={coach} />
      case "requests":
        return <CoachRequestsScreen coach={coach} />
      case "profile":
        return <CoachProfileScreen coach={coach} />
      default:
        return <CoachHomeScreen coach={coach} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {renderScreen()}
      </motion.div>
      <CoachBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
