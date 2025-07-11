"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageCircle, Heart, Share2, MapPin } from "lucide-react"
import Image from "next/image"

interface LiveMatch {
  id: number
  sport: string
  teams: string[]
  score: number[]
  time: string
  venue: string
  viewers: number
  image: string
}

interface LiveMatchTrackerProps {
  matches: LiveMatch[]
}

export default function LiveMatchTracker({ matches }: LiveMatchTrackerProps) {
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (matches.length > 0) {
      setSelectedMatch(matches[0])
    }
  }, [matches])

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h2 className="text-xl font-bold text-gray-900">Live Matches</h2>
        </div>
        <p className="text-gray-600">Watch matches happening right now</p>
      </div>

      {/* Featured Live Match */}
      {selectedMatch && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="overflow-hidden border-gray-200 shadow-lg">
            <div className="relative h-48 bg-gradient-to-r from-green-400 to-blue-500">
              <Image
                src={selectedMatch.image || "/placeholder.svg"}
                alt="Live match"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Live Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white border-0 flex items-center gap-1 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  LIVE
                </Badge>
              </div>

              {/* Viewers */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 bg-black/50 rounded-full px-3 py-1">
                  <Eye className="w-4 h-4 text-white" />
                  <span className="text-white text-sm">{selectedMatch.viewers}</span>
                </div>
              </div>

              {/* Match Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{selectedMatch.teams[0]}</div>
                      <div className="text-4xl font-bold text-white">{selectedMatch.score[0]}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/80 text-sm">VS</div>
                      <div className="text-white font-bold text-lg">{selectedMatch.time}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{selectedMatch.teams[1]}</div>
                      <div className="text-4xl font-bold text-white">{selectedMatch.score[1]}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{selectedMatch.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Other Live Matches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Other Live Matches</h3>
        {matches
          .filter((match) => match.id !== selectedMatch?.id)
          .map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMatch(match)}
            >
              <Card className="p-4 border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={match.image || "/placeholder.svg"}
                        alt={match.sport}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{match.sport}</span>
                        <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">LIVE</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {match.teams[0]} vs {match.teams[1]}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {match.venue}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {match.score[0]} - {match.score[1]}
                    </div>
                    <div className="text-sm text-gray-600">{match.time}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Eye className="w-3 h-3" />
                      {match.viewers}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
      </div>

      {/* Join Live Commentary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Join Live Commentary</h3>
            <p className="text-gray-600 mb-4">Chat with other fans watching the match</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Join Chat</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
