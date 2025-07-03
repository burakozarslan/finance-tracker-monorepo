/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // Import bcrypt

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // --- Reset Database (Delete all existing data) ---
  console.log('Resetting database...');
  // Delete in reverse order of creation to avoid foreign key constraint issues
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database reset complete.');
  // --- End Reset Database ---

  // 1. Define the common password and hash it
  const commonPassword = '12341234';
  const saltRounds = 11;
  const passwordHash = await bcrypt.hash(commonPassword, saltRounds);
  console.log('Password hashed successfully.');

  // 2. Create 2 Users
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      passwordHash: passwordHash,
      fullName: 'John Doe',
    },
  });
  console.log(`Created user: ${user1.email}`);

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.smith@example.com',
      passwordHash: passwordHash,
      fullName: 'Jane Smith',
    },
  });
  console.log(`Created user: ${user2.email}`);

  // Helper function to generate a random date string (YYYY-MM-DDTHH:mm:ss.sssZ) within the last 6 months
  // This ensures it's a valid ISO-8601 DateTime string for Prisma, even if @db.Date truncates it in the DB.
  const getRandomDate = () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const randomTimestamp =
      sixMonthsAgo.getTime() +
      Math.random() * (today.getTime() - sixMonthsAgo.getTime());
    const randomDate = new Date(randomTimestamp);

    // Return a full ISO-8601 string
    return randomDate.toISOString();
  };

  // Helper function to generate a random amount with 2 decimal places
  const getRandomAmount = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  // 3. Create Categories and Transactions for User 1
  const user1Categories = [
    {
      name: 'Salary',
      type: TransactionType.INCOME,
      description: 'Monthly paycheck',
    },
    {
      name: 'Groceries',
      type: TransactionType.EXPENSE,
      description: 'Food shopping',
    },
    {
      name: 'Rent',
      type: TransactionType.EXPENSE,
      description: 'Monthly rent payment',
    },
    {
      name: 'Freelance Work',
      type: TransactionType.INCOME,
      description: 'Client project payment',
    },
  ];

  for (const catData of user1Categories) {
    const category = await prisma.category.create({
      data: {
        userId: user1.id,
        name: catData.name,
        type: catData.type,
      },
    });
    console.log(`Created category for ${user1.fullName}: ${category.name}`);

    // Create 4-5 transactions for each category
    const numTransactions = Math.floor(Math.random() * 2) + 4; // 4 or 5 transactions
    for (let i = 0; i < numTransactions; i++) {
      const amount =
        catData.type === TransactionType.INCOME
          ? getRandomAmount(1000, 5000)
          : getRandomAmount(20, 500); // Different ranges for income/expense

      await prisma.transaction.create({
        data: {
          userId: user1.id,
          categoryId: category.id,
          amount: parseFloat(amount), // Ensure it's a number for Decimal type
          transactionDate: getRandomDate(), // Now returns ISO-8601 DateTime string
          type: catData.type,
          description: `${catData.description} - ${i + 1}`, // Ensure description is always present
        },
      });
    }
    console.log(
      `Created ${numTransactions} transactions for category: ${category.name}`,
    );
  }

  // 4. Create Categories and Transactions for User 2
  const user2Categories = [
    {
      name: 'Investments',
      type: TransactionType.INCOME,
      description: 'Investment returns',
    },
    {
      name: 'Utilities',
      type: TransactionType.EXPENSE,
      description: 'Electricity and water bills',
    },
    {
      name: 'Dining Out',
      type: TransactionType.EXPENSE,
      description: 'Restaurant expenses',
    },
  ];

  for (const catData of user2Categories) {
    const category = await prisma.category.create({
      data: {
        userId: user2.id,
        name: catData.name,
        type: catData.type,
      },
    });
    console.log(`Created category for ${user2.fullName}: ${category.name}`);

    const numTransactions = Math.floor(Math.random() * 2) + 4; // 4 or 5 transactions
    for (let i = 0; i < numTransactions; i++) {
      const amount =
        catData.type === TransactionType.INCOME
          ? getRandomAmount(50, 1000)
          : getRandomAmount(10, 200);

      await prisma.transaction.create({
        data: {
          userId: user2.id,
          categoryId: category.id,
          amount: parseFloat(amount),
          transactionDate: getRandomDate(), // Now returns ISO-8601 DateTime string
          type: catData.type,
          description: `${catData.description} - ${i + 1}`, // Ensure description is always present
        },
      });
    }
    console.log(
      `Created ${numTransactions} transactions for category: ${category.name}`,
    );
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
