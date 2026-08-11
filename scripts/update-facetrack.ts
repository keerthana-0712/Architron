import { db } from "../lib/db";

async function main() {
  try {
    const updated = await db.project.updateMany({
      where: { id: "facetrack-python" },
      data: {
        thumbnail: "/facetrack-2.png",
      }
    });
    console.log("Updated FaceTrack thumbnail in DB:", updated);
  } catch (err) {
    console.error("Error updating DB:", err);
  } finally {
    process.exit(0);
  }
}

main();
