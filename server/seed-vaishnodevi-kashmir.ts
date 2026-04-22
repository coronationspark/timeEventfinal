/**
 * Seed script: Mata Vaishno Devi with Kashmir (7N/8D) from official tour brochure.
 * Run with: npx tsx server/seed-vaishnodevi-kashmir.ts
 */

import { db } from "./db";
import { packages } from "../shared/schema";

const tourPackage = {
  title: "Mata Vaishno Devi with Kashmir (7 Nights / 8 Days)",
  description:
    "A divine 7 Nights / 8 Days pilgrimage-cum-leisure tour combining the spiritual blessings of Mata Vaishno Devi in Katra with the breathtaking beauty of Kashmir — Pahalgam, Srinagar, Sonmarg, and Gulmarg. Starting from Jammu, the journey winds through the Chenani–Nashri tunnel, the Valley of Shepherds, Mughal gardens, Dal Lake shikara ride, and the sacred Trikuta hills. Ideal for families and devotees seeking both natural splendour and divine grace.",
  price: 38000,
  startDate: new Date("2026-06-01T08:00:00"),
  duration: "8 Days / 7 Nights",
  image: "vaishno_devi_kashmir.jpg",
  category: "domestic",
  location: "Jammu, Katra, Srinagar, Gulmarg, Sonmarg & Pahalgam",
  featured: true,
  itinerary: JSON.stringify([
    {
      day: 1,
      title: "Arrival at Jammu – Transfer to Pahalgam",
      activity:
        "Our representative meets you at Jammu airport / railway station. Transfer to Pahalgam covering ~300 kms in 6–8 hours via the Chenani–Nashri tunnel (India's longest road tunnel at 9.28 km, fully integrated tunnel control system). En route visit Martand Temple and Anantnag city. Check-in at Pahalgam hotel. Rest of the day at leisure. Overnight dinner & stay at Pahalgam hotel.",
    },
    {
      day: 2,
      title: "Pahalgam Local Sightseeing",
      activity:
        "After breakfast visit the village of shepherds. Explore Pahalgam by horse or local cab (on own cost). By local cab: Aru Valley, Chandanwari & Betab Valley. By horse: Baisaran, Kashmir Valley, Kanimarg and scenic waterfalls. Overnight dinner & stay at Pahalgam hotel.",
    },
    {
      day: 3,
      title: "Pahalgam – Srinagar Local Sightseeing",
      activity:
        "After early breakfast drive to Srinagar (~96 kms, 2–3 hours). En route see world-famous saffron fields, bat factory, monuments and apple valley. Check-in at Srinagar hotel/houseboat and freshen up. Proceed for local sightseeing: Dargah Hazratbal / Shankeracharya Temple, world-famous Mughal Gardens (Nishat Bagh & Shalimar Bagh), Cheshma Shahi, Pari Mahal. In April visit Asia's largest Tulip Garden. Evening shikara ride on the famous Dal Lake. Overnight dinner & stay at houseboat/hotel Srinagar.",
    },
    {
      day: 4,
      title: "Srinagar – Sonmarg – Srinagar",
      activity:
        "After breakfast leave for Sonmarg (~96 kms, 2–3 hours). Full-day excursion of Sonmarg — visit Thajwas Glacier, Zero Point and snow-covered mountains. Sonmarg is renowned as a trekking hub filled with glacial lakes and also serves as the base point for Shree Amarnath Yatra. Drive back to Srinagar in the evening. Overnight dinner & stay at hotel Srinagar.",
    },
    {
      day: 5,
      title: "Srinagar – Gulmarg – Srinagar",
      activity:
        "After breakfast drive to Gulmarg (~57 kms, 1.5 hours). Enjoy cable car ride (Gondola — own cost), horse ride (own cost) and day treks amid snow-clad peaks. Drive back to Srinagar in the evening. Overnight dinner & stay at hotel Srinagar.",
    },
    {
      day: 6,
      title: "Srinagar – Katra",
      activity:
        "After early breakfast drive to Katra (~300 kms, 6–8 hours) en route visiting world-famous saffron fields and bat factory. Check-in at Katra hotel. Rest of the day at leisure. Overnight dinner & stay at hotel Katra.",
    },
    {
      day: 7,
      title: "Mata Vaishno Devi Darshan",
      activity:
        "After early breakfast proceed for the holy darshan of Mata Vaishno Devi by horse / palki / trek / electric cab / helicopter (on own cost). Experience the divine blessings at the Bhawan and Bhairon Baba. Return to hotel in the evening. Overnight dinner & stay at hotel Katra.",
    },
    {
      day: 8,
      title: "Departure from Jammu",
      activity:
        "After early breakfast drive towards Jammu railway station / airport to board your train / flight. Depart with sweet memories of Kashmir and the blessings of Mata Vaishno Devi.",
    },
  ]),
};

async function seed() {
  console.log("Seeding: Mata Vaishno Devi with Kashmir (7N/8D)...");
  const [inserted] = await db.insert(packages).values(tourPackage).returning();
  console.log(`Inserted package with id: ${inserted.id} — "${inserted.title}"`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
