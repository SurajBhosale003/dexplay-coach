"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Users,
  Calendar,
  Bell,
  Star,
  Clock,
  Target,
  BookOpen,
  UserCheck,
  X,
  Check,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import CreateClassModal from "@/components/create-class-modal";

const stats = [
  {
    label: "Students",
    value: "48",
    icon: Users,
    change: "+8",
    color: "text-blue-600",
  },
  {
    label: "Classes",
    value: "12",
    icon: BookOpen,
    change: "+3",
    color: "text-green-600",
  },
  {
    label: "Rating",
    value: "4.9",
    icon: Star,
    change: "+0.1",
    color: "text-yellow-600",
  },
  {
    label: "Hours",
    value: "156",
    icon: Clock,
    change: "+24h",
    color: "text-purple-600",
  },
];

const quickActions = [
  {
    id: "create-class",
    title: "Create New Class",
    description: "Start a new training session",
    icon: Plus,
    color: "bg-blue-500",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752487080/dexciss%20site/dexplay/sports-tools_zsitnf.jpg?height=80&width=120",
  },
  {
    id: "manage-players",
    title: "Manage Players",
    description: "View and organize your athletes",
    icon: Users,
    color: "bg-green-500",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752486731/dexciss%20site/dexplay/football-trainer-teaching-his-pupils_temsfd.jpg?height=80&width=120",
  },
  {
    id: "quick-match",
    title: "Quick Match Requests",
    description: "Review match opportunities",
    icon: Target,
    color: "bg-orange-500",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752486782/dexciss%20site/dexplay/3974601_nf5lj7.jpg?height=80&width=120",
  },
  {
    id: "attendance",
    title: "Review Attendance",
    description: "Track student participation",
    icon: UserCheck,
    color: "bg-purple-500",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752487072/dexciss%20site/dexplay/collage-customer-experience-concept_voi7pk.jpg?height=80&width=120",
  },
];

const upcomingClasses = [
  {
    id: 1,
    title: "Football Fundamentals",
    time: "Today 6:00 PM",
    students: 15,
    maxStudents: 20,
    level: "Beginner",
    venue: "Victory Sports Complex",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752060630/dexciss%20site/dexplay/pexels-pixabay-46798_hf7q6x.jpg?height=60&width=60",
  },
  {
    id: 2,
    title: "Advanced Tennis",
    time: "Tomorrow 5:00 PM",
    students: 8,
    maxStudents: 12,
    level: "Advanced",
    venue: "Elite Tennis Club",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752060790/dexciss%20site/dexplay/pexels-pixabay-209977_h7ucwg.jpg?height=60&width=60",
  },
  {
    id: 3,
    title: "Basketball Skills",
    time: "Friday 7:30 PM",
    students: 12,
    maxStudents: 16,
    level: "Intermediate",
    venue: "Downtown Courts",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752061048/dexciss%20site/dexplay/pexels-vladvictoria-2202685_tcjqfc.jpg?height=60&width=60",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "new_student",
    message: "Sarah Wilson joined Football Fundamentals",
    time: "2 hours ago",
    avatar:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
  },
  {
    id: 2,
    type: "review",
    message: "Mike Chen left a 5-star review",
    time: "4 hours ago",
    avatar:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
  },
  {
    id: 3,
    type: "achievement",
    message: "Your student Alex scored a hat-trick!",
    time: "6 hours ago",
    avatar:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40",
  },
];

const matchRequests = [
  {
    id: 1,
    team: "City FC",
    date: "Tomorrow 4:00 PM",
    venue: "City Sports Park",
    level: "Intermediate",
  },
  {
    id: 2,
    team: "United Juniors",
    date: "Friday 5:30 PM",
    venue: "United Training Ground",
    level: "Advanced",
  },
];

const attendanceDetails = [
  {
    classId: 1,
    students: [
      {
        id: 1,
        name: "John Doe",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
      },
      {
        id: 2,
        name: "Sarah Wilson",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
      },
      {
        id: 3,
        name: "Mike Chen",
        status: "absent",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
      },
      {
        id: 4,
        name: "Alex Johnson",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40",
      },
      {
        id: 5,
        name: "Emily Davis",
        status: "late",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif?height=40&width=40",
      },
    ],
  },
  {
    classId: 2,
    students: [
      {
        id: 6,
        name: "David Miller",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
      },
      {
        id: 7,
        name: "Lisa Wong",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif?height=40&width=40",
      },
      {
        id: 8,
        name: "Ryan Park",
        status: "absent",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
      },
    ],
  },
  {
    classId: 3,
    students: [
      {
        id: 9,
        name: "Emma Stone",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40",
      },
      {
        id: 10,
        name: "Chris Evans",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40",
      },
      {
        id: 11,
        name: "Olivia Kim",
        status: "present",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40",
      },
      {
        id: 12,
        name: "Daniel Lee",
        status: "late",
        avatar:
          "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
      },
    ],
  },
];

interface CoachHomeScreenProps {
  coach: any;
}

export default function CoachHomeScreen({ coach }: CoachHomeScreenProps) {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [showManagePlayers, setShowManagePlayers] = useState(false);
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);
  const [currentAttendanceClass, setCurrentAttendanceClass] =
    useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [playerForm, setPlayerForm] = useState({
    name: "",
    email: "",
    class: "",
  });
  const [newClassForm, setNewClassForm] = useState({
    title: "",
    sport: "football",
    level: "beginner",
    date: "",
    time: "",
    maxStudents: "",
    venue: "",
    description: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleQuickAction = (actionId: string) => {
    if (actionId === "create-class") {
      setShowCreateClass(true);
    } else if (actionId === "manage-players") {
      setShowManagePlayers(true);
    } else if (actionId === "quick-match") {
      setShowQuickMatch(true);
    } else if (actionId === "attendance") {
      setShowAttendance(true);
    }
  };

  const handlePlayerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage("Player information saved successfully!");
    setShowManagePlayers(false);
    setPlayerForm({ name: "", email: "", class: "" });
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleMatchAction = (id: number, action: "accept" | "reject") => {
    const request = matchRequests.find((req) => req.id === id);
    if (request) {
      setShowSuccessMessage(
        `Match request from ${request.team} has been ${
          action === "accept" ? "accepted" : "rejected"
        }`
      );
    }
    setShowQuickMatch(false);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleAttendanceSubmit = () => {
    setShowSuccessMessage("Attendance records updated successfully!");
    setShowAttendance(false);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleViewAttendanceDetails = (classId: number) => {
    const selectedClass = upcomingClasses.find((cls) => cls.id === classId);
    const details = attendanceDetails.find(
      (detail) => detail.classId === classId
    );

    if (selectedClass && details) {
      setCurrentAttendanceClass({
        ...selectedClass,
        students: details.students,
      });
      setShowAttendanceDetails(true);
    }
  };

  const handleBackToAttendance = () => {
    setShowAttendanceDetails(false);
  };

  const handleCreateClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreateClass(false);
    setShowSuccessMessage("New class created successfully!");
    setTimeout(() => setShowSuccessMessage(""), 3000);
    // Reset form
    setNewClassForm({
      title: "",
      sport: "football",
      level: "beginner",
      date: "",
      time: "",
      maxStudents: "",
      venue: "",
      description: "",
    });
  };

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
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-white">
                {coach?.name?.charAt(0) || "C"}
              </span>
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
              <Card className="p-3 text-center border border-gray-200 transition-all duration-300 hover:shadow-[0_4px_20px_0_#D7EE34]">
                <div
                  className={`flex items-center justify-center mb-2 ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-[#D7EE34]">{stat.label}</div>
                <div className="text-xs text-black font-medium">
                  {stat.change}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Quick Actions
          </h2>
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
                  <Image
                    src={action.image || "/placeholder.svg"}
                    alt={action.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className={`absolute top-2 right-2 w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}
                  >
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {action.title}
                </h3>
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
                    <div className="w-20 h-11 rounded-lg overflow-hidden">
                      <Image
                        src={classItem.image || "/placeholder.svg"}
                        alt={classItem.title}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {classItem.title}
                      </div>
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
                    <div className="text-xs text-gray-500">
                      {classItem.venue}
                    </div>
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
      {showCreateClass && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-end justify-center z-[99]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white w-full rounded-t-[32px] shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >
            {/* Header with curved top */}
            <div className="sticky top-0 bg-white z-10 p-5 border-b border-gray-200 flex justify-between items-center rounded-t-[32px]">
              <h3 className="text-xl font-bold text-gray-800">
                Create New Class
              </h3>
              <button
                onClick={() => setShowCreateClass(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 136px)" }}
            >
              <form
                onSubmit={handleCreateClassSubmit}
                className="p-5 space-y-5"
              >
                {/* Class Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newClassForm.title}
                    onChange={(e) =>
                      setNewClassForm({
                        ...newClassForm,
                        title: e.target.value,
                      })
                    }
                    required
                    placeholder="Advanced Basketball Techniques"
                  />
                </div>

                {/* Sport and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sport
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newClassForm.sport}
                      onChange={(e) =>
                        setNewClassForm({
                          ...newClassForm,
                          sport: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="football">Football</option>
                      <option value="basketball">Basketball</option>
                      <option value="tennis">Tennis</option>
                      <option value="volleyball">Volleyball</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newClassForm.level}
                      onChange={(e) =>
                        setNewClassForm({
                          ...newClassForm,
                          level: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newClassForm.date}
                      onChange={(e) =>
                        setNewClassForm({
                          ...newClassForm,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={newClassForm.time}
                      onChange={(e) =>
                        setNewClassForm({
                          ...newClassForm,
                          time: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Max Students */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Students
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newClassForm.maxStudents}
                    onChange={(e) =>
                      setNewClassForm({
                        ...newClassForm,
                        maxStudents: e.target.value,
                      })
                    }
                    required
                    placeholder="20"
                  />
                </div>

                {/* Venue */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newClassForm.venue}
                    onChange={(e) =>
                      setNewClassForm({
                        ...newClassForm,
                        venue: e.target.value,
                      })
                    }
                    required
                    placeholder="Main Sports Hall"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    value={newClassForm.description}
                    onChange={(e) =>
                      setNewClassForm({
                        ...newClassForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Describe the class..."
                  />
                </div>
              </form>
            </div>

            {/* Footer with curved bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-[32px]">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="rounded-[12px] px-6 py-3"
                  onClick={() => setShowCreateClass(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-[12px] px-6 py-3 bg-[#D7EE34] text-black"
                  onClick={handleCreateClassSubmit}
                >
                  Create Class
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Manage Players Modal */}
      {showManagePlayers && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-end justify-center z-[99]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="bg-white w-full rounded-t-[32px] shadow-xl"
            style={{ maxHeight: "90vh" }}
          >
            {/* Header with curved top */}
            <div className="sticky top-0 bg-white z-10 p-5 border-b border-gray-100 flex justify-between items-center rounded-t-[32px]">
              <h3 className="text-xl font-bold text-gray-900">
                Manage Players
              </h3>
              <button
                onClick={() => setShowManagePlayers(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handlePlayerFormSubmit}
              className="p-5 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 136px)" }}
            >
              <div className="space-y-5">
                {/* Player Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Player Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-[12px] focus:ring-2 focus:ring-[#D7EE34] focus:border-[#D7EE34] transition-all"
                    value={playerForm.name}
                    onChange={(e) =>
                      setPlayerForm({ ...playerForm, name: e.target.value })
                    }
                    required
                    placeholder="Enter player's full name"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-[12px] focus:ring-2 focus:ring-[#D7EE34] focus:border-[#D7EE34] transition-all"
                    value={playerForm.email}
                    onChange={(e) =>
                      setPlayerForm({ ...playerForm, email: e.target.value })
                    }
                    required
                    placeholder="player@example.com"
                  />
                </div>

                {/* Class Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-[12px] focus:ring-2 focus:ring-[#D7EE34] focus:border-[#D7EE34] transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2ZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem]"
                    value={playerForm.class}
                    onChange={(e) =>
                      setPlayerForm({ ...playerForm, class: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a class</option>
                    {upcomingClasses.map((cls) => (
                      <option
                        key={cls.id}
                        value={cls.title}
                        className="text-gray-900"
                      >
                        {cls.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {/* Footer with curved bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 rounded-b-[32px] items-center">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowManagePlayers(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handlePlayerFormSubmit}
                  className="px-6 py-3 text-sm font-medium text-black bg-[#D7EE34] rounded-[12px] hover:bg-[#D7EE34] hover:white transition-colors duration-200"
                >
                  Save Player
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quick Match Requests Modal */}
      {showQuickMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-end justify-center z-[99]">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="bg-white w-full rounded-t-[32px] shadow-2xl"
            style={{ maxHeight: "90vh" }}
          >
            {/* Header with curved top */}
            <div className="sticky top-0 bg-white z-10 p-5 border-b border-gray-100 flex justify-between items-center rounded-t-[32px]">
              <h3 className="text-xl font-bold text-gray-900">
                Match Requests
              </h3>
              <button
                onClick={() => setShowQuickMatch(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Match Requests List */}
            <div
              className="overflow-y-auto p-5"
              style={{ maxHeight: "calc(90vh - 136px)" }}
            >
              <div className="space-y-4">
                {matchRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-gray-200 rounded-[16px] hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      {/* Team Info */}
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-base text-gray-900">
                          {request.team}
                        </h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            {request.date} at {request.venue}
                          </span>
                        </div>
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#D7EE34] text-gray-900">
                          {request.level}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 self-end sm:self-auto">
                        <button
                          onClick={() =>
                            handleMatchAction(request.id, "reject")
                          }
                          className="px-4 py-2 text-sm font-medium text-red-500 bg-white border border-red-100 rounded-[12px] hover:bg-red-50 transition-colors flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            handleMatchAction(request.id, "accept")
                          }
                          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-[12px] hover:bg-[#D7EE34] hover:text-gray-900 transition-colors flex items-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with curved bottom */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 rounded-b-[32px]">
              <button
                onClick={() => setShowQuickMatch(false)}
                className="w-full py-3 text-sm font-medium text-gray-700 bg-[#D7EE34] border border-gray-200 rounded-[12px] hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Review Attendance Modal */}
      {showAttendance && !showAttendanceDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[99] md:items-center md:p-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Review Attendance
              </h3>
              <button
                onClick={() => setShowAttendance(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <h4 className="font-medium text-gray-700 mb-3">
                Today's Classes
              </h4>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                {upcomingClasses
                  .filter((cls) => cls.time.includes("Today"))
                  .map((cls) => (
                    <div
                      key={cls.id}
                      className="flex items-center justify-between p-4 bg-[#d8ee34de] rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {cls.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {cls.students}/{cls.maxStudents} attended
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 whitespace-nowrap border-gray-300 hover:bg-white"
                        onClick={() => handleViewAttendanceDetails(cls.id)}
                      >
                        Details
                      </Button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-5 border-t">
              <Button
                variant="outline"
                className="h-11 px-6 text-gray-700 border-gray-300 hover:bg-[#D7EE34] "
                onClick={() => setShowAttendance(false)}
              >
                Cancel
              </Button>
              <Button
                className="h-11 px-6 bg-[#D7EE34] text-black"
                onClick={handleAttendanceSubmit}
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Attendance Details Modal */}
      {showAttendanceDetails && currentAttendanceClass && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center z-[99] md:items-center">
          {/* Overlay with click-to-close functionality */}
          <div
            className="absolute inset-0"
            onClick={() => setShowAttendanceDetails(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="relative bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col border border-gray-100"
            style={{
              maxHeight: "90vh",
              height: "fit-content",
              minHeight: "60vh",
            }}
          >
            {/* Draggable handle (for mobile) */}
            <div className="py-2 flex justify-center sticky top-0 z-20 bg-white rounded-t-3xl md:hidden">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center p-6 pb-4 border-b sticky top-0 bg-white z-10">
              <button
                onClick={handleBackToAttendance}
                className="mr-3 p-2 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 flex-1 truncate">
                {currentAttendanceClass.title}
              </h3>
              <button
                onClick={() => setShowAttendanceDetails(false)}
                className="p-2 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Class Info */}
            <div className="p-6 pt-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base text-gray-600 flex items-center">
                  <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {currentAttendanceClass.time}
                  </span>
                </span>
                <Badge
                  variant="secondary"
                  className="text-sm py-1.5 px-3 font-medium bg-[#D7EE34]" 
                >
                  {currentAttendanceClass.level}
                </Badge>
              </div>
              <div className="text-base text-gray-600 flex items-center">
                <Users className="w-5 h-5 mr-2 flex-shrink-0" />
                {currentAttendanceClass.students.length} students
              </div>
            </div>

            {/* Student List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {currentAttendanceClass.students.map((student: any) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 mr-3 border-2 border-gray-100">
                      <Image
                        src={student.avatar || "/placeholder-user.svg"}
                        alt={student.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 44px, 44px"
                      />
                    </div>
                    <span className="font-medium text-gray-900 truncate">
                      {student.name}
                    </span>
                  </div>
                  <Badge
                    variant={
                      student.status === "present"
                        ? "default"
                        : student.status === "late"
                        ? "secondary"
                        : "destructive"
                    }
                    className="text-sm py-1.5 px-3 capitalize font-medium min-w-[80px] text-center"
                  >
                    {student.status === "present" ? (
                      <span>Present</span>
                    ) : student.status === "late" ? (
                      <span>Late</span>
                    ) : (
                      <span>Absent</span>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t sticky bottom-0 bg-white">
              <Button
                variant="outline"
                className="w-full h-14 text-gray-700 border-gray-300 hover:bg-gray-50 bg-[#D7EE34] transition-colors text-base font-medium rounded-xl"
                onClick={() => setShowAttendanceDetails(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Success Message Toast */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-3 bg-[#D7EE34] text-black px-2 py-2 rounded-md shadow-lg flex items-center"
          style={{ marginBottom: "20px", marginLeft: "9px" }}
        >
          <Check className="w-5 h-5 mr-2" />
          {showSuccessMessage}
        </motion.div>
      )}
    </div>
  );
}
