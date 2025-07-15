"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  X,
  Check,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const classes = [
  {
    id: 1,
    title: "Football Fundamentals",
    sport: "Football",
    level: "Beginner",
    schedule: "Mon, Wed, Fri",
    time: "6:00 PM - 7:30 PM",
    location: "Victory Sports Complex",
    enrolled: 18,
    maxStudents: 25,
    rating: 4.9,
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131770/dexciss%20site/dexplay/optimal/400/football_x400/pexels-bohlemedia-1884576_x400_kwsrjq.jpg?height=200&width=300",
    students: [
      { name: "Alex", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40" },
      { name: "Sarah", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40" },
      { name: "Mike", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40" },
    ],
    status: "active",
    nextSession: "Today 6:00 PM",
  },
  {
    id: 2,
    title: "Advanced Tennis",
    sport: "Tennis",
    level: "Advanced",
    schedule: "Tue, Thu, Sat",
    time: "5:00 PM - 6:30 PM",
    location: "Elite Tennis Club",
    enrolled: 12,
    maxStudents: 16,
    rating: 4.8,
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131755/dexciss%20site/dexplay/optimal/400/tennis_x400/pexels-athena-2961964_x400_imcjdu.jpg?height=200&width=300",
    students: [
      { name: "Emma", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217662/People%20Profile/pm0476_w0_dfthen.avif?height=40&width=40" },
      { name: "John", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40" },
    ],
    status: "upcoming",
    nextSession: "Tomorrow 5:00 PM",
  },
  {
    id: 3,
    title: "Basketball Skills",
    sport: "Basketball",
    level: "Intermediate",
    schedule: "Sat, Sun",
    time: "4:00 PM - 5:30 PM",
    location: "Downtown Courts",
    enrolled: 22,
    maxStudents: 30,
    rating: 4.7,
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131786/dexciss%20site/dexplay/optimal/400/basketball_x400/pexels-justinianoadriano-1905009_x400_fuypwk.jpg?height=200&width=300",
    students: [
      { name: "David", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217764/People%20Profile/depositphotos_223166560-stock-photo-young-handsome-indian-man-against_zv9wum.webp?height=40&width=40" },
      { name: "Lisa", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40" },
      { name: "Tom", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217658/People%20Profile/images_veqgag.jpg?height=40&width=40" },
      { name: "Anna", avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40" },
    ],
    status: "completed",
    nextSession: "Friday 4:00 PM",
  },
]

interface CoachClassesScreenProps {
  coach: any
}

export default function CoachClassesScreen({ coach }: CoachClassesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false)
  const [showCreateSuccess, setShowCreateSuccess] = useState(false)
  const [newClass, setNewClass] = useState({
    title: "",
    sport: "",
    level: "Beginner",
    schedule: "",
    time: "",
    location: "",
    maxStudents: 20,
    description: "",
    image: "",
  })
  
  // New state for manage class functionality
  const [managedClassId, setManagedClassId] = useState<number | null>(null)
  const [showManageSuccess, setShowManageSuccess] = useState(false)
  const [classForm, setClassForm] = useState({
    title: "",
    schedule: "",
    time: "",
    location: "",
    maxStudents: 20,
    notes: ""
  })

  const filters = ["All", "Active", "Upcoming", "Completed"]

  const filteredClasses = classes.filter((classItem) => {
    const matchesFilter =
      selectedFilter === "All" ||
      classItem.status.toLowerCase() === selectedFilter.toLowerCase()
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleCreateClass = () => {
    // Here you would typically send the data to your backend
    console.log("Creating new class:", newClass)
    // Reset form and close dialog
    setNewClass({
      title: "",
      sport: "",
      level: "Beginner",
      schedule: "",
      time: "",
      location: "",
      maxStudents: 20,
      description: "",
      image: "",
    })
    setIsCreateClassOpen(false)
    setShowCreateSuccess(true)
  }

  // New handlers for manage class
  const handleManageClick = (classId: number) => {
    setManagedClassId(classId)
    // Pre-fill form with existing class data
    const classItem = classes.find(c => c.id === classId)
    if (classItem) {
      setClassForm({
        title: classItem.title,
        schedule: classItem.schedule,
        time: classItem.time,
        location: classItem.location,
        maxStudents: classItem.maxStudents,
        notes: ""
      })
    }
  }

  const handleClassFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClassForm(prev => ({ ...prev, [name]: value }))
  }

  const handleClassFormSubmit = () => {
    // Here you would typically make an API call to update the class
    setManagedClassId(null)
    setShowManageSuccess(true)
  }
  

  // Get the current managed class data
  const managedClass = managedClassId ? classes.find(c => c.id === managedClassId) : null

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 sm:px-6 py-6 bg-white border-b border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Classes</h1>
          <p className="text-gray-600">Manage your training sessions and students</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 "
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-full sm:w-12 border-gray-200 bg-transparent"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className={`flex-shrink-0 rounded-xl ${
                selectedFilter === filter
                  ? "bg-[#D7EE34] hover:bg-[#D7EE34] text-black border-black"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 space-y-6">
        {filteredClasses.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 sm:h-64">
                <Image
                  src={classItem.image || "/placeholder.svg"}
                  alt={classItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-0">
                    {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`border-0 ${
                      classItem.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : classItem.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {classItem.level}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{classItem.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {classItem.enrolled}/{classItem.maxStudents}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{classItem.rating}</span>
                        </div>
                      </div>
                      <div className="text-white/80 text-xs">{classItem.nextSession}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{classItem.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{classItem.location}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {classItem.students.slice(0, 4).map((student, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                        >
                          <Image
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {classItem.enrolled > 4 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">
                            +{classItem.enrolled - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {classItem.enrolled} students
                    </span>
                  </div>
                  <Button 
                    className="bg-black hover:bg-gray-800 text-[#D7EE34] rounded-xl px-6"
                    onClick={() => handleManageClick(classItem.id)}
                  >
                    Manage Class
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-24 right-4"
      >
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-[#D7EE34] hover:bg-black text-black  hover:text-white shadow-2xl"
          onClick={() => setIsCreateClassOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Create Class Dialog */}
      <Dialog open={isCreateClassOpen} onOpenChange={setIsCreateClassOpen} >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Class</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Class Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Football Fundamentals"
                  value={newClass.title}
                  onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sport">Sport</Label>
                <Input
                  id="sport"
                  placeholder="e.g., Football, Tennis, Basketball"
                  value={newClass.sport}
                  onChange={(e) => setNewClass({...newClass, sport: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Skill Level</Label>
                <Select 
                  value={newClass.level}
                  onValueChange={(value) => setNewClass({...newClass, level: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  min="1"
                  value={newClass.maxStudents}
                  onChange={(e) => setNewClass({...newClass, maxStudents: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., Mon, Wed, Fri"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  placeholder="e.g., 6:00 PM - 7:30 PM"
                  value={newClass.time}
                  onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Victory Sports Complex"
                value={newClass.location}
                onChange={(e) => setNewClass({...newClass, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL (optional)</Label>
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={newClass.image}
                onChange={(e) => setNewClass({...newClass, image: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your class..."
                value={newClass.description}
                onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button 
              className = "hover:bg-[#D7EE34]"
              variant="outline" 
              onClick={() => setIsCreateClassOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#D7EE34] hover:bg-black text-black hover:text-white"
              onClick={handleCreateClass}
            >
              Create Class
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Success Dialog */}
      <Dialog open={showCreateSuccess} onOpenChange={setShowCreateSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center mt-3">Class Created!</DialogTitle>
            <DialogDescription className="text-center">
              Your new class has been successfully created.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="bg-black hover:bg-gray-800 text-white"
              onClick={() => setShowCreateSuccess(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Class Dialog */}
      <Dialog open={managedClassId !== null} onOpenChange={(open) => !open && setManagedClassId(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Manage Class</DialogTitle>
            {managedClass && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{managedClass.enrolled} enrolled students</span>
              </div>
            )}
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manage-title">Class Title</Label>
                <Input
                  id="manage-title"
                  name="title"
                  value={classForm.title}
                  onChange={handleClassFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manage-maxStudents">Max Students</Label>
                <Input
                  id="manage-maxStudents"
                  name="maxStudents"
                  type="number"
                  min="1"
                  value={classForm.maxStudents}
                  onChange={handleClassFormChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manage-schedule">Schedule</Label>
                <Input
                  id="manage-schedule"
                  name="schedule"
                  value={classForm.schedule}
                  onChange={handleClassFormChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manage-time">Time</Label>
                <Input
                  id="manage-time"
                  name="time"
                  value={classForm.time}
                  onChange={handleClassFormChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="manage-location">Location</Label>
              <Input
                id="manage-location"
                name="location"
                value={classForm.location}
                onChange={handleClassFormChange}
              />
            </div>

            {/* Student List Section */}
            {managedClass && (
              <div className="space-y-2">
                <Label>Students</Label>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {managedClass.students.map((student, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border">
                          <Image
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    ))}
                    {managedClass.enrolled > managedClass.students.length && (
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm">+{managedClass.enrolled - managedClass.students.length}</span>
                        </div>
                        <span>more students</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="manage-notes">Notes</Label>
              <Textarea
                id="manage-notes"
                name="notes"
                value={classForm.notes}
                onChange={handleClassFormChange}
                rows={4}
                placeholder="Add any updates or notes for students..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button 
              className="hover:bg-[#D7EE34]"
              variant="outline" 
              onClick={() => setManagedClassId(null)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#D7EE34] hover:bg-black text-black hover:text-white"
              onClick={handleClassFormSubmit}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Success Dialog */}
      <Dialog open={showManageSuccess} onOpenChange={setShowManageSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center mt-3">Class Created!</DialogTitle>
            <DialogDescription className="text-center">
              Your class details have been successfully created.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="bg-black hover:bg-[#D7EE34] text-white hover:text-black"
              onClick={() => setShowManageSuccess(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}