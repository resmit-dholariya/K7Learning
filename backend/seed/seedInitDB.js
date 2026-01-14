import dotenv from "dotenv";
import Subject from "../models/Subject.js";
import connectDB from "../helpers/db.js";
import mongoose from "mongoose";

dotenv.config();

const SUBJECTS = ["Spelling", "Grammar", "Vocabulary", "Reading", "Writing"];

const createSubTopic = (title, position, subject) => ({
  title,
  position,
  contents: [
    {
      type: "list",
      title: "Worksheets",
      position: 1,
      description: [
        `https://cdn.site.com/${subject}-${title}-1.pdf`,
        `https://cdn.site.com/${subject}-${title}-2.pdf`,
        `https://cdn.site.com/${subject}-${title}-3.pdf`,
      ],
    },
  ],
});

const createTopic = (level, subject) => ({
  title: `Level ${level}`,
  position: level,
  contents: [
    {
      type: "text",
      title: "Level Introduction",
      position: 1,
      description: `This level covers important ${subject.toLowerCase()} concepts.`,
    },
  ],
  subTopics: [
    createSubTopic("Basics", 1, subject),
    createSubTopic("Practice", 2, subject),
    createSubTopic("Advanced", 3, subject),
  ],
});

const createSubject = (name, position) => ({
  name,
  position,
  contents: [
    {
      type: "heading",
      title: name,
      position: 1,
      description: `Enrich the learning experience by getting insights on ${name.toLowerCase()}.`,
    },
  ],
  topics: [1, 2, 3].map((lvl) => createTopic(lvl, name)),
});

const seed = async () => {
  try {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/K7Learning");
      console.log("MongoDB connected");
    } catch {
      console.log("Not connected");
    }

    await Subject.deleteMany();

    const subjects = SUBJECTS.map((name, i) => createSubject(name, i + 1));

    await Subject.insertMany(subjects);

    console.log("✅ Subjects with subtopics seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
