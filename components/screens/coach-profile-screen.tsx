"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Trophy, Calendar, Star, Edit3, Users, BookOpen, Award, MessageCircle } from "lucide-react"
import Image from "next/image"

const achievements = [
  {
    id: 1,
    name: "Master Coach",
    description: "Trained 100+ students",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "5-Star Mentor",
    description: "Maintained 5-star rating",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Dec 20, 2023",
  },
  {
    id: 3,
    name: "Champion Builder",
    description: "Students won 10 tournaments",
    image: "/placeholder.svg?height=60&width=60",
    earned: false,
    progress: 7,
    total: 10,
  },
  {
    id: 4,
    name: "Dedication Award",
    description: "1 year of consistent coaching",
    image: "/placeholder.svg?height=60&width=60",
    earned: true,
    date: "Nov 5, 2023",
  },
]

const recentClasses = [
  {
    id: 1,
    title: "Football Fundamentals",
    date: "Today 6:00 PM",
    students: 18,
    rating: 4.9,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    title: "Advanced Tennis",
    date: "Yesterday 5:00 PM",
    students: 12,
    rating: 4.8,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    title: "Basketball Skills",
    date: "Dec 8, 2024",
    students: 22,
    rating: 4.7,
    image: "/placeholder.svg?height=48&width=48",
  },
]

const stats = [
  { label: "Students", value: "156", icon: Users, change: "+24 this month" },
  { label: "Classes", value: "48", icon: BookOpen, change: "+8 this month" },
  { label: "Rating", value: "4.9", icon: Star, change: "Top 5%" },
  { label: "Experience", value: "5+ yrs", icon: Trophy, change: "Expert level" },
]

const reviews = [
  {
    id: 1,
    student: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Amazing coach! Really helped improve my football skills. Highly recommend!",
    date: "2 days ago",
    class: "Football Fundamentals",
  },
  {
    id: 2,
    student: "Sarah Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Patient and knowledgeable. Great teaching style for beginners.",
    date: "1 week ago",
    class: "Tennis Basics",
  },
  {
    id: 3,
    student: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment: "Excellent training sessions. Learned a lot about basketball techniques.",
    date: "2 weeks ago",
    class: "Basketball Skills",
  },
]

interface CoachProfileScreenProps {
  coach: any
}

export default function CoachProfileScreen({ coach }: CoachProfileScreenProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-6 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Coach Profile</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-6">
        <Card className="border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black hover:bg-gray-800 text-white"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Coach {coach?.name || "Martinez"}</h2>
              <p className="text-gray-600 mb-2">
                {coach?.sport || "Football"} Coach • {coach?.experience || "5+"} years experience
              </p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900">4.9 Rating</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 ml-2">Verified Coach</Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed">
              {coach?.bio ||
                "Passionate football coach with over 5 years of experience training athletes of all levels. Specialized in developing fundamental skills and building team spirit. Committed to helping every student reach their full potential."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
            <Button variant="ghost" className="text-gray-600">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 text-center relative overflow-hidden ${
                    achievement.earned
                      ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden mx-auto mb-3">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.name}
                      width={48}
                      height={48}
                      className={`object-cover ${!achievement.earned ? "grayscale" : ""}`}
                    />
                  </div>
                  <div className={`font-bold text-sm mb-1 ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </div>
                  {achievement.earned && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">{achievement.date}</div>
                  )}
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-gray-400 h-1 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.total}
                      </div>
                    </div>
                  )}
                  {achievement.earned && <Award className="absolute top-2 right-2 w-4 h-4 text-yellow-500" />}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Classes */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Classes</h3>
            <Button variant="ghost" className="text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentClasses.map((classItem, index) => (
              <Card key={classItem.id} className="border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
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
                      <div className="text-sm text-gray-600">{classItem.date}</div>
                      <div className="text-xs text-gray-500">{classItem.students} students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">{classItem.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Student Reviews</h3>
            <Button variant="ghost" className="text-gray-600">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.student}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{review.student}</div>
                          <div className="text-xs text-gray-500">
                            {review.class} • {review.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-xl">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message All Students
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 border-gray-200 hover:border-gray-300 rounded-xl bg-transparent"
          >
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
