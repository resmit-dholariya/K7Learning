import express from "express";
import {
  getSideNav,
  addTopic,
  updateTopic,
  deleteTopic,
  addSubTopic,
  updateSubTopic,
  deleteSubTopic,
} from "../controllers/sideNavControllers.js";

const router = express.Router();

/* READ */
router.get("/:subjectName", getSideNav);

/* TOPIC CRUD */
router.post("/:subjectName/topics", addTopic);
router.put("/:subjectName/topics/:topicTitle", updateTopic);
router.delete("/:subjectName/topics/:topicTitle", deleteTopic);
                                
/* SUBTOPIC CRUD */
router.post("/:subjectName/topics/:topicTitle/subtopics", addSubTopic);
router.put(
  "/:subjectName/topics/:topicTitle/subtopics/:subTopicTitle",
  updateSubTopic,
);
router.delete(
  "/:subjectName/topics/:topicTitle/subtopics/:subTopicTitle",
  deleteSubTopic,
);

export default router;
