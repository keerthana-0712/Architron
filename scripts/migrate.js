const { PrismaClient } = require('@prisma/client');

const OLD_DATABASE_URL = "postgresql://postgres.ruzedjqbqmyujxibuntf:Ba%247%2412%2440%24by@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&schema=public";
const NEW_DATABASE_URL = "postgresql://neondb_owner:npg_jemHuSPQ7kR6@ep-misty-leaf-apcpgb9e.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function main() {
  console.log("Initializing Prisma clients...");
  
  const oldDb = new PrismaClient({
    datasources: {
      db: {
        url: OLD_DATABASE_URL
      }
    }
  });

  const newDb = new PrismaClient({
    datasources: {
      db: {
        url: NEW_DATABASE_URL
      }
    }
  });

  try {
    console.log("Checking connection to old Supabase database...");
    const projects = await oldDb.project.findMany();
    const messages = await oldDb.contactMessage.findMany();
    const testimonials = await oldDb.testimonial.findMany();
    
    console.log(`\n--- Source Data Found ---`);
    console.log(`Projects: ${projects.length}`);
    console.log(`Contact Messages: ${messages.length}`);
    console.log(`Testimonials: ${testimonials.length}`);
    console.log(`-------------------------\n`);

    if (projects.length === 0 && messages.length === 0 && testimonials.length === 0) {
      console.log("No data found to migrate.");
      return;
    }

    console.log("Migrating Projects...");
    for (const project of projects) {
      console.log(`Migrating Project: ${project.title}`);
      await newDb.project.upsert({
        where: { id: project.id },
        update: project,
        create: project
      });
    }

    console.log("Migrating Contact Messages...");
    for (const msg of messages) {
      console.log(`Migrating Message from: ${msg.name}`);
      await newDb.contactMessage.upsert({
        where: { id: msg.id },
        update: msg,
        create: msg
      });
    }

    console.log("Migrating Testimonials...");
    for (const test of testimonials) {
      console.log(`Migrating Testimonial: ${test.name}`);
      await newDb.testimonial.upsert({
        where: { id: test.id },
        update: test,
        create: test
      });
    }

    console.log("\nMigration completed successfully! 🎉");
  } catch (error) {
    console.error("Migration failed with error:", error);
  } finally {
    await oldDb.$disconnect();
    await newDb.$disconnect();
  }
}

main();
