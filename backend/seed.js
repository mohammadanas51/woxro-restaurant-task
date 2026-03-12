const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MenuItem = require("./models/MenuItem");
const OpeningHour = require("./models/OpeningHour");
const Blog = require("./models/Blog");
const Admin = require("./models/Admin");

const MONGO_URI =
  "mongodb+srv://mohammadanas51_db_user:2iqT7V0ZgKAQ12IY@woxro-restaurant.kbvspsg.mongodb.net/qitchen?appName=Woxro-Restaurant";

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  // Clear existing data
  await MenuItem.deleteMany({});
  await OpeningHour.deleteMany({});
  await Blog.deleteMany({});
  await Admin.deleteMany({});

  // Seed Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await Admin.create({ username: "admin", password: hashedPassword });
  console.log("✓ Admin created (admin / admin123)");

  // Seed Opening Hours
  await OpeningHour.insertMany([
    { dayRange: "Monday - Friday", openTime: "16:00", closeTime: "22:30" },
    { dayRange: "Saturday - Sunday", openTime: "12:00", closeTime: "23:00" },
  ]);
  console.log("✓ Opening hours seeded");

  // Seed Menu Items
  await MenuItem.insertMany([
    // MAKI
    {
      name: "SPICY TUNA MAKI",
      description:
        "A tantalizing blend of spicy tuna, cucumber, and avocado wrapped in seasoned rice.",
      price: 12.0,
      category: "MAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    },
    {
      name: "MANGO MAKI",
      description:
        "Tempura-fried shrimp, cucumber, and cream cheese, delivering a satisfying contrast of textures.",
      price: 10.5,
      category: "MAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400",
    },
    {
      name: "SALMON MAKI",
      description:
        "Shiitake mushrooms, avocado, and pickled daikon, coated with nutty sesame seeds.",
      price: 11.0,
      category: "MAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400",
    },
    {
      name: "TUNA MAKI",
      description:
        "A vibrant assortment of julienned carrots, bell pepper, and cucumber in a nori-wrapped rice roll.",
      price: 10.0,
      category: "MAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400",
    },
    // URAMAKI
    {
      name: "DRAGON ROLL",
      description:
        "Eel and cucumber inside, topped with thinly-sliced avocado and sweet eel sauce.",
      price: 16.0,
      category: "URAMAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400",
    },
    {
      name: "RAINBOW ROLL",
      description:
        "California roll topped with assorted sashimi including tuna, salmon, and shrimp.",
      price: 18.0,
      category: "URAMAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400",
    },
    {
      name: "PHILADELPHIA ROLL",
      description:
        "Smoked salmon and cream cheese, with cucumber and avocado, rice on the outside.",
      price: 14.0,
      category: "URAMAKI",
      imageUrl:
        "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400",
    },
    // SPECIAL ROLL
    {
      name: "QITCHEN SIGNATURE",
      description:
        "Our chef's special blend of premium tuna, truffle oil, and gold leaf garnish.",
      price: 28.0,
      category: "SPECIAL ROLL",
      imageUrl:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400",
    },
    {
      name: "VOLCANO ROLL",
      description:
        "Spicy crab and cream cheese baked to perfection, topped with spicy mayo and tobiko.",
      price: 22.0,
      category: "SPECIAL ROLL",
      imageUrl:
        "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400",
    },
  ]);
  console.log("✓ Menu items seeded");

  // Seed Blogs
  await Blog.insertMany([
    {
      title: "HOW QITCHEN REDEFINES FLAVOR HARMONY IN EVERY BITE",
      slug: "flavor-harmony",
      excerpt:
        "Experience an orchestration of flavors that creates a symphony of perfection.",
      content: `In a world where dining experiences often blend into the ordinary, Qitchen stands as a beacon of culinary innovation and passion redefined. Beyond being a restaurant that serves sushi, Qitchen is a sanctuary of creativity, and a profound love for the art of gastronomy.

As you step through our doors, you're not merely entering an eatery; you're immersing yourself in an experience that goes beyond the traditional dining encounter.

## The Art of Balance

Every dish at Qitchen is a carefully orchestrated symphony of flavors. Our chefs spend years perfecting the delicate balance between sweet, salty, sour, and umami. Each ingredient is selected not just for its individual quality, but for how it harmonizes with every other component on the plate.

## From Ocean to Table

We source our fish daily from the finest markets, ensuring that every piece of sashimi, every roll, meets our exacting standards. Our relationships with local fishermen and international suppliers mean that only the freshest, most sustainably caught seafood makes it to your plate.

## The Qitchen Philosophy

At its core, Qitchen believes that food is more than sustenance—it's an art form. Every plate that leaves our kitchen is a canvas, every ingredient a brushstroke. We invite you to experience the difference that passion, precision, and creativity make.`,
      imageUrl:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    },
    {
      title: "UNVEILING THE SECRETS OF OUR CULINARY ARTISTRY",
      slug: "culinary-artistry",
      excerpt:
        "Explore the meticulous craftsmanship behind Qitchen's renowned dishes.",
      content: `Behind every extraordinary dish at Qitchen lies a story of dedication, skill, and an unwavering commitment to excellence. Our culinary team, led by award-winning chefs, brings decades of combined experience to every creation.

## Training and Tradition

Our sushi chefs undergo years of rigorous training, mastering the ancient art of sushi-making while embracing modern culinary techniques. This blend of tradition and innovation is what sets Qitchen apart.

## Ingredient Selection

The journey of each dish begins long before it reaches the kitchen. Our team travels to source the finest ingredients—from Japanese rice varieties aged to perfection, to wasabi freshly grated from the root, to rare seasonal fish that appear on our menu for only a few weeks each year.

## The Creative Process

Innovation at Qitchen is a daily practice. Our chefs experiment with new flavor combinations, presentation styles, and cooking techniques. The result is a menu that evolves with the seasons while staying true to our core philosophy of harmony and excellence.`,
      imageUrl:
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
    },
  ]);
  console.log("✓ Blogs seeded");

  console.log("\n🎉 Database seeded successfully!");
  console.log("Admin credentials: admin / admin123");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
