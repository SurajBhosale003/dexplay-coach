"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Calendar, Bell, Star, Clock, Target, BookOpen, UserCheck } from "lucide-react"
import Image from "next/image"
import CreateClassModal from "@/components/create-class-modal"

const stats = [
  { label: "Students", value: "48", icon: Users, change: "+8", color: "text-blue-600" },
  { label: "Classes", value: "12", icon: BookOpen, change: "+3", color: "text-green-600" },
  { label: "Rating", value: "4.9", icon: Star, change: "+0.1", color: "text-yellow-600" },
  { label: "Hours", value: "156", icon: Clock, change: "+24h", color: "text-purple-600" },
]

const quickActions = [
  {
    id: "create-class",
    title: "Create New Class",
    description: "Start a new training session",
    icon: Plus,
    color: "bg-blue-500",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "manage-players",
    title: "Manage Players",
    description: "View and organize your athletes",
    icon: Users,
    color: "bg-green-500",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "quick-match",
    title: "Quick Match Requests",
    description: "Review match opportunities",
    icon: Target,
    color: "bg-orange-500",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "attendance",
    title: "Review Attendance",
    description: "Track student participation",
    icon: UserCheck,
    color: "bg-purple-500",
    image: "/placeholder.svg?height=80&width=120",
  },
]

const upcomingClasses = [
  {
    id: 1,
    title: "Football Fundamentals",
    time: "Today 6:00 PM",
    students: 15,
    maxStudents: 20,
    level: "Beginner",
    venue: "Victory Sports Complex",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Advanced Tennis",
    time: "Tomorrow 5:00 PM",
    students: 8,
    maxStudents: 12,
    level: "Advanced",
    venue: "Elite Tennis Club",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Basketball Skills",
    time: "Friday 7:30 PM",
    students: 12,
    maxStudents: 16,
    level: "Intermediate",
    venue: "Downtown Courts",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "new_student",
    message: "Sarah Wilson joined Football Fundamentals",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "review",
    message: "Mike Chen left a 5-star review",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "achievement",
    message: "Your student Alex scored a hat-trick!",
    time: "6 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

interface CoachHomeScreenProps {
  coach: any
}

export default function CoachHomeScreen({ coach }: CoachHomeScreenProps) {
  const [showCreateClass, setShowCreateClass] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleQuickAction = (actionId: string) => {
    if (actionId === "create-class") {
      setShowCreateClass(true)
    }
    // Handle other actions
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
              {getGreeting()}, Coach {coach?.name}!
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to inspire your athletes?
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
              <span className="text-sm font-semibold text-white">{coach?.name?.charAt(0) || "C"}</span>
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
                <div className="text-xs text-[#D7EE34]">{stat.label}</div>
                <div className="text-xs text-[#D7EE34] font-medium">{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h2>
          <p className="text-gray-600">Manage your coaching activities</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="p-4 border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleQuickAction(action.id)}
              >
                <div className="relative h-20 rounded-lg overflow-hidden mb-4">
                  <Image src={action.image || "/placeholder.svg"} alt={action.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className={`absolute top-2 right-2 w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}
                  >
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-[#D7EE34]">{action.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="px-6 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Classes</h2>
          <Button variant="ghost" className="text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {upcomingClasses.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-4 border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.title}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{classItem.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {classItem.time}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                        <Users className="w-3 h-3" />
                        {classItem.students}/{classItem.maxStudents} students
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`mb-2 ${
                        classItem.level === "Beginner"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : classItem.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {classItem.level}
                    </Badge>
                    <div className="text-xs text-gray-500">{classItem.venue}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Button variant="ghost" className="text-gray-600">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={activity.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Class Modal */}
      {showCreateClass && <CreateClassModal onClose={() => setShowCreateClass(false)} />}
    </div>
  )
}
