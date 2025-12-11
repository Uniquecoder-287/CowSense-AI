export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    nav: {
      home: "Home",
      herd: "Herd",
      alerts: "Alerts",
      settings: "Settings"
    },
    dashboard: {
      hello: "Hello, Farmer",
      subtitle: "Here's your herd overview",
      herdHealth: "Herd Health",
      quickVitals: "Quick Vitals (Avg)",
      heartRate: "Heart Rate",
      temp: "Temp",
      activity: "Activity",
      rumination: "Rumination",
      aiPredictions: "AI Predictions",
      mastitisRisk: "Mastitis Risk",
      heatStressRisk: "Heat Stress Risk",
      digestiveRisk: "Digestive Disorder",
      liveLocation: "Live Location",
      fullReport: "Full Report",
      aiAnalysis: "AI Analysis based on last 24h of sensor data.",
      bpm: "bpm",
      min: "min",
      lvl: "lvl"
    },
    herd: {
      title: "My Herd",
      searchPlaceholder: "Search by name or ID...",
      allCows: "All Cows",
      needsAttention: "Needs Attention",
      healthy: "Healthy",
      status: {
        healthy: "Healthy",
        warning: "Warning",
        critical: "Critical"
      }
    },
    details: {
      vitalsHistory: "Vitals History",
      steps: "Steps",
      milkOutput: "Milk Output",
      behaviorInsights: "Behavior Insights",
      resting: "Resting",
      walking: "Walking",
      chewing: "Chewing",
      stressScore: "Stress Score",
      downloadReport: "Download Health Report",
      currentLocation: "Current Location",
      lastMilking: "Last Milking",
      age: "Age",
      yearsOld: "years old",
      collarBat: "Collar Bat"
    },
    notifications: {
      title: "Notifications",
      analysis: "Analysis",
      recommendedActions: "Recommended Actions",
      firstAid: "First Aid",
      types: {
        critical: "Critical",
        warning: "Warning",
        general: "General"
      }
    },
    settings: {
      title: "Settings",
      appearance: "Appearance",
      light: "Light",
      dark: "Dark",
      system: "System",
      language: "Language",
      deviceSensors: "Device & Sensors",
      pairNewCollar: "Pair New Collar",
      scanQr: "Scan QR or NFC",
      sensorBattery: "Sensor Battery",
      allGood: "All Good (Avg 85%)",
      firmwareUpdate: "Firmware Update",
      updateAvailable: "v2.4 Available",
      update: "Update",
      notifications: "Notifications",
      healthAlerts: "Health Alerts",
      geoFence: "Geo-fence",
      lowActivity: "Low Activity",
      criticalSos: "Critical SOS",
      dataCloud: "Data & Cloud",
      cloudSync: "Cloud Sync",
      lastSynced: "Last synced: 2 mins ago",
      exportReport: "Export Health Report (PDF)",
      support: "Support",
      helpCenter: "Help Center / FAQ",
      contactVet: "Contact Vet"
    }
  },
  hi: {
    nav: {
      home: "होम",
      herd: "पशुधन",
      alerts: "सूचनाएं",
      settings: "सेटिंग्स"
    },
    dashboard: {
      hello: "नमस्ते, किसान",
      subtitle: "यहाँ आपके झुंड का अवलोकन है",
      herdHealth: "झुंड स्वास्थ्य",
      quickVitals: "त्वरित विटाल (औसत)",
      heartRate: "हृदय गति",
      temp: "तापमान",
      activity: "गतिविधि",
      rumination: "जुगाली",
      aiPredictions: "AI भविष्यवाणियां",
      mastitisRisk: "थनेला जोखिम",
      heatStressRisk: "गर्मी का तनाव",
      digestiveRisk: "पाचन विकार",
      liveLocation: "लाइव लोकेशन",
      fullReport: "पूर्ण रिपोर्ट",
      aiAnalysis: "पिछले 24 घंटों के सेंसर डेटा पर आधारित AI विश्लेषण।",
      bpm: "बीपीएम",
      min: "मिनट",
      lvl: "स्तर"
    },
    herd: {
      title: "मेरा पशुधन",
      searchPlaceholder: "नाम या आईडी से खोजें...",
      allCows: "सभी गायें",
      needsAttention: "ध्यान देने योग्य",
      healthy: "स्वस्थ",
      status: {
        healthy: "स्वस्थ",
        warning: "चेतावनी",
        critical: "गंभीर"
      }
    },
    details: {
      vitalsHistory: "विटाल इतिहास",
      steps: "कदम",
      milkOutput: "दूध उत्पादन",
      behaviorInsights: "व्यवहार अंतर्दृष्टि",
      resting: "आराम",
      walking: "चलना",
      chewing: "जुगाली",
      stressScore: "तनाव स्कोर",
      downloadReport: "स्वास्थ्य रिपोर्ट डाउनलोड करें",
      currentLocation: "वर्तमान स्थान",
      lastMilking: "पिछला दोहन",
      age: "आयु",
      yearsOld: "साल",
      collarBat: "कॉलर बैटरी"
    },
    notifications: {
      title: "सूचनाएं",
      analysis: "विश्लेषण",
      recommendedActions: "अनुशंसित कार्रवाई",
      firstAid: "प्राथमिक चिकित्सा",
      types: {
        critical: "गंभीर",
        warning: "चेतावनी",
        general: "सामान्य"
      }
    },
    settings: {
      title: "सेटिंग्स",
      appearance: "दिखावट",
      light: "लाइट",
      dark: "डार्क",
      system: "सिस्टम",
      language: "भाषा",
      deviceSensors: "उपकरण और सेंसर",
      pairNewCollar: "नया कॉलर जोड़ें",
      scanQr: "QR या NFC स्कैन करें",
      sensorBattery: "सेंसर बैटरी",
      allGood: "सब ठीक है (औसत 85%)",
      firmwareUpdate: "फर्मवेयर अपडेट",
      updateAvailable: "v2.4 उपलब्ध",
      update: "अपडेट",
      notifications: "सूचना वरीयताएँ",
      healthAlerts: "स्वास्थ्य अलर्ट",
      geoFence: "जियो-फेंस",
      lowActivity: "कम गतिविधि",
      criticalSos: "गंभीर SOS",
      dataCloud: "डेटा और क्लाउड",
      cloudSync: "क्लाउड सिंक",
      lastSynced: "सिंक: 2 मिनट पहले",
      exportReport: "स्वास्थ्य रिपोर्ट निर्यात करें (PDF)",
      support: "सहायता",
      helpCenter: "सहायता केंद्र / FAQ",
      contactVet: "पशु चिकित्सक से संपर्क करें"
    }
  },
  mr: {
    nav: {
      home: "मुखपृष्ठ",
      herd: "कळप",
      alerts: "सूचना",
      settings: "सेटिंग्ज"
    },
    dashboard: {
      hello: "नमस्कार, शेतकरी",
      subtitle: "येथे आपल्या कळपाचा आढावा आहे",
      herdHealth: "कळप आरोग्य",
      quickVitals: "जलद माहिती (सरासरी)",
      heartRate: "हृदय गती",
      temp: "तापमान",
      activity: "हालचाल",
      rumination: "रवंथ",
      aiPredictions: "AI अंदाज",
      mastitisRisk: "कासदाह धोका",
      heatStressRisk: "उष्णतेचा ताण",
      digestiveRisk: "पचन विकार",
      liveLocation: "थेट स्थान",
      fullReport: "पूर्ण अहवाल",
      aiAnalysis: "मागील 24 तासांच्या सेन्सर डेटावर आधारित AI विश्लेषण.",
      bpm: "बीपीएम",
      min: "मिनिटे",
      lvl: "स्तर"
    },
    herd: {
      title: "माझा कळप",
      searchPlaceholder: "नाव किंवा आयडी द्वारे शोधा...",
      allCows: "सर्व गायी",
      needsAttention: "लक्ष देणे आवश्यक",
      healthy: "निरोगी",
      status: {
        healthy: "निरोगी",
        warning: "चेतावणी",
        critical: "गंभीर"
      }
    },
    details: {
      vitalsHistory: "आरोग्य इतिहास",
      steps: "पावले",
      milkOutput: "दूध उत्पादन",
      behaviorInsights: "वर्तणूक अंतर्दृष्टी",
      resting: "विश्रांती",
      walking: "चालणे",
      chewing: "रवंथ",
      stressScore: "तनाव गुण",
      downloadReport: "आरोग्य अहवाल डाउनलोड करा",
      currentLocation: "सध्याचे स्थान",
      lastMilking: "शेवटचे दूध काढणे",
      age: "वय",
      yearsOld: "वर्षे",
      collarBat: "कॉलर बॅटरी"
    },
    notifications: {
      title: "सूचना",
      analysis: "विश्लेषण",
      recommendedActions: "शिफारस केलेल्या कृती",
      firstAid: "प्रथमोपचार",
      types: {
        critical: "गंभीर",
        warning: "चेतावणी",
        general: "सामान्य"
      }
    },
    settings: {
      title: "सेटिंग्ज",
      appearance: "दिसणे",
      light: "लाईट",
      dark: "डार्क",
      system: "सिस्टम",
      language: "भाषा",
      deviceSensors: "डिव्हाइस आणि सेन्सर्स",
      pairNewCollar: "नवीन कॉलर जोडा",
      scanQr: "QR किंवा NFC स्कॅन करा",
      sensorBattery: "सेन्सर बॅटरी",
      allGood: "सर्व ठीक (सरासरी 85%)",
      firmwareUpdate: "फर्मवेअर अपडेट",
      updateAvailable: "v2.4 उपलब्ध",
      update: "अपडेट",
      notifications: "सूचना प्राधान्ये",
      healthAlerts: "आरोग्य अलर्ट",
      geoFence: "जिओ-फेन्स",
      lowActivity: "कमी हालचाल",
      criticalSos: "गंभीर SOS",
      dataCloud: "डेटा आणि क्लाउड",
      cloudSync: "क्लाउड सिंक",
      lastSynced: "सिंक: 2 मिनिटांपूर्वी",
      exportReport: "आरोग्य अहवाल एक्सपोर्ट करा (PDF)",
      support: "मदत",
      helpCenter: "मदत केंद्र / FAQ",
      contactVet: "पशुवैद्यकाशी संपर्क साधा"
    }
  }
};
