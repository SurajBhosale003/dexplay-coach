"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import CoachSplashScreen from "@/components/coach-splash-screen"
import CoachSignupFlow from "@/components/coach-signup-flow"
import CoachMainApp from "@/components/coach-main-app"

export default function DexPlayCoachApp() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "signup" | "app">("splash")
  const [coach, setCoach] = useState<any>(null)

  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("signup")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const handleSignupComplete = (coachData: any) => {
    setCoach(coachData)
    setCurrentScreen("app")
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" && <CoachSplashScreen key="splash" onComplete={() => setCurrentScreen("signup")} />}
        {currentScreen === "signup" && <CoachSignupFlow key="signup" onComplete={handleSignupComplete} />}
        {currentScreen === "app" && <CoachMainApp key="app" coach={coach} />}
      </AnimatePresence>
    </div>
  )
}
