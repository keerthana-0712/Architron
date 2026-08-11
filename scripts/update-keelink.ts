import { db } from "../lib/db";

async function main() {
  try {
    const updated = await db.project.updateMany({
      where: { id: "keelink-url-shortener" },
      data: { thumbnail: "/keelink-thumbnail.png" }
    });
    console.log("Updated Keelink thumbnail in DB:", updated);
  } catch (err) {
    console.error("Error updating DB:", err);
  } finally {
    process.exit(0);
  }
}

main();
