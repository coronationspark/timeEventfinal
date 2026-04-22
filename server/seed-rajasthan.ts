/**
 * Seed script: Rajasthan Package Tour No.5 (12N/13D) from official tour brochure.
 * Run with: npx tsx server/seed-rajasthan.ts
 */

import { db } from "./db";
import { packages } from "../shared/schema";

const tourPackage = {
  title: "Rajasthan Grand Tour — Jaipur, Bikaner, Jaisalmer, Jodhpur, Mt. Abu & Udaipur",
  description:
    "An epic 12 Nights / 13 Days journey through the Land of Kings — covering Jaipur's forts and palaces, the rat temple of Bikaner, Jaisalmer's golden sand dunes, Jodhpur's blue city, the Jain temples of Mount Abu and Ranakpur, the lake city of Udaipur, the fort of Chittorgarh, the holy town of Pushkar, and finally the Dargah of Ajmer Sharif. A complete Rajasthan experience for families, history lovers, and cultural explorers.",
  price: 55000,
  startDate: new Date("2026-10-01T08:00:00"),
  duration: "13 Days / 12 Nights",
  image: "rajasthan_grand_tour.jpg",
  images: JSON.stringify([
    "https://images.unsplash.com/photo-1631867675167-90a456a90863?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   "https://images.unsplash.com/photo-1638904998527-a451c1fbd1cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]),
  category: "domestic",
  location: "Jaipur, Bikaner, Jaisalmer, Jodhpur, Mount Abu, Ranakpur, Udaipur, Ajmer, Rajasthan",
  featured: true,
  itinerary: JSON.stringify([
    {
      day: 1,
      title: "Arrival at Jaipur",
      activity:
        "Arrive at Jaipur airport / railway station / bus station. Pick-up and transfer to Hotel Teej. Rest of the day at leisure. Evening visit to Nahargarh Fort with optional dinner at Dug Cafeteria. Back to city for night stay at Hotel Teej.",
    },
    {
      day: 2,
      title: "Jaipur Sightseeing",
      activity:
        "After breakfast, morning sightseeing of Amber Fort with optional elephant ride from the foothill to the top. En route visit Hawa Mahal and Jal Mahal. After lunch, visit City Palace Museum and Observatory (Jantar Mantar). Evening free for shopping at local bazaars. Night stay at Hotel Teej.",
    },
    {
      day: 3,
      title: "Jaipur – Bikaner",
      activity:
        "After breakfast drive to Bikaner. Arrive by afternoon and check-in at Hotel Dhola Maru. Rest of the day at leisure. Night stay at Hotel Dholamaru.",
    },
    {
      day: 4,
      title: "Bikaner Sightseeing",
      activity:
        "After breakfast, morning visit to Junagarh Fort. Afternoon excursion to Deshnokh Karni Mata Temple (the famous temple of rats). Also visit Bhandasar Jain Temple and Laxminarayan Temple. Night stay at Hotel Dholamaru.",
    },
    {
      day: 5,
      title: "Bikaner – Jaisalmer",
      activity:
        "After breakfast drive to Jaisalmer. En route visit Kolayat with its ancient temples and take a tea break at Motel Pokaran. After darshan at the Ramdeoji shrine at Ramdeora, continue to Jaisalmer and check-in at Hotel Moomal. Night stay.",
    },
    {
      day: 6,
      title: "Jaisalmer Sightseeing",
      activity:
        "After breakfast, morning sightseeing of Jaisalmer Fort, Jain Temples, ornate Havelis, and Gadhisar Lake. In the afternoon visit Lodurva Jain Temples and drive to Sam Sand Dunes for an optional camel ride at the stunning sunset point. Night stay at Hotel Moomal.",
    },
    {
      day: 7,
      title: "Jaisalmer – Jodhpur",
      activity:
        "After breakfast drive to Jodhpur, en route visiting the ancient temples of Osian. Arrive in Jodhpur by afternoon and check-in at Hotel Ghoomar. Rest of the day free for leisure. Night stay.",
    },
    {
      day: 8,
      title: "Jodhpur – Mount Abu",
      activity:
        "After breakfast, sightseeing of Mehrangarh Fort, Jaswant Thada cenotaph, and Mandore Garden. Depart for Mount Abu. Arrive by afternoon and check-in at Hotel Shikhar. Evening free. Night stay at Hotel Shikhar.",
    },
    {
      day: 9,
      title: "Mount Abu Sightseeing",
      activity:
        "After breakfast visit the intricate Delwara Jain Temple, Shiva Temple, and Guru Shikhar (highest peak in Rajasthan). Return to hotel for lunch. In the evening visit Honeymoon Point / Sunset Point and the serene Nakki Lake. Night stay at Hotel Shikhar.",
    },
    {
      day: 10,
      title: "Mount Abu – Ranakpur – Udaipur",
      activity:
        "After breakfast depart for Udaipur. En route halt at Ranakpur for lunch and a visit to the world-renowned Ranakpur Jain Temple with its 1,444 intricately carved marble pillars. Continue to Nathdwara for a visit to the Nathdwara Temple (Shrinathji). Arrive at Udaipur by evening and check-in at Hotel Kajri. Night stay.",
    },
    {
      day: 11,
      title: "Udaipur Sightseeing",
      activity:
        "After breakfast visit the City Palace, Jagdish Temple, Maharana Pratap Smarak, and Fateh Sagar Lake. Return to hotel for lunch. After lunch visit Sahelion Ki Bari (Garden of Maids of Honour) and Lok Kala Mandal (folk arts museum). Night stay at Hotel Kajri.",
    },
    {
      day: 12,
      title: "Udaipur – Chittorgarh – Pushkar",
      activity:
        "After breakfast depart for Chittorgarh. Arrive and visit the historic Chittorgarh Fort — the largest fort in India, steeped in tales of Rajput valor. After lunch, continue to Pushkar and arrive by evening. Check-in at Hotel Sarovar, Pushkar. Night stay.",
    },
    {
      day: 13,
      title: "Pushkar – Ajmer – Jaipur (Departure)",
      activity:
        "After breakfast visit the sacred Brahma Temple (one of the few Brahma temples in the world) and the holy Pushkar Lake. Drive to Ajmer to visit the revered Dargah Ajmer Sharif (Dargah of Khwaja Moinuddin Chishti). Then drive to Jaipur arriving by afternoon — tour ends here. Departure for onward destination by airport / railway station / bus station.",
    },
  ]),
};

async function seed() {
  console.log("Seeding: Rajasthan Grand Tour (12N/13D)...");
  const [inserted] = await db.insert(packages).values(tourPackage).returning();
  console.log(`Inserted package with id: ${inserted.id} — "${inserted.title}"`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
