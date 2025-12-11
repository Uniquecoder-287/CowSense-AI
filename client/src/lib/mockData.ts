import { Zap, Activity, Thermometer, MapPin, Heart, Droplets, Utensils, Brain, AlertTriangle } from "lucide-react";

export interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: "healthy" | "warning" | "critical";
  healthScore: number; // 0-100
  temperature: number; // Celsius
  heartRate: number; // bpm
  steps: number;
  rumination: number; // minutes per day
  lastMilking: string;
  milkOutput: number; // Liters today
  feedIntake: number; // kg
  waterIntake: number; // Liters
  stressScore: number; // 0-10
  location: string;
  batteryLevel: number; // Collar battery
  behavior: {
    walking: number; // hours
    resting: number; // hours
    chewing: number; // hours
  };
  risks: {
    mastitis: "Low" | "Medium" | "High";
    heatStress: "Low" | "Medium" | "High";
    digestive: "Low" | "Medium" | "High";
  };
}

export interface Notification {
  id: string;
  type: "critical" | "warning" | "general";
  title: string;
  time: string;
  message: string;
  explanation: string;
  action: string[];
  firstAid?: string[];
}

export const mockCows: Cow[] = [
  {
    id: "COW-1024",
    name: "Bella",
    breed: "Holstein",
    age: 4,
    status: "healthy",
    healthScore: 92,
    temperature: 38.6,
    heartRate: 62,
    steps: 4500,
    rumination: 480,
    lastMilking: "2 hours ago",
    milkOutput: 28,
    feedIntake: 15,
    waterIntake: 80,
    stressScore: 2,
    location: "Pasture A",
    batteryLevel: 85,
    behavior: { walking: 4, resting: 10, chewing: 8 },
    risks: { mastitis: "Low", heatStress: "Low", digestive: "Low" },
  },
  {
    id: "COW-1025",
    name: "Daisy",
    breed: "Jersey",
    age: 3,
    status: "warning",
    healthScore: 65,
    temperature: 39.2,
    heartRate: 75,
    steps: 1200,
    rumination: 320,
    lastMilking: "4 hours ago",
    milkOutput: 22,
    feedIntake: 12,
    waterIntake: 60,
    stressScore: 6,
    location: "Barn 2",
    batteryLevel: 42,
    behavior: { walking: 2, resting: 14, chewing: 6 },
    risks: { mastitis: "Medium", heatStress: "High", digestive: "Low" },
  },
  {
    id: "COW-1026",
    name: "Luna",
    breed: "Holstein",
    age: 5,
    status: "healthy",
    healthScore: 88,
    temperature: 38.4,
    heartRate: 60,
    steps: 5100,
    rumination: 500,
    lastMilking: "1 hour ago",
    milkOutput: 30,
    feedIntake: 16,
    waterIntake: 85,
    stressScore: 1,
    location: "Pasture A",
    batteryLevel: 91,
    behavior: { walking: 5, resting: 9, chewing: 9 },
    risks: { mastitis: "Low", heatStress: "Low", digestive: "Low" },
  },
  {
    id: "COW-1027",
    name: "Molly",
    breed: "Guernsey",
    age: 2,
    status: "critical",
    healthScore: 35,
    temperature: 40.1,
    heartRate: 88,
    steps: 500,
    rumination: 150,
    lastMilking: "6 hours ago",
    milkOutput: 10,
    feedIntake: 5,
    waterIntake: 30,
    stressScore: 9,
    location: "Sick Bay",
    batteryLevel: 15,
    behavior: { walking: 1, resting: 18, chewing: 2 },
    risks: { mastitis: "High", heatStress: "High", digestive: "Medium" },
  },
  {
    id: "COW-1028",
    name: "Bessie",
    breed: "Holstein",
    age: 6,
    status: "healthy",
    healthScore: 95,
    temperature: 38.5,
    heartRate: 64,
    steps: 3800,
    rumination: 490,
    lastMilking: "3 hours ago",
    milkOutput: 29,
    feedIntake: 15.5,
    waterIntake: 82,
    stressScore: 2,
    location: "Pasture B",
    batteryLevel: 78,
    behavior: { walking: 3.5, resting: 10.5, chewing: 8.5 },
    risks: { mastitis: "Low", heatStress: "Low", digestive: "Low" },
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "critical",
    title: "High Temperature Alert",
    time: "10 min ago",
    message: "Molly (ID: COW-1027) temperature is 40.1°C",
    explanation: "Sustained high body temperature detected. This may indicate an infection or severe heat stress.",
    action: ["Isolate cow immediately", "Check rectal temperature manually", "Contact Vet if > 40°C persists"],
    firstAid: ["Provide cool water", "Move to shaded area", "Monitor breathing rate"],
  },
  {
    id: "2",
    type: "warning",
    title: "Low Rumination detected",
    time: "45 min ago",
    message: "Daisy (ID: COW-1025) rumination dropped by 40%",
    explanation: "Significant drop in chewing activity. Could be early sign of digestive issues or ketosis.",
    action: ["Check feed intake", "Monitor for bloat", "Ensure water access"],
  },
  {
    id: "3",
    type: "general",
    title: "System Update",
    time: "2 hours ago",
    message: "Firmware v2.4 installed on 5 collars",
    explanation: "Automatic firmware update completed successfully. Improved battery life optimization.",
    action: ["No action needed"],
  },
];

export const activityData = [
  { time: "06:00", steps: 200, rumination: 40 },
  { time: "08:00", steps: 800, rumination: 20 },
  { time: "10:00", steps: 1500, rumination: 10 },
  { time: "12:00", steps: 1200, rumination: 50 },
  { time: "14:00", steps: 600, rumination: 60 },
  { time: "16:00", steps: 900, rumination: 30 },
];
