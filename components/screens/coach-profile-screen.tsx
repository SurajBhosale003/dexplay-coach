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
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=60&width=60",
    earned: true,
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "5-Star Mentor",
    description: "Maintained 5-star rating",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=60&width=60",
    earned: true,
    date: "Dec 20, 2023",
  },
  {
    id: 3,
    name: "Champion Builder",
    description: "Students won 10 tournaments",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif?height=60&width=60",
    earned: false,
    progress: 7,
    total: 10,
  },
  {
    id: 4,
    name: "Dedication Award",
    description: "1 year of consistent coaching",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=60&width=60",
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
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131766/dexciss%20site/dexplay/optimal/400/football_x400/pexels-yogendras31-3361471_x400_y1b45n.jpg?height=48&width=48",
  },
  {
    id: 2,
    title: "Advanced Tennis",
    date: "Yesterday 5:00 PM",
    students: 12,
    rating: 4.8,
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131753/dexciss%20site/dexplay/optimal/400/tennis_x400/pexels-tomfisk-3452545_x400_awwfnf.jpg?height=48&width=48",
  },
  {
    id: 3,
    title: "Basketball Skills",
    date: "Dec 8, 2024",
    students: 22,
    rating: 4.7,
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131780/dexciss%20site/dexplay/optimal/400/basketball_x400/pexels-kaip-2234254_x400_vcxrx4.jpg?height=48&width=48",
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
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
    rating: 5,
    comment: "Amazing coach! Really helped improve my football skills. Highly recommend!",
    date: "2 days ago",
    class: "Football Fundamentals",
  },
  {
    id: 2,
    student: "Sarah Wilson",
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
    rating: 5,
    comment: "Patient and knowledgeable. Great teaching style for beginners.",
    date: "1 week ago",
    class: "Tennis Basics",
  },
  {
    id: 3,
    student: "Mike Chen",
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40",
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
    <div className="bg-white min-h-screen pb-20">
      {/* Header - Sticky for mobile */}
      <div className="sticky top-0 z-10 px-4 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Coach Profile</h1>
          <Button variant="ghost" size="sm" className="rounded-full w-8 h-8">
            <Settings className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 py-4">
        <Card className="border-gray-200 p-4 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=80&width=80"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black hover:bg-gray-800 text-white"
              >
                <Edit3 className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Coach {coach?.name || "Martinez"}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {coach?.sport || "Football"} Coach • {coach?.experience || "5+"} years experience
              </p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-900">4.9 Rating</span>
                <Badge className="bg-[#D7EE34] text-black  border-blue-200 text-xs ml-1">Verified</Badge>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">About</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {coach?.bio ||
                "Passionate football coach with over 5 years of experience training athletes of all levels. Specialized in developing fundamental skills and building team spirit. Committed to helping every student reach their full potential."}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center mb-1">
                  <stat.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600 mb-0.5">{stat.label}</div>
                <div className="text-xs text-[#D7EE34] font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
            <Button variant="ghost" size="sm" className="text-gray-600 text-sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-3 text-center relative overflow-hidden ${
                    achievement.earned
                      ? "border-yellow-200 bg-[#d8ee3499] from-yellow-50 to-orange-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden mx-auto mb-2">
                    <Image
                      src={achievement.image || "/placeholder.svg"}
                      alt={achievement.name}
                      width={40}
                      height={40}
                      className={`object-cover ${!achievement.earned ? "grayscale" : ""}`}
                    />
                  </div>
                  <div className={`font-bold text-xs mb-1 ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </div>
                  {achievement.earned && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">{achievement.date}</div>
                  )}
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-gray-400 h-1 rounded-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {achievement.progress}/{achievement.total}
                      </div>
                    </div>
                  )}
                  {achievement.earned && <Award className="absolute top-1 right-1 w-3 h-3 text-black" />}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Classes */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Recent Classes</h3>
            <Button variant="ghost" size="sm" className="text-gray-600 text-sm">
              <Calendar className="w-3 h-3 mr-1" />
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {recentClasses.map((classItem, index) => (
              <Card key={classItem.id} className="border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.title}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{classItem.title}</div>
                      <div className="text-xs text-gray-600">{classItem.date}</div>
                      <div className="text-xs text-gray-500">{classItem.students} students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900 text-sm">{classItem.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Reviews */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">Student Reviews</h3>
            <Button variant="ghost" size="sm" className="text-gray-600 text-sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-gray-200 p-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.student}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{review.student}</div>
                          <div className="text-xs text-gray-500">
                            {review.class} • {review.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom on mobile */}
        <div className=" bg-white border-t border-gray-200 p-3 shadow-lg z-10">
        <div className="flex gap-2 max-w-md mx-auto"> {/* Added max-width and margin */}
          <Button className="flex-1 h-12 bg-[#D7EE34] hover:bg-gray-800 text-black rounded-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message All
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 border-gray-200 hover:border-gray-300 rounded-lg bg-transparent"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}