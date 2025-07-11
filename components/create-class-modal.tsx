"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react";
import Image from "next/image";

interface CreateClassModalProps {
  onClose: () => void;
}

const sports = [
  {
    id: "football",
    name: "Football",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "tennis",
    name: "Tennis",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "cricket",
    name: "Cricket",
    image: "/placeholder.svg?height=80&width=80",
  },
];

const skillLevels = [
  { id: "beginner", name: "Beginner", description: "New to the sport" },
  { id: "intermediate", name: "Intermediate", description: "Some experience" },
  { id: "advanced", name: "Advanced", description: "Experienced players" },
  {
    id: "professional",
    name: "Professional",
    description: "Competitive level",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export default function CreateClassModal({ onClose }: CreateClassModalProps) {
  const [formData, setFormData] = useState({
    sport: "",
    title: "",
    skillLevel: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    entryFee: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Create New Class</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sport Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-4 block uppercase tracking-wide">
              Select Sport
            </label>
            <div className="grid grid-cols-2 gap-3">
              {sports.map((sport) => (
                <Button
                  key={sport.id}
                  variant={formData.sport === sport.id ? "default" : "outline"}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, sport: sport.id }))
                  }
                  className={`h-auto p-4 flex-col ${
                    formData.sport === sport.id
                      ? "bg-[#D7EE34] text-[#D7EE34] border-[#D7EE34]"
                      : "border-gray-200 hover:border-[#D7EE34]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={sport.image || "/placeholder.svg"}
                      alt={sport.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">{sport.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Class Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
              Class Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g., Football Fundamentals"
              className="h-12 border-2 border-gray-200 focus:border-black"
            />
          </div>

          {/* Skill Level */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-4 block uppercase tracking-wide">
              Skill Level
            </label>
            <div className="grid grid-cols-2 gap-3">
              {skillLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={
                    formData.skillLevel === level.id ? "default" : "outline"
                  }
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, skillLevel: level.id }))
                  }
                  className={`h-auto p-3 flex-col items-start text-left ${
                    formData.skillLevel === level.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-sm">{level.name}</div>
                  <div className="text-xs opacity-80">{level.description}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="h-12 border-2 border-gray-200 focus:border-black"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                <Clock className="w-4 h-4 inline mr-2" />
                Time
              </label>
              <select
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full h-12 border-2 border-gray-200 focus:border-black rounded-lg px-3"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="e.g., Victory Sports Complex"
              className="h-12 border-2 border-gray-200 focus:border-black"
            />
          </div>

          {/* Max Participants and Entry Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                <Users className="w-4 h-4 inline mr-2" />
                Max Students
              </label>
              <Input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxParticipants: e.target.value,
                  }))
                }
                placeholder="20"
                className="h-12 border-2 border-gray-200 focus:border-black"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Entry Fee
              </label>
              <Input
                type="number"
                value={formData.entryFee}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, entryFee: e.target.value }))
                }
                placeholder="₹500"
                className="h-12 border-2 border-gray-200 focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 border-gray-200 hover:border-gray-300 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            disabled={
              !formData.sport || !formData.title || !formData.skillLevel
            }
            className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
          >
            Create Class
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
