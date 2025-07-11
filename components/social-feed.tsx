"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MoreHorizontal, Trophy, Camera, Video } from "lucide-react"
import Image from "next/image"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      level: "Pro Player",
    },
    content:
      "Just scored a hat-trick in today's match! 🔥 The team coordination was incredible. Thanks to everyone who came out to support!",
    image: "/placeholder.svg?height=300&width=400",
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    type: "achievement",
    achievement: "Hat Trick Hero",
  },
  {
    id: 2,
    user: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      level: "Rising Star",
    },
    content: "New personal best in tennis today! 🎾 Finally broke my serve record. Practice makes perfect!",
    video: "/placeholder.svg?height=200&width=300",
    timestamp: "4 hours ago",
    likes: 32,
    comments: 8,
    shares: 5,
    type: "milestone",
  },
  {
    id: 3,
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      level: "Coach",
    },
    content: "Great training session with the basketball team today. These young players have incredible potential! 🏀",
    images: [
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
      "/placeholder.svg?height=150&width=200",
    ],
    timestamp: "6 hours ago",
    likes: 67,
    comments: 15,
    shares: 12,
    type: "training",
  },
]

export default function SocialFeed() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Social Feed</h2>
        <p className="text-gray-600">See what your sports community is up to</p>
      </div>

      {/* Create Post */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Card className="p-4 border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Share your sports moment..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-black"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Trophy className="w-4 h-4 mr-2" />
                Achievement
              </Button>
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white">Post</Button>
          </div>
        </Card>
      </motion.div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={post.user.avatar || "/placeholder.svg"}
                        alt={post.user.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{post.user.name}</span>
                        {post.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          {post.user.level}
                        </Badge>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 mb-4">{post.content}</p>

                {/* Achievement Badge */}
                {post.type === "achievement" && post.achievement && (
                  <div className="mb-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-2 w-fit">
                      <Trophy className="w-4 h-4" />
                      {post.achievement}
                    </Badge>
                  </div>
                )}

                {/* Media */}
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      width={400}
                      height={300}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {post.images && (
                  <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
                    {post.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img || "/placeholder.svg"}
                        alt={`Post image ${idx + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-24 object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      likedPosts.includes(post.id) ? "bg-red-50 text-red-600" : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                    <span>Like</span>
                  </motion.button>

                  <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                  </Button>

                  <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8"
      >
        <Button variant="outline" className="border-gray-200 hover:border-gray-300 bg-transparent">
          Load More Posts
        </Button>
      </motion.div>
    </div>
  )
}
