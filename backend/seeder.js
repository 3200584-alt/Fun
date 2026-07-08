import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';
import User from './src/models/User.js';
import connectDB from './src/config/db.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin Luffy',
    email: 'admin@shipshop.com',
    password: 'admin123',
    isAdmin: true
  },
  {
    name: 'Straw Hat Zoro',
    email: 'zoro@shipshop.com',
    password: 'zoro123',
    isAdmin: false
  }
];

const products = [
  {
    title: "Noah",
    description: "The enormous ark built by the denizens of Fish-Man Island during the Void Century, said to be a promise made to Joy Boy.",
    price: 1500000,
    imageUrl: "/images/noah.png",
    category: "Legendary Ships"
  },
  {
    title: "Alvida's Second Ship",
    description: "The vessel commanded by the fearsome Iron Mace Alvida after her transformation, sailing the East Blue in search of plunder.",
    price: 3500000,
    imageUrl: "/images/alvida.png",
    category: "East Blue"
  },
  {
    title: "Amigo Pirates' Submarine",
    description: "A stealthy underwater vessel used by the Amigo Pirates to move undetected through the depths of the New World.",
    price: 8000000,
    imageUrl: "/images/amigo_submarine.png",
    category: "Submarines"
  },
  {
    title: "Apoo and the Numbers' Ship",
    description: "The flagship of the On Air Pirates, commanded by Scratchmen Apoo, one of the fearsome Worst Generation captains.",
    price: 5000000,
    imageUrl: "/images/apoo_ship.png",
    category: "Worst Generation"
  },
  {
    title: "Barto Club's Ship",
    description: "The rugged vessel of Bartolomeo's Barto Club, a crew known for their fierce loyalty and reckless bravado.",
    price: 10000000,
    imageUrl: "/images/barto_ship.png",
    category: "Grand Fleet"
  },
  {
    title: "Bayan Pirates Ship",
    description: "A hardy pirate vessel that has weathered countless voyages across the treacherous waters of the Grand Line.",
    price: 4500000,
    imageUrl: "/images/bayan_ship.png",
    category: "Grand Line"
  },
  {
    title: "Beasts Pirates' Fleet",
    description: "The massive armada commanded by Kaido of the Beasts, one of the most powerful pirate crews on the seas.",
    price: 500000,
    imageUrl: "/images/beasts_fleet.png",
    category: "Emperor Fleets"
  },
  {
    title: "Big Top",
    description: "The circus-themed flagship of Buggy the Clown's crew, as flashy and unpredictable as its captain.",
    price: 750000,
    imageUrl: "/images/big_top.png",
    category: "Warlord Ships"
  },
  {
    title: "Yonta Maria",
    description: "The grand fleet vessel of the Big Mom Pirates, sailing at full speed across the New World in search of new territory.",
    price: 6000000,
    imageUrl: "/images/yonta_maria.png",
    category: "Grand Fleet"
  },
  {
    title: "Whitey Bay's Icebreaker",
    description: "A frost-hardened vessel captained by Whitey Bay, built to cut through the coldest waters of the Grand Line.",
    price: 9000000,
    imageUrl: "/images/whitey_icebreaker.png",
    category: "New World"
  },
  {
    title: "Zap Ship",
    description: "A striking, lightning-fast vessel favored by daring captains who need speed above all else on the open sea.",
    price: 12000000,
    imageUrl: "/images/zap_ship.png",
    category: "Speedboats"
  },
  {
    title: "Kid Pirates' Ship",
    description: "The battle-scarred flagship of Eustass Kid's crew, feared throughout the New World for its captain's destructive power.",
    price: 8500000,
    imageUrl: "/images/kid_ship.png",
    category: "Worst Generation"
  },
  {
    title: "Victory Hunter",
    description: "A proud hunting vessel built for crews chasing glory and treasure across the far reaches of the Grand Line.",
    price: 2000000,
    imageUrl: "/images/victory_hunter.png",
    category: "Grand Line"
  }
];

const importData = async () => {
  try {
    // Clear databases
    await Product.deleteMany();
    await User.deleteMany();

    // Seed products
    await Product.insertMany(products);

    // Seed users
    await User.create(users);

    console.log('Database Seeded Successfully with Products and Users!');
    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
