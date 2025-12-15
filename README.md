# 🐄 CowSense AI

**CowSense AI** is a smart herd management system designed to help farmers monitor cattle health, track location, and receive AI-driven insights in real-time. The application features a modern, responsive interface with full Dark Mode support and mobile capabilities.

![CowSense AI Dashboard](https://via.placeholder.com/800x400?text=CowSense+AI+Dashboard+Preview)
*(Replace this link with an actual screenshot of your dashboard)*

## ✨ Features

- **📊 Real-time Dashboard:** Monitor herd vitals (Heart Rate, Temp, Rumination) at a glance.
- **🔔 Smart Notifications:** Critical alerts for health risks (Mastitis, Heat Stress) and system updates.
- **🌓 Dark/Light Mode:** Fully optimized high-contrast themes for readability in any lighting.
- **📱 Mobile Optimized:** Built with Capacitor for native Android deployment.
- **🐄 Herd Management:** Detailed profiles for individual cows with search and filter capabilities.
- **⚙️ Customizable Settings:** Toggle specific sensors, alerts, and app preferences.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **UI Components:** Shadcn UI, Lucide React Icons
- **Backend:** Node.js, Express
- **Mobile:** Capacitor (for Android APK generation)
- **State Management:** React Context API & TanStack Query


## 📦 Dependencies & Packages

This project relies on several key libraries to function. All of these are automatically installed when you run `npm install`.

### Core Framework
- **React 19:** The latest version of the UI library.
- **Vite:** Next-generation frontend tooling and build system.
- **Node.js & Express:** Robust backend server handling API requests.

### UI & Styling
- **Tailwind CSS 4:** Utility-first CSS framework for rapid UI development.
- **Radix UI:** Headless, accessible UI primitives (Dialogs, Alerts, Tabs, Switches, etc.).
- **Lucide React:** Beautiful, consistent icon set.
- **Framer Motion:** Library for production-ready animations.
- **Recharts:** Composable charting library for the dashboard.
- **Next Themes:** Easy light/dark mode implementation.

### State & Forms
- **TanStack Query (React Query):** Powerful asynchronous state management.
- **React Hook Form:** Performant, flexible forms with easy validation.
- **Zod:** TypeScript-first schema validation.

### Database & Backend Utilities
- **Drizzle ORM:** Lightweight and type-safe TypeScript ORM.
- **PostgreSQL:** Reliable relational database (via `pg` driver).
- **Passport.js:** Authentication middleware.

### Mobile Support
- **Capacitor:** Native runtime for building web apps on Android/iOS.

---

## 🚀 Getting Started

Follow these instructions to run the project locally as a website.

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)
- Git

### 1. Clone the Repository
git clone https://github.com/Uniquecoder-287/CowSense-AI.git
cd CowSense-AI

text

### 2. Install Dependencies
Install all required packages for both client and server:
npm install

text

### 3. Run as a Website (Development Mode)
This command starts the development server, which handles both the backend API and the frontend interface.

npm run dev

text
> **Note:** The app will typically be accessible at `http://localhost:5000` (or the port specified in your console).

### 4. Build for Production
To create an optimized production build of the website:

npm run build

text
This generates a `dist/` folder containing the static assets.

To preview the production build locally:
npm run start

text

---

## 📱 Building the Android App (APK)

If you want to convert this website into a native Android app:

1.  **Build the web assets:**
    ```
    npx vite build
    ```
    *(Ensure the output goes to `dist/public`)*

2.  **Sync with Capacitor:**
    ```
    npx cap sync
    ```

3.  **Open in Android Studio:**
    ```
    npx cap open android
    ```
4.  From Android Studio, go to **Build > Build APK(s)**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
