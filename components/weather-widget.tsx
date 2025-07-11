"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Wind, Droplets } from "lucide-react"

export default function WeatherWidget() {
  const [weather, setWeather] = useState({
    temperature: 24,
    condition: "sunny",
    humidity: 65,
    windSpeed: 12,
    location: "Downtown",
    recommendation: "Perfect weather for outdoor sports!",
  })

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="w-8 h-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-8 h-8 text-blue-500" />
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">{getWeatherIcon()}</div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{weather.temperature}°C</div>
              <div className="text-sm text-gray-600 capitalize">
                {weather.condition} in {weather.location}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                <span>{weather.windSpeed} km/h</span>
              </div>
            </div>
            <div className="text-xs text-green-600 font-medium">{weather.recommendation}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
