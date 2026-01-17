import mongoose from "mongoose";

/* ---------- CONTENT ---------- */
const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "pdf", "link", "list", "heading", "link_text"],
      required: true,
    },
    title: String,
    position: {
      type: Number,
      required: true,
    },
    // flexible: string | array | object
    description: mongoose.Schema.Types.Mixed,
  },
  { _id: false },
);

/* ---------- SUB TOPIC ---------- */
const subTopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    contents: [contentSchema],
  },
  { _id: false },
);

/* ---------- TOPIC ---------- */
const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    subTopics: [subTopicSchema],
    contents: [contentSchema], // optional direct content
  },
  { _id: false },
);

/* ---------- SUBJECT ---------- */
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ✅ OK at top level
    },
    position: {
      type: Number,
      required: true,
    },
    topics: [topicSchema],
    contents: [contentSchema], // optional subject intro
  },
  { timestamps: true },
);

export default mongoose.model("Subject", subjectSchema);
