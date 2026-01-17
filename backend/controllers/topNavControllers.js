import Subject from "../models/Subject.js";

/* ----------------------------------
   GET: All Subjects (Top Nav)
---------------------------------- */
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find(
      {},
      { name: 1, position: 1, _id: 0 },
    ).sort({ position: 1 });

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects" });
  }
};

/* ----------------------------------
   POST: Create Subject
---------------------------------- */
export const createSubject = async (req, res) => {
  try {
    const { name, position } = req.body;
    if (!title || position === undefined) {
      return res
        .status(400)
        .json({ message: "title and position are required" });
    }
    const exists = await Subject.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Subject already exists" });
    }
    const subject = await Subject.create({ name, position });
    res.status(201).json({ message: `${name} subject added successfully!` });
  } catch (err) {
    res.status(400).json({
      message: "Failed to create subject",
      error: err.message,
    });
  }
};

/* ----------------------------------
   PUT: Update Subject (Full Replace)
---------------------------------- */
export const updateSubjectByName = async (req, res) => {
  try {
    const { name, position } = req.body;
    if (!title || position === undefined) {
      return res
        .status(400)
        .json({ message: "title and position are required" });
    }
    const subject = await Subject.findOneAndUpdate(
      { name: req.params.name },
      { name, position },
      { new: true, runValidators: true },
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject updated Successfully!" });
  } catch (err) {
    res.status(400).json({
      message: "Failed to update subject",
      error: err.message,
    });
  }
};

/* ----------------------------------
   DELETE: Subject by Name
---------------------------------- */
export const deleteSubjectByName = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      name: req.params.name,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.json({
      message: "Subject deleted successfully",
      deletedSubject: subject.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete subject",
      error: err.message,
    });
  }
};
