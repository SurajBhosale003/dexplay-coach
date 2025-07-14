"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Clock,
  MapPin,
  MessageCircle,
  Filter,
  Search,
  Target,
  Calendar,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const quickMatches = [
  {
    id: 1,
    sport: "Football",
    title: "5v5 Football Match",
    location: "Victory Sports Complex",
    time: "Today 6:00 PM",
    players: "8/10",
    level: "Intermediate",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131703/dexciss%20site/dexplay/optimal/100/football_x100/pexels-yogendras31-1375148_x100_ijn8mr.jpg?height=60&width=60",
    organizer: {
      name: "Alex Johnson",
      avatar:
        "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40",
    },
    description: "Looking for skilled players for a competitive match",
    status: "available",
    price: "₹200 per person",
  },
  {
    id: 2,
    sport: "Basketball",
    title: "3v3 Basketball",
    location: "Downtown Courts",
    time: "Tomorrow 7:30 PM",
    players: "4/6",
    level: "Beginner",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131709/dexciss%20site/dexplay/optimal/100/basketball_x100/pexels-img_1979-stevonka-379280-2116469_x100_zyvz1w.jpg?height=60&width=60",
    organizer: {
      name: "Sarah Wilson",
      avatar:
        "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
    },
    description: "Casual game for beginners to practice",
    status: "available",
    price: "₹150 per person",
  },
  {
    id: 3,
    sport: "Tennis",
    title: "Singles Tennis",
    location: "Elite Tennis Club",
    time: "Today 5:00 PM",
    players: "1/2",
    level: "Advanced",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131717/dexciss%20site/dexplay/optimal/100/tennis_x100/pexels-dmytro-1259064-2694942_x100_h6lhuy.jpg?height=60&width=60",
    organizer: {
      name: "Mike Chen",
      avatar:
        "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
    },
    description: "Advanced level singles match",
    status: "available",
    price: "₹300 per person",
  },
];

const coachMatches = [
  {
    id: 1,
    title: "Football Training Match",
    myStudents: ["Alex", "Sarah", "Mike", "Emma"],
    opponents: "Team Alpha",
    date: "Tomorrow 6:00 PM",
    venue: "Victory Sports Complex",
    type: "Training Match",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131693/dexciss%20site/dexplay/optimal/100/football_x100/pexels-rethaferguson-3621104_x100_zwfeed.jpg?height=60&width=60",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Basketball Scrimmage",
    myStudents: ["John", "Lisa", "Tom"],
    opponents: "Downtown Academy",
    date: "Friday 7:00 PM",
    venue: "Sports Center",
    type: "Friendly Match",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131705/dexciss%20site/dexplay/optimal/100/basketball_x100/pexels-pixabay-71103_x100_uucopb.jpg?height=60&width=60",
    status: "confirmed",
  },
];

const matchHistory = [
  {
    id: 1,
    title: "Football Training Match",
    students: ["Alex", "Sarah", "Mike"],
    result: "Won 3-2",
    date: "Dec 5, 2024",
    venue: "Victory Park",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131693/dexciss%20site/dexplay/optimal/100/football_x100/pexels-rethaferguson-3621104_x100_zwfeed.jpg?height=60&width=60",
    highlights: [
      "Alex scored 2 goals",
      "Great team coordination",
      "Improved defense",
    ],
  },
  {
    id: 2,
    title: "Tennis Tournament",
    students: ["Emma"],
    result: "Runner-up",
    date: "Dec 1, 2024",
    venue: "Elite Club",
    image: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131705/dexciss%20site/dexplay/optimal/100/basketball_x100/pexels-pixabay-71103_x100_uucopb.jpg?height=60&width=60",
    highlights: [
      "Reached finals",
      "Excellent serve improvement",
      "Mental toughness shown",
    ],
  },
];

interface CoachMatchesScreenProps {
  coach: any;
}

export default function CoachMatchesScreen({ coach }: CoachMatchesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // New state for manage match functionality
  const [managedMatchId, setManagedMatchId] = useState<number | null>(null);
  const [showManageSuccess, setShowManageSuccess] = useState(false);
  const [matchForm, setMatchForm] = useState({
    date: "",
    time: "",
    venue: "",
    notes: ""
  });

  // Mock students data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217664/People%20Profile/57dbffd654e3580d51e60e451c5850f9_hhipp8.jpg?height=40&width=40",
      sport: "Football",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217768/People%20Profile/0bdbc7e1f21b705d25b7f81873810086_wurlmo.jpg?height=40&width=40",
      sport: "Basketball",
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752217771/People%20Profile/images_1_myv2ze.jpg?height=40&width=40",
      sport: "Tennis",
    }
  ];

  // Existing handlers for recommendation functionality
  const handleRecommendClick = (matchId: number) => {
    setSelectedMatch(matchId);
    setSelectedStudents([]);
  };

  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student.id));
    }
  };

  const handleSendRecommendation = () => {
    setSelectedMatch(null);
    setShowSuccess(true);
  };

  // New handlers for manage match functionality
  const handleManageClick = (matchId: number) => {
    setManagedMatchId(matchId);
    // Pre-fill form with existing match data
    const match = coachMatches.find(m => m.id === matchId);
    if (match) {
      setMatchForm({
        date: match.date.includes("Tomorrow") ? getFormattedDate(1) : 
              match.date.includes("Friday") ? getNextFriday() : 
              getFormattedDate(0),
        time: match.date.split(" ")[1] || "19:00",
        venue: match.venue,
        notes: ""
      });
    }
  };

  const getFormattedDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  const getNextFriday = () => {
    const date = new Date();
    date.setDate(date.getDate() + (5 - date.getDay() + 7) % 7);
    return date.toISOString().split('T')[0];
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMatchForm(prev => ({ ...prev, [name]: value }));
  };

  const handleManageSubmit = () => {
    setManagedMatchId(null);
    setShowManageSuccess(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 border-b border-gray-100 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Matches</h1>
        <p className="text-gray-600 mb-4">
          Organize matches and track student progress
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search matches, sports, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-black w-full"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-full sm:w-12 border-gray-200"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="quick-matches">
        <div className="px-4 sm:px-6 py-4 border-b border-[#D7EE34]">
          <TabsList className="grid grid-cols-3 bg-[#D7EE34] rounded-xl p-1 text-sm">
            <TabsTrigger
              value="quick-matches"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              Quick Matches
            </TabsTrigger>
            <TabsTrigger
              value="my-matches"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              My Matches
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* QUICK MATCHES */}
        <TabsContent
          value="quick-matches"
          className="px-4 sm:px-6 py-6 space-y-4"
        >
          {quickMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-4 flex flex-col gap-4 sm:flex-row">
                  <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={match.image}
                      alt={match.sport}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {match.title}
                        </h3>
                        <div className="text-sm text-gray-600 flex flex-wrap gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {match.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {match.time}
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={
                          match.level === "Beginner"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : match.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {match.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{match.description}</p>
                    <div className="flex flex-col sm:flex-row justify-between gap-2 items-start sm:items-center">
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {match.players}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src={match.organizer.avatar}
                              alt={match.organizer.name}
                              width={24}
                              height={24}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {match.organizer.name}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="ml-5 bg-[#D7EE34] text-black px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center justify-center">
                          {match.price}
                        </div>
                        <Button
                          size="sm"
                          className="mt-1 bg-black hover:bg-gray-800 text-[#D7EE34] mr-12"
                          style={{ marginTop: "15px" }}
                          onClick={() => handleRecommendClick(match.id)}
                        >
                          Recommend to Students
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* MY MATCHES */}
        <TabsContent value="my-matches" className="px-4 sm:px-6 py-6 space-y-4">
          {coachMatches.length === 0 ? (
            <Card className="border-gray-200 p-8 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Organized Matches
              </h3>
              <p className="text-gray-600 mb-6">
                Create matches for your students to participate in
              </p>
              <Button className="bg-black hover:bg-gray-800 text-white">
                Create Match
              </Button>
            </Card>
          ) : (
            coachMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="p-4 flex flex-col gap-4 sm:flex-row">
                    <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={match.image}
                        alt={match.title}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {match.title}
                          </h3>
                          <div className="text-sm text-gray-600 flex flex-wrap gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {match.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {match.venue}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={
                            match.status === "scheduled"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }
                        >
                          {match.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>My Students:</strong>{" "}
                        {match.myStudents.join(", ")}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>vs:</strong> {match.opponents}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs bg-[#D7EE34]">
                          {match.type}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-200 bg-transparent"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button
                            size="sm"
                            className="bg-black hover:bg-[#D7EE34] text-white"
                            onClick={() => handleManageClick(match.id)}
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        {/* HISTORY */}
        <TabsContent value="history" className="px-4 sm:px-6 py-6 space-y-4">
          {matchHistory.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-gray-200">
                <div className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={match.image}
                      alt={match.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {match.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Students: {match.students.join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {match.venue} • {match.date}
                        </p>
                      </div>
                      <Badge
                        className={
                          match.result.includes("Won")
                            ? "bg-green-100 text-green-800 border-green-200"
                            : match.result.includes("Runner-up")
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                        style={{ height: "30px" }}
                      >
                        {match.result}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <div className="text-sm font-semibold text-gray-900 mb-2">
                        Key Highlights:
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {match.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Student Selection Dialog */}
      <Dialog
        open={selectedMatch !== null}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Recommend Match to Students</DialogTitle>
            <DialogDescription>
              Select students to recommend this match to
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedStudents.length === students.length}
                onCheckedChange={toggleSelectAll}
              />
              <Label htmlFor="select-all">Select All</Label>
            </div>
            <div className="border rounded-lg divide-y">
              {students.map((student) => (
                <div key={student.id} className="p-3 flex items-center">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleStudentSelection(student.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.sport}</p>
                    </div>
                  </div>
                  {selectedStudents.includes(student.id) && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedMatch(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendRecommendation}
              disabled={selectedStudents.length === 0}
              className="bg-black hover:bg-gray-800 text-[#D7EE34]"
            >
              Send Recommendation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center mt-3">
              Recommendation Sent!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your match recommendation has been successfully sent to {selectedStudents.length} students.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-black hover:bg-gray-800 text-[#D7EE34]"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Match Dialog */}
      <Dialog open={managedMatchId !== null} onOpenChange={(open) => !open && setManagedMatchId(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Match</DialogTitle>
            <DialogDescription>
              Update the details for this match
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={matchForm.date}
                  onChange={handleFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={matchForm.time}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={matchForm.venue}
                onChange={handleFormChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes for Participants</Label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={matchForm.notes}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManagedMatchId(null)}>
              Cancel
            </Button>
            <Button 
              className="bg-black hover:bg-gray-800 text-[#D7EE34]"
              onClick={handleManageSubmit}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Success Dialog */}
      <Dialog open={showManageSuccess} onOpenChange={setShowManageSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <DialogTitle className="text-center mt-3">Match Updated!</DialogTitle>
            <DialogDescription className="text-center">
              Your match details have been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="bg-black hover:bg-gray-800 text-[#D7EE34]"
              onClick={() => setShowManageSuccess(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}