"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Clock,
  Users,
  Calendar,
  Bell,
  MapPin,
  Star,
  Zap,
  Trophy,
  Target,
  MessageCircle,
  Share2,
  Filter,
} from "lucide-react"
import Image from "next/image"
import CreateMatchModal from "@/components/create-match-modal"
import LiveMatchTracker from "@/components/live-match-tracker"
import SocialFeed from "@/components/social-feed"
import WeatherWidget from "@/components/weather-widget"

const sports = [
  {
    id: "football",
    name: "Football",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 24,
    nextMatch: "Today 6:00 PM",
    trending: true,
    players: 1250,
    avgRating: 4.8,
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 18,
    nextMatch: "Tomorrow 7:30 PM",
    trending: false,
    players: 890,
    avgRating: 4.6,
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "/placeholder.svg?height=200&width=300",
    activeMatches: 12,
    nextMatch: "Today 5:00 PM",
    trending: true,
    players: 650,
    avgRating: 4.9,
  },
]

const stats = [
  { label: "Matches", value: "24", icon: Target, change: "+12%", color: "text-blue-600" },
  { label: "Win Rate", value: "75%", icon: Trophy, change: "+5%", color: "text-green-600" },
  { label: "Rating", value: "4.8", icon: Star, change: "+0.2", color: "text-yellow-600" },
  { label: "Hours", value: "48", icon: Clock, change: "+8h", color: "text-purple-600" },
]

const liveMatches = [
  {
    id: 1,
    sport: "Football",
    teams: ["Team Alpha", "Team Beta"],
    score: [2, 1],
    time: "78'",
    venue: "Victory Park",
    viewers: 45,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    sport: "Basketball",
    teams: ["Court Kings", "Hoops Elite"],
    score: [67, 72],
    time: "Q4 8:45",
    venue: "Downtown Courts",
    viewers: 32,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const nearbyVenues = [
  {
    id: 1,
    name: "Elite Sports Complex",
    distance: "0.8 km",
    rating: 4.9,
    image: "/placeholder.svg?height=80&width=120",
    available: true,
    price: "₹500/hr",
  },
  {
    id: 2,
    name: "Victory Tennis Club",
    distance: "1.2 km",
    rating: 4.7,
    image: "/placeholder.svg?height=80&width=120",
    available: false,
    price: "₹300/hr",
  },
]

interface HomeScreenProps {
  user: any
}

export default function HomeScreen({ user }: HomeScreenProps) {
  const [showCreateMatch, setShowCreateMatch] = useState(false)
  const [selectedSport, setSelectedSport] = useState<any>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCreateMatch = (sport: any) => {
    setSelectedSport(sport)
    setShowCreateMatch(true)
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Header */}
      <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <motion.h1
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getGreeting()}, {user?.name}!
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to dominate the field?
            </motion.p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-white">{user?.name?.charAt(0) || "U"}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Card className="p-3 text-center border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: Target },
            { id: "live", label: "Live Matches", icon: Zap },
            { id: "social", label: "Social", icon: MessageCircle },
            { id: "venues", label: "Nearby", icon: MapPin },
          ].map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              onClick={() => setActiveSection(section.id)}
              className={`flex-shrink-0 rounded-xl ${
                activeSection === section.id
                  ? "bg-black text-white border-black"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6 py-6"
          >
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Enhanced Sports Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Sports</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    View All
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {sports.map((sport, index) => (
                  <motion.div
                    key={sport.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48">
                        <Image src={sport.image || "/placeholder.svg"} alt={sport.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Trending Badge */}
                        {sport.trending && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4">
                            <Badge className="bg-red-500 text-white border-0 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Trending
                            </Badge>
                          </motion.div>
                        )}

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-3">{sport.name}</h3>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span className="text-sm">{sport.activeMatches} active</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">{sport.nextMatch}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-white/80 text-xs">
                                <span>{sport.players.toLocaleString()} players</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span>{sport.avgRating}</span>
                                </div>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                onClick={() => handleCreateMatch(sport)}
                                size="sm"
                                className="bg-white text-black hover:bg-gray-100 rounded-lg shadow-lg"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Create
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="bg-gray-50 -mx-6 px-6 py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Matches</h2>
                <Button variant="ghost" className="text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    sport: "Football",
                    venue: "Victory Park",
                    time: "Today 6:00 PM",
                    players: "8/10",
                    status: "confirmed",
                  },
                  { sport: "Tennis", venue: "Elite Club", time: "Tomorrow 5:00 PM", players: "2/2", status: "waiting" },
                  { sport: "Basketball", venue: "Downtown", time: "Friday 7:30 PM", players: "4/6", status: "open" },
                ].map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-4 border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt="Sport"
                              width={24}
                              height={24}
                              className="rounded-lg filter brightness-0 invert"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{match.sport} Match</div>
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {match.venue} • {match.time}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <Users className="w-3 h-3" />
                              {match.players} players
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${
                              match.status === "confirmed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : match.status === "waiting"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}
                          >
                            {match.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "live" && (
          <motion.div
            key="live"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LiveMatchTracker matches={liveMatches} />
          </motion.div>
        )}

        {activeSection === "social" && (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SocialFeed />
          </motion.div>
        )}

        {activeSection === "venues" && (
          <motion.div
            key="venues"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-6 py-6"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Nearby Venues</h2>
              <p className="text-gray-600">Find courts and facilities near you</p>
            </div>

            <div className="space-y-4">
              {nearbyVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-4 border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={venue.image || "/placeholder.svg"}
                          alt={venue.name}
                          width={64}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{venue.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span>{venue.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{venue.price}</div>
                        <Badge className={venue.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {venue.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Match Modal */}
      {showCreateMatch && <CreateMatchModal sport={selectedSport} onClose={() => setShowCreateMatch(false)} />}
    </div>
  )
}
