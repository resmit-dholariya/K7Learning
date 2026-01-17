import express from "express";
import {
  createSubject,
  deleteSubjectByName,
  getAllSubjects,
  updateSubjectByName,
} from "../controllers/topNavControllers.js";

const router = express.Router();

/* Read */
router.get("/", getAllSubjects);

/* Create */
router.post("/", createSubject);

/* Update */
router.put("/:name", updateSubjectByName);

/* Delete    */
router.delete("/:name", deleteSubjectByName);

export default router;
