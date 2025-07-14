"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Clock, Star, MessageCircle, User } from "lucide-react"
import Image from "next/image"

const joinRequests = [
  {
    id: 1,
    player: {
      name: "Alex Johnson",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=60&width=60",
      age: 24,
      skillLevel: "Intermediate",
      rating: 4.6,
      matchesPlayed: 45,
    },
    class: {
      title: "Football Fundamentals",
      sport: "Football",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131701/dexciss%20site/dexplay/optimal/100/football_x100/pexels-pixabay-46798_x100_poqqj8.jpg?height=40&width=40",
    },
    requestTime: "2 hours ago",
    message:
      "Hi Coach! I'm really excited to join your football training. I've been playing for 3 years and looking to improve my skills.",
    status: "pending",
  },
  {
    id: 2,
    player: {
      name: "Sarah Wilson",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=60&width=60",
      age: 19,
      skillLevel: "Beginner",
      rating: 4.2,
      matchesPlayed: 12,
    },
    class: {
      title: "Tennis Basics",
      sport: "Tennis",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131723/dexciss%20site/dexplay/optimal/100/tennis_x100/pexels-jim-de-ramos-395808-1277397_x100_f0r2x0.jpg?height=40&width=40",
    },
    requestTime: "4 hours ago",
    message: "I'm new to tennis but very motivated to learn. Would love to be part of your beginner class!",
    status: "pending",
  },
  {
    id: 3,
    player: {
      name: "Mike Chen",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=60&width=60",
      age: 28,
      skillLevel: "Advanced",
      rating: 4.8,
      matchesPlayed: 89,
    },
    class: {
      title: "Basketball Skills",
      sport: "Basketball",
      image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131711/dexciss%20site/dexplay/optimal/100/basketball_x100/pexels-markusspiske-1752757_x100_b3tzgh.jpg?height=40&width=40",
    },
    requestTime: "6 hours ago",
    message: "Looking forward to training with you. I have tournament experience and want to refine my techniques.",
    status: "pending",
  },
]

const recentActions = [
  {
    id: 1,
    action: "approved",
    player: "Emma Davis",
    class: "Football Fundamentals",
    time: "1 day ago",
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
  },
  {
    id: 2,
    action: "rejected",
    player: "John Smith",
    class: "Advanced Tennis",
    time: "2 days ago",
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
  },
  {
    id: 3,
    action: "approved",
    player: "Lisa Brown",
    class: "Basketball Skills",
    time: "3 days ago",
    avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
  },
]

interface CoachRequestsScreenProps {
  coach: any
}

export default function CoachRequestsScreen({ coach }: CoachRequestsScreenProps) {
  const [requests, setRequests] = useState(joinRequests)

  const handleApprove = (requestId: number) => {
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "approved" } : req)))
  }

  const handleReject = (requestId: number) => {
    setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "rejected" } : req)))
  }

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 md:px-8">
      <div className="py-6 border-b border-gray-200">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Requests</h1>
          <p className="text-gray-600">Review and manage student applications</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 text-center border-gray-100 bg-[#D7EE34]">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {requests.filter((r) => r.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </Card>
          <Card className="p-4 text-center border-gray-100 bg-[#D7EE34]" >
            <div className="text-2xl font-bold text-green-600 mb-1">24</div>
            <div className="text-sm text-gray-600">Approved</div>
          </Card>
          <Card className="p-4 text-center border-gray-100 bg-[#D7EE34]">
            <div className="text-2xl font-bold text-red-600 mb-1">8</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </Card>
        </div>
      </div>

      <div className="py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pending Requests</h2>
          <p className="text-gray-600">New applications waiting for your review</p>
        </div>

        <div className="space-y-6">
          {requests.filter((request) => request.status === "pending").map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image src={request.player.avatar} alt={request.player.name} width={64} height={64} className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{request.player.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <span>Age {request.player.age}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{request.player.rating}</span>
                          </div>
                          <span>{request.player.matchesPlayed} matches</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`mb-2 ${
                          request.player.skillLevel === "Beginner"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : request.player.skillLevel === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {request.player.skillLevel}
                      </Badge>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {request.requestTime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <Image src={request.class.image} alt={request.class.sport} width={50} height={50} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Wants to join:</div>
                      <div className="text-sm text-gray-600">{request.class.title}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">Message from player:</span>
                    </div>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-xl italic">"{request.message}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button onClick={() => handleApprove(request.id)} className="w-full h-12 bg-[#D7EE34] hover:bg-green-700 text-black hover:text-white rounded-xl">
                        <Check className="w-5 h-5 mr-2" />
                        Approve
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button onClick={() => handleReject(request.id)} variant="outline" className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl">
                        <X className="w-5 h-5 mr-2" />
                        Reject
                      </Button>
                    </motion.div>
                    <Button variant="outline" size="icon" className="h-12 w-12 border-gray-200 hover:border-gray-300 rounded-xl bg-transparent">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-0 py-6 sm:px-6 bg-gray-50">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Recent Actions</h2>
          <p className="text-gray-600">Your recent decisions on join requests</p>
        </div>

        <div className="space-y-3">
          {recentActions.map((action, index) => (
            <motion.div key={action.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="p-4 border-[#D7EE34] ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image src={action.avatar} alt={action.player} width={40} height={40} className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">
                        <span className="font-semibold">{action.player}</span> was {" "}
                        <span className={`font-semibold ${action.action === "approved" ? "text-green-600" : "text-red-600"}`}>
                          {action.action}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {action.class} • {action.time}
                      </div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${action.action === "approved" ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {requests.filter((r) => r.status === "pending").length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-6 py-12 text-center">
          <Card className="p-8 border-gray-200">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Pending Requests</h3>
            <p className="text-gray-600">All caught up! New join requests will appear here.</p>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
