/**
 * Updates the `images` field for the Rajasthan tour already in the DB.
 * Run with: npx tsx server/update-images-rajasthan.ts
 *
 * NOTE: plus.unsplash.com URLs require API auth and will NOT work as direct
 * image sources. Use only images.unsplash.com URLs here.
 */

import { db } from "./db";
import { packages } from "../shared/schema";
import { eq, like } from "drizzle-orm";

const rajasthanImages = JSON.stringify([
  "https://images.unsplash.com/photo-1631867675167-90a456a90863?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1638904998527-a451c1fbd1cb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]);

async function run() {
  const rows = await db
    .select({ id: packages.id, title: packages.title })
    .from(packages)
    .where(like(packages.title, "%Rajasthan%"));

  if (rows.length === 0) {
    console.error("No Rajasthan tour found. Run seed-rajasthan.ts first.");
    process.exit(1);
  }

  for (const row of rows) {
    await db.update(packages).set({ images: rajasthanImages }).where(eq(packages.id, row.id));
    console.log(`Updated images for: [${row.id}] ${row.title}`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
