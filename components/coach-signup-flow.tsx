"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  User,
  Target,
  GraduationCap,
  Check,
  Camera,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/image/namelogo-white.png"; 
import fulllogo from "@/public/images/fulllogo-white.png"// adjust path based on your structure

interface CoachSignupFlowProps {
  onComplete: (coachData: any) => void;
}



const sports = [
  {
    id: "football",
    name: "Football",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131772/dexciss%20site/dexplay/optimal/400/football_x400/pexels-rethaferguson-3621104_x400_fwav4h.jpg",
    coaches: "2.1K coaches",
  },
  {
    id: "basketball",
    name: "Basketball",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131778/dexciss%20site/dexplay/optimal/400/basketball_x400/pexels-markusspiske-1752757_x400_svprp8.jpg",
    coaches: "1.8K coaches",
  },
  {
    id: "tennis",
    name: "Tennis",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131760/dexciss%20site/dexplay/optimal/400/tennis_x400/pexels-pixabay-209977_x400_rhisou.jpg",
    coaches: "950 coaches",
  },
  {
    id: "cricket",
    name: "Cricket",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131824/dexciss%20site/dexplay/optimal/400/cricket_x400/pexels-case-originals-3657154_x400_wbkqk7.jpg",
    coaches: "1.2K coaches",
  },
  {
    id: "badminton",
    name: "Badminton",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131818/dexciss%20site/dexplay/optimal/400/badminton_x400/pexels-vladvictoria-2202685_x400_ruup2k.jpg",
    coaches: "680 coaches",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    image:
      "https://res.cloudinary.com/de6u5kbiw/image/upload/v1752131749/dexciss%20site/dexplay/optimal/400/volleyball_x400/pexels-pavel-danilyuk-6203521_x400_qfts1b.jpg",
    coaches: "520 coaches",
  },
];

const experienceLevels = [
  { id: "1-2", label: "1-2 Years", description: "Getting started" },
  { id: "3-5", label: "3-5 Years", description: "Experienced" },
  { id: "6-10", label: "6-10 Years", description: "Senior coach" },
  { id: "10+", label: "10+ Years", description: "Master coach" },
];

export default function CoachSignupFlow({ onComplete }: CoachSignupFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    sport: "",
    experience: "",
    bio: "",
  });
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);

  const handleSportSelect = (sportId: string) => {
    setFormData((prev) => ({ ...prev, sport: sportId }));
  };

  const handleExperienceSelect = (experienceId: string) => {
    setFormData((prev) => ({ ...prev, experience: experienceId }));
  };

  const handleOtpSubmit = () => {
    setTimeout(() => {
      setOtpCode(["1", "2", "3", "4"]);
      setTimeout(() => {
        onComplete(formData);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{width:"50px", height: "80px"}}>
               <Image src={fulllogo} width={50} height={50} className="object-cover w-full h-full" alt="logo" />
            </div>
            <div>
              <span className="text-xl font-bold text-black">
                DexPlay Coach
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">Step {step} of 4</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div
            className="bg-[#D7EE34] h-2 rounded-full"
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <Image
                  src={Logo}
                  alt="Coaching Sport"
                  width={300}
                  height={300}
                  className="w-5 h-5 mx-auto mb-2"
                  style={{
                    marginTop: "-50px",
                    width: "300px",
                    height: "300px",
                  }}
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginTop: "-50px" }}>
                  Welcome Coach!
                </h2>
                <p className="text-gray-600 text-lg">
                  Let's set up your coaching profile
                </p>
              </div>

              <div className="space-y-6">
                {/* Profile Image */}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center relative">
                    {formData.profileImage ? (
                      <Image
                        src={formData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-400" />
                    )}
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#D7EE34] hover:bg-gray-800 text-black p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Add your profile photo
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                    Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your full name"
                    className="h-14 text-lg border-1  focus:border-black rounded-xl"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!formData.name}
                className="w-full h-14 bg-black hover:bg-[#D7EE34] text-white hover:text-black font-semibold rounded-xl text-lg mt-12"
  style={{ marginBottom: "30px" }}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-3">
                <Image
                  src={Logo}
                  alt="Coaching Sport"
                  width={300}
                  height={300}
                  className="w-5 h-5 mx-auto mb-2"
                  style={{
                    marginTop: "-50px",
                    width: "300px",
                    height: "300px",
                  }}
                />
                <h2
                  className="text-3xl font-bold text-gray-900 mb-4"
                  style={{ marginTop: "-50px" }}
                >
                  Your Coaching Sport
                </h2>
                <p className="text-gray-600 text-lg">
                  Select your primary coaching expertise
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {sports.map((sport) => (
                  <motion.div
                    key={sport.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`p-0 cursor-pointer transition-all duration-200 ${
                        formData.sport === sport.id
                          ? "ring-2 ring-black shadow-lg"
                          : "hover:shadow-md border-gray-200"

                      }`}
                      onClick={() => handleSportSelect(sport.id)}
                    >
                      <div className="flex items-center p-4">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden mr-4">
                          <Image
                            src={sport.image || "/placeholder.svg"}
                            alt={sport.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">
                            {sport.name}
                          </h3>
                          <p className="text-[#D7EE34] text-sm">
                            {sport.coaches}
                          </p>
                        </div>
                        {formData.sport === sport.id && (
                          <Check className="w-6 h-6 text-[#D7EE34]" />
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!formData.sport}
                className="w-full h-14 bg-black hover:bg-[#D7EE34] text-white hover:text-black font-semibold rounded-xl text-lg mt-12"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <Image
                  src={Logo}
                  alt="Coaching Sport"
                  width={300}
                  height={300}
                  className="w-5 h-5 mx-auto mb-2"
                  style={{
                    marginTop: "-50px",
                    width: "300px",
                    height: "300px",
                  }}
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginTop: "-50px" }}>
                  Your Experience
                </h2>
                <p className="text-gray-600 text-lg">
                  How long have you been coaching?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {experienceLevels.map((level) => (
                  <motion.div
                    key={level.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all duration-200 text-center ${
                        formData.experience === level.id
                          ? "ring-2 ring-[#D7EE34]adow-lg bg-[#D7EE34] text-black"
                          : "hover:shadow-md border-gray-900"
                      }`}
                      onClick={() => handleExperienceSelect(level.id)}
                    >
                      <div className="font-bold text-lg mb-1">
                        {level.label}
                      </div>
                      <div className="text-sm opacity-80">
                        {level.description}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block uppercase tracking-wide">
                  About You (Optional)
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell us about your coaching philosophy and experience..."
                  rows={4}
                  className="w-full p-4 border-2 border-gray-200 focus:border-black rounded-xl resize-none"
                />
              </div>

              <Button
                onClick={() => setStep(4)}
                disabled={!formData.experience}
                className="w-full h-14 bg-black hover:bg-[#D7EE34] text-white hover:text-black font-semibold rounded-xl text-lg mt-12" style={{marginBottom: "30px"}}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="text-center py-8">
                <Image
                  src={Logo}
                  alt="Coaching Sport"
                  width={300}
                  height={300}
                  className="w-5 h-5 mx-auto mb-2"
                  style={{
                    marginTop: "-50px",
                    width: "300px",
                    height: "300px",
                  }}
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginTop: "-50px" }}>
                  Verify Phone
                </h2>
                <p className="text-gray-600 text-lg">
                  Enter the 4-digit code sent to your phone
                </p>
              </div>

              <div className="flex justify-center gap-4">
                {otpCode.map((digit, index) => (
                  <Input
                    key={index}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otpCode];
                      newOtp[index] = e.target.value.slice(-1);
                      setOtpCode(newOtp);
                    }}
                    className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 focus:border-black rounded-xl"
                    maxLength={1}
                  />
                ))}
              </div>

              <Button
                onClick={handleOtpSubmit}
                className="w-full h-14 bg-black hover:bg-[#D7EE34] text-white hover:text-black font-semibold rounded-xl text-lg mt-12"
              >
                Verify & Continue
              </Button>

              <p className="text-center text-sm text-gray-500">
                Code will auto-fill in 2 seconds...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
