import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Helper function to format time (remove timezone info)
function formatTime(timeString) {
  return timeString.split(" ")[0]; // Removes the timezone part (e.g., "(EAT)")
}

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

    const gregorianData = todayData.date.gregorian;
    const hijriData = todayData.date.hijri;
    const timings = todayData.timings;

    const prayerTimes = {
      Fajr: formatTime(timings.Fajr),
      Sunrise: formatTime(timings.Sunrise),
      Dhuhr: formatTime(timings.Dhuhr),
      Asr: formatTime(timings.Asr),
      Maghrib: formatTime(timings.Maghrib),
      Isha: formatTime(timings.Isha),
    };

    // --- EVENTS LOADING ---
    const eventsPath = path.join(__dirname, "events.json");
    if (!fs.existsSync(eventsPath)) {
      throw new Error("Events data file not found");
    }

    const eventsData = JSON.parse(fs.readFileSync(eventsPath, "utf8"));

    if (!eventsData.events || !Array.isArray(eventsData.events)) {
      throw new Error("Invalid events data format");
    }

    const eventsWithCountdown = eventsData.events.map((event) => {
      const eventDate = new Date(event.gregorian_date);
      const today = new Date();
      const timeDiff = eventDate - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return {
        ...event,
        days_remaining: daysRemaining >= 0 ? daysRemaining : 0,
        is_past: daysRemaining < 0,
      };
    });

    // --- FINAL COMBINED VIEW RENDERING ---
    res.render("index", {
      title: "Islamic Dashboard",
      gregorianDate: {
        date: gregorianData.date,
        day: gregorianData.day,
        weekday: gregorianData.weekday.en,
        month: gregorianData.month.en,
        year: gregorianData.year,
      },
      hijriDate: {
        date: hijriData.date,
        day: hijriData.day,
        weekday: hijriData.weekday.en,
        month: hijriData.month.en,
        year: hijriData.year,
      },
      prayerTimes: prayerTimes,
      location: "Addis Ababa, Ethiopia",
      events: eventsWithCountdown.sort(
        (a, b) => a.days_remaining - b.days_remaining
      ),
    });
  } catch (err) {
    console.error("Error rendering index:", err.message);
    res.status(500).render("error", {
      message: err.message || "Something went wrong",
      error: process.env.NODE_ENV === "development" ? err : {},
    });
  }
});

app.listen(port, () => {
  console.log(`Server active on http://localhost:${port}/`);
});
