import { Zap, Activity, Thermometer, MapPin, Heart } from "lucide-react";

export interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: "healthy" | "warning" | "critical";
  temperature: number; // Celsius
  heartRate: number; // bpm
  steps: number;
  lastMilking: string;
  location: string;
  batteryLevel: number; // Collar battery
}

export const mockCows: Cow[] = [
  {
    id: "COW-1024",
    name: "Bella",
    breed: "Holstein",
    age: 4,
    status: "healthy",
    temperature: 38.6,
    heartRate: 62,
    steps: 4500,
    lastMilking: "2 hours ago",
    location: "Pasture A",
    batteryLevel: 85,
  },
  {
    id: "COW-1025",
    name: "Daisy",
    breed: "Jersey",
    age: 3,
    status: "warning",
    temperature: 39.2,
    heartRate: 75,
    steps: 1200,
    lastMilking: "4 hours ago",
    location: "Barn 2",
    batteryLevel: 42,
  },
  {
    id: "COW-1026",
    name: "Luna",
    breed: "Holstein",
    age: 5,
    status: "healthy",
    temperature: 38.4,
    heartRate: 60,
    steps: 5100,
    lastMilking: "1 hour ago",
    location: "Pasture A",
    batteryLevel: 91,
  },
  {
    id: "COW-1027",
    name: "Molly",
    breed: "Guernsey",
    age: 2,
    status: "critical",
    temperature: 40.1,
    heartRate: 88,
    steps: 500,
    lastMilking: "6 hours ago",
    location: "Sick Bay",
    batteryLevel: 15,
  },
  {
    id: "COW-1028",
    name: "Bessie",
    breed: "Holstein",
    age: 6,
    status: "healthy",
    temperature: 38.5,
    heartRate: 64,
    steps: 3800,
    lastMilking: "3 hours ago",
    location: "Pasture B",
    batteryLevel: 78,
  },
];

export const activityData = [
  { time: "06:00", steps: 200 },
  { time: "08:00", steps: 800 },
  { time: "10:00", steps: 1500 },
  { time: "12:00", steps: 1200 },
  { time: "14:00", steps: 600 },
  { time: "16:00", steps: 900 },
];
