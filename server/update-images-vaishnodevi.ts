import { db } from "./db";
import { packages } from "../shared/schema";
import { eq, like } from "drizzle-orm";

const images = JSON.stringify([
  "https://images.unsplash.com/photo-1701957494296-a42832ab0a17?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]);

async function run() {
  const rows = await db
    .select({ id: packages.id, title: packages.title })
    .from(packages)
    .where(like(packages.title, "%Vaishno%"));

  if (rows.length === 0) {
    console.error("No Vaishno Devi tour found.");
    process.exit(1);
  }

  for (const row of rows) {
    await db.update(packages).set({ images }).where(eq(packages.id, row.id));
    console.log(`Updated images for: [${row.id}] ${row.title}`);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
