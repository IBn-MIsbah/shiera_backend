import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Initialize express app
const app = express();

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure view engine and paths
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Helper function to format time
function formatTime(timeString) {
  return timeString.split(" ")[0];
}

// Main route
app.get("/", async (req, res) => {
  try {
    // --- PRAYER TIMES FETCHING ---
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const response = await axios.get(
      `https://api.aladhan.com/v1/calendarByCity?city=Addis%20Ababa&country=Ethiopia&method=2&month=${month}&year=${year}`
    );

    const data = response.data;
    const todayData = data.data[day - 1];

    const prayerTimes = {
      Fajr: formatTime(todayData.timings.Fajr),
      Sunrise: formatTime(todayData.timings.Sunrise),
      Dhuhr: formatTime(todayData.timings.Dhuhr),
      Asr: formatTime(todayData.timings.Asr),
      Maghrib: formatTime(todayData.timings.Maghrib),
      Isha: formatTime(todayData.timings.Isha),
    };

    // --- EVENTS LOADING ---
    const eventsPath = path.join(__dirname, "events.json");
    const eventsData = JSON.parse(fs.readFileSync(eventsPath, "utf8"));

    const eventsWithCountdown = eventsData.events
      .map((event) => {
        const daysRemaining = Math.ceil(
          (new Date(event.gregorian_date) - new Date()) / (1000 * 60 * 60 * 24)
        );
        return {
          ...event,
          days_remaining: Math.max(0, daysRemaining),
          is_past: daysRemaining < 0,
        };
      })
      .sort((a, b) => a.days_remaining - b.days_remaining);

    // --- RENDER VIEW ---
    res.render("index", {
      title: "Islamic Events",
      gregorianDate: todayData.date.gregorian,
      hijriDate: todayData.date.hijri,
      prayerTimes,
      location: "Addis Ababa, Ethiopia",
      events: eventsWithCountdown,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Export for Vercel (instead of app.listen)
export default app;
