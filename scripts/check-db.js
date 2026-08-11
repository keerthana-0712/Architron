const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.project.findUnique({
    where: { id: 'facetrack-python' }
  });
  console.log("DB project:", p);
}

main().catch(console.error).finally(() => prisma.$disconnect());
