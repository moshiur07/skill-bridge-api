import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const port = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("db ping...");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
