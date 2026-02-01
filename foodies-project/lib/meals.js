import sql from "better-sqlite3";
import fs from "fs";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getAllMeals() {
  // .all is used when you want to get all data
  // .run is used when you want to insert, update, delete data
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async delay

  // simulate an error for testing
  // throw new Error("Failed to fetch meals!");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealBySlug(mealSlug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug);
}

export async function saveMeal(mealData) {
  mealData.slug = slugify(mealData.title, { lower: true, strict: true });
  mealData.instructions = xss(mealData.instructions);

  const imageType = mealData.image.type.split("/")[1];
  const fileName = `${mealData.slug}.${imageType}`;

  // write the image to the public/images folder
  const imagePath = `public/images/${fileName}`;
  const stream = fs.createWriteStream(imagePath);
  stream.write(Buffer.from(await mealData.image.arrayBuffer()), error => {
    if (error) {
      throw new Error("Failed to save image.");
    }
  });
  stream.end();
  mealData.imagePath = `/images/${fileName}`;

  db.prepare(
    "INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (?, ?, ?, ?, ?,?,?)"
  ).run(
    mealData.title,
    mealData.summary,
    mealData.instructions,
    mealData.creator,
    mealData.creator_email,
    mealData.imagePath,
    mealData.slug
  );
}
