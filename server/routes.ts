import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.packages.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const packages = await storage.getPackages(category);
    res.json(packages);
  });

  app.get(api.packages.get.path, async (req, res) => {
    const pkg = await storage.getPackage(Number(req.params.id));
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  });

  app.post(api.packages.create.path, async (req, res) => {
    try {
      const input = api.packages.create.input.parse(req.body);
      const pkg = await storage.createPackage(input);
      res.status(201).json(pkg);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPackages = await storage.getPackages();
  if (existingPackages.length === 0) {
    const seedPackages = [
      {
        title: "Adventure Arunachal Tour",
        description:
          "Explore the hidden gems of Arunachal: Bomdila, Sangti Valley, and Tawang. Experience the Mahamrityunjay Temple, river rafting in Bhalukpong, and the scenic Nechiphu Tunnel. Note: Timely departures are crucial to ensure maximum daylight at sightseeing points.",
        price: 25000,
        startDate: new Date("2026-04-01T08:00:00"),
        duration: "8 Days / 7 Nights",
        image: "arunachal_1.jpg",
        category: "domestic",
        location: "Arunachal Pradesh, India",
        featured: true,
        itinerary: `[{"day": 1, "title": "Guwahati to Bomdila", "activity": "Pickup from Airport/Railway Stn. Visit Mahamrityunjay Temple, Brahmaputra Boating, Orchid Research Centre, Bhalukpong (Rafting/Angling), Nechiphu Tunnel, and Tenga Valley View. Overnight at Bomdila."}, {"day": 2, "title": "Bomdila to Sangti Valley", "activity": "Visit Bomdila Monastery, Manda La Top, and Thembang Heritage Village. Overnight at Sangti Valley."}, {"day": 3, "title": "Sangti Valley Local", "activity": "Enjoy Riverside views, Kiwi Gardens, Dirang Monastery, and the therapeutic Hot Springs. Overnight at Sangti Valley."}, {"day": 4, "title": "Sangti to Tawang", "activity": "Visit Sheep Farm, Baisakhi View Point, Sela Pass & Lake, and Jaswantgarh War Memorial. Overnight at Tawang."}, {"day": 5, "title": "Tawang Local Sightseeing", "activity": "Explore Tawang Monastery, Buddha Park, DK War Memorial, and the Evening Light & Sound Show. Overnight at Tawang."}, {"day": 6, "title": "Bumla Pass & Lakes", "activity": "Excursion to Bumla Pass (Indo-Tibetan Border), Madhuri Lake, and PTCO Lake. Evening market walk. Overnight at Tawang."}, {"day": 7, "title": "Tawang to Shergaon", "activity": "Visit the majestic Jong Falls, Chakzam Bridge, Sela Tunnel, and Chilipong Monastery. Overnight at Shergaon."}, {"day": 8, "title": "Shergaon to Guwahati", "activity": "Travel via Bhairabkunda (Assam-Arunachal-Bhutan Border Gate) for final drop-off at Guwahati."}]`,
      },
      {
        title: "Grand Himachal & Amritsar Experience",
        description:
          "A comprehensive 10-day journey covering Shimla, Manali, Dharamshala, Dalhousie, and the spiritual heart of Amritsar. Perfect for families and nature lovers.",
        price: 45000,
        startDate: new Date("2026-05-10T09:00:00"),
        duration: "10 Days / 9 Nights",
        image: "shimla_ridge.jpg",
        category: "domestic",
        location: "Himachal Pradesh & Amritsar, India",
        featured: true,
        itinerary: `[{"day": 1, "title": "Chandigarh to Shimla", "desc": "Pick up and drive to Shimla via Pinjore Gardens."}, {"day": 2, "title": "Shimla & Kufri", "desc": "Visit Jakhu Temple, Kufri, and Mall Road."}, {"day": 3, "title": "Shimla to Manali", "desc": "Drive through Kullu Valley."}, {"day": 4, "title": "Solang & Rohtang", "desc": "High altitude pass visit and snow activities."}, {"day": 5, "title": "Manali Local", "desc": "Hadimba Temple, Vashist Hot Springs, and Old Manali."}, {"day": 6, "title": "Manali to Mcleodganj", "desc": "Drive via Palampur tea gardens."}, {"day": 7, "title": "Dharamshala Sightseeing", "desc": "Bhagsu Falls and Dalai Lama Temple."}, {"day": 8, "title": "Dharamshala to Dalhousie", "desc": "Scenic mountain drive."}, {"day": 9, "title": "Khajjiar Excursion", "desc": "Visit Mini Switzerland and Khajji Nag Temple."}, {"day": 10, "title": "Amritsar & Departure", "desc": "Golden Temple visit and Wagah Border ceremony."}]`,
      },
      {
        title: "Shimla, Manali, Dharamshala, Dalhousie & Amritsar (10D/9N)",
        description:
          "A 10 Days / 9 Nights journey covering Shimla, Manali, Dharamshala, Dalhousie, Khajjiar, and Amritsar with detailed day-wise sightseeing including Rohtang Pass, tea gardens, Tibetan settlements, and the Golden Temple with Wagah Border ceremony.",
        price: 46000,
        startDate: new Date("2026-05-20T09:00:00"),
        duration: "10 Days / 9 Nights",
        image: "shimla_manali_dharamshala_dalhousie_amritsar.jpg",
        category: "domestic",
        location: "Himachal Pradesh & Amritsar, India",
        featured: false,
        itinerary: `[{"day": 1, "title": "Chandigarh to Shimla", "desc": "Pickup from Chandigarh and drive to Shimla. Check-in and evening free to explore Mall Road and Christ Church."}, {"day": 2, "title": "Shimla – Jakhu – Kufri – Mall Road", "desc": "Visit Jakhu Temple for panoramic views, drive to Kufri for views and horse rides, optional visit to Himalayan Nature Park, evening on Mall Road and Christ Church."}, {"day": 3, "title": "Shimla to Manali via Mandi & Kullu", "desc": "Long scenic drive via Ghaghas, Sundernagar, Mandi, Pandoh, Kullu to reach Manali by evening."}, {"day": 4, "title": "Manali – Solang – Rohtang Pass – Manali", "desc": "Excursion to Solang Valley and Rohtang Pass (subject to permit/weather) with stops at Kothi, Marhi, Rani Nala and Beas Kund viewpoints."}, {"day": 5, "title": "Manali Local Sightseeing", "desc": "Explore Old Manali, Club House, Van Vihar, Tibetan Monastery, Manu Temple, Hadimba Temple and Vashisht hot water springs."}, {"day": 6, "title": "Manali to Dharamshala / Mcleodganj", "desc": "Drive via Mandi and Palampur tea gardens with visit to Baijnath Temple; arrive and stay in Mcleodganj/Naddi."}, {"day": 7, "title": "Dharamshala & Mcleodganj Sightseeing", "desc": "Visit Bhagsu Nag waterfall, Dalai Lama Temple, Norbulingka Institute and walk through Tibetan markets with views of Dhauladhar range."}, {"day": 8, "title": "Dharamshala to Dalhousie", "desc": "Drive to Dalhousie over scenic mountain roads, check-in and free evening to explore the town."}, {"day": 9, "title": "Dalhousie – Khajjiar – Chamba – Dalhousie", "desc": "Full-day excursion to Khajjiar (Mini Switzerland), visit Khajjiar lake and 12th century Khajji Nag Temple, optional visit to Chamba town."}, {"day": 10, "title": "Dalhousie to Amritsar & Departure", "desc": "Drive to Amritsar, visit the Golden Temple and its community kitchen, then proceed to Wagah Border for the evening ceremony and departure."}]`,
      },
      {
        title: "Mata Vaishno Devi with Kashmir",
        description:
          "A divine 7 Nights / 8 Days journey combining the holy pilgrimage to Mata Vaishno Devi with the breathtaking beauty of Kashmir. Ideal for families and spiritual travelers.",
        price: 38000,
        startDate: new Date("2026-06-01T08:00:00"),
        duration: "8 Days / 7 Nights",
        image: "vaishno_devi_kashmir.jpg",
        category: "domestic",
        location: "Jammu & Kashmir, India",
        featured: false,
        itinerary: `[{"day": 1, "title": "Arrival Jammu – Katra", "desc": "Arrive at Jammu railway station/airport and transfer to Katra at the foothills of Trikuta. Check-in to hotel and relax. Evening free for local market visit and preparations for the Mata Vaishno Devi trek."}, {"day": 2, "title": "Katra – Mata Vaishno Devi Darshan – Katra", "desc": "Early morning start the trek / pony / battery car ride to Mata Vaishno Devi Bhawan. Perform darshan at Bhawan and Bhairon Baba (subject to time and fitness). Return to Katra late evening and overnight stay."}, {"day": 3, "title": "Katra – Patnitop – Srinagar", "desc": "After breakfast, drive towards Srinagar en route visiting Patnitop for panoramic views and short walks through pine forests. Continue the scenic drive along the Chenab Valley to reach Srinagar by evening. Overnight in hotel / houseboat."}, {"day": 4, "title": "Srinagar Local Sightseeing", "desc": "Enjoy a half-day sightseeing tour of Mughal Gardens – Nishat Bagh, Shalimar Bagh and Chashme Shahi, followed by visit to Shankaracharya Temple (time & traffic permitting). Evening shikara ride on Dal Lake and leisure time at Boulevard Road."}, {"day": 5, "title": "Excursion to Sonmarg or Gulmarg", "desc": "Full-day excursion to either Sonmarg (Meadow of Gold) or Gulmarg (Meadow of Flowers) as per weather and road conditions. Enjoy views of snow-capped peaks, optional gondola ride / pony rides and leisurely walks. Return to Srinagar for overnight stay."}, {"day": 6, "title": "Srinagar – Pahalgam", "desc": "Drive to Pahalgam, the Valley of Shepherds, via Pampore saffron fields and Awantipora ruins. En route enjoy views of the Lidder River. On arrival, explore Pahalgam market or optional local sightseeing to Aru / Betaab Valley (on direct payment basis)."}, {"day": 7, "title": "Pahalgam – Jammu", "desc": "After breakfast, drive back from Pahalgam towards Jammu enjoying the scenic mountain roads. On arrival in Jammu, check-in to hotel and visit local markets or Raghunath Temple (subject to time)."}, {"day": 8, "title": "Jammu Departure", "desc": "Check out from hotel and transfer to Jammu railway station/airport for onward journey with divine blessings of Mata Vaishno Devi and memories of Kashmir."}]`,
      },
      {
        title: "Ex Jammu Kashmir Tour",
        description:
          "A scenic 5 Nights / 6 Days tour starting from Jammu, covering popular destinations across the Kashmir valley. Perfect for those seeking a short yet memorable escape.",
        price: 30000,
        startDate: new Date("2026-07-01T08:00:00"),
        duration: "6 Days / 5 Nights",
        image: "jammu_kashmir_ex_jammu.jpg",
        category: "domestic",
        location: "Jammu & Kashmir, India",
        featured: false,
        itinerary: `[{"day": 1, "title": "Jammu – Srinagar", "desc": "Arrive at Jammu railway station/airport and drive through picturesque mountain roads along the Chenab Valley towards Srinagar. En route enjoy scenic viewpoints and short breaks. Check-in to hotel / houseboat on arrival and relax."}, {"day": 2, "title": "Srinagar Local Sightseeing", "desc": "Explore Srinagar with visits to Mughal Gardens – Nishat Bagh, Shalimar Bagh and Chashme Shahi, and Shankaracharya Temple (subject to time/traffic). In the evening, enjoy a shikara ride on Dal Lake and stroll along Boulevard Road."}, {"day": 3, "title": "Srinagar – Gulmarg Excursion", "desc": "Full-day excursion to Gulmarg, the Meadow of Flowers. Enjoy panoramic views of snow-clad peaks, optional gondola cable car ride, pony rides and leisurely walks through meadows. Return to Srinagar in the evening for overnight stay."}, {"day": 4, "title": "Srinagar – Pahalgam", "desc": "Drive to Pahalgam, the Valley of Shepherds, via Pampore saffron fields and Awantipora ruins. Enjoy the drive along the Lidder River and check-in at Pahalgam. Evening free to explore local market or riverside walks."}, {"day": 5, "title": "Pahalgam – Jammu", "desc": "After breakfast, depart from Pahalgam and drive back towards Jammu, enjoying scenic mountain landscapes and small towns en route. On arrival, check-in at Jammu hotel and evening free at leisure."}, {"day": 6, "title": "Jammu Departure", "desc": "Check out from hotel and transfer to Jammu railway station/airport for onward journey with beautiful memories of the Kashmir valley."}]`,
      },
    ];

    for (const pkg of seedPackages) {
      await storage.createPackage(pkg);
    }
  }
}
