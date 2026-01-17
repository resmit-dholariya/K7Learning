import Subject from "../models/Subject.js";

/* -------------------------------------------------
   GET SIDENAV (Topics + SubTopics in one go)
------------------------------------------------- */
export const getSideNav = async (req, res) => {
  try {
    const { subjectName } = req.params;

    const subject = await Subject.findOne(
      { name: subjectName },
      { topics: 1, _id: 0 },
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const topics = subject.topics
      .sort((a, b) => a.position - b.position)
      .map((topic) => ({
        title: topic.title,
        position: topic.position,
        subTopics: topic.subTopics
          .sort((a, b) => a.position - b.position)
          .map((st) => ({
            title: st.title,
            position: st.position,
          })),
      }));

    res.json({ subject: subjectName, topics });
  } catch (err) {
    res.status(500).json({ message: "Failed to load sidenav" });
  }
};

/* -------------------------------------------------
   ADD TOPIC
------------------------------------------------- */
export const addTopic = async (req, res) => {
  const { subjectName } = req.params;
  const { title, position } = req.body;

  if (!title || position === undefined) {
    return res.status(400).json({ message: "title and position are required" });
  }

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === title);
  if (topic) return res.status(404).json({ message: "Topic exists!" });

  subject.topics.push({
    title,
    position,
    contents: [],
    subTopics: [],
  });

  await subject.save();
  res.status(201).json({ message: `${title} topic added!` });
};

/* -------------------------------------------------
   UPDATE TOPIC (title / position)
------------------------------------------------- */
export const updateTopic = async (req, res) => {
  const { subjectName, topicTitle } = req.params;
  const { title, position } = req.body;

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === topicTitle);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  if (title) topic.title = title;
  if (position !== undefined) topic.position = position;

  await subject.save();
  res.json(topic);
};

/* -------------------------------------------------
   DELETE TOPIC
------------------------------------------------- */
export const deleteTopic = async (req, res) => {
  const { subjectName, topicTitle } = req.params;

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === topicTitle);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  subject.topics = subject.topics.filter((t) => t.title !== topicTitle);

  await subject.save();
  res.json({ message: "Topic deleted successfully" });
};

/* -------------------------------------------------
   ADD SUBTOPIC
------------------------------------------------- */
export const addSubTopic = async (req, res) => {
  const { subjectName, topicTitle } = req.params;
  const { title, position } = req.body;

  if (!title || position === undefined) {
    return res
      .status(400)
      .json({ message: "title and position are req  uired" });
  }

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === topicTitle);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const subTopic = topic.subTopics.find((st) => st.title === title);
  if (subTopic) return res.status(404).json({ message: "SubTopic exists!" });

  topic.subTopics.push({
    title,
    position,
    contents: [],
  });

  await subject.save();
  res.status(201).json({ message: "Subtopic added!" });
};

/* -------------------------------------------------
   UPDATE SUBTOPIC
------------------------------------------------- */
export const updateSubTopic = async (req, res) => {
  const { subjectName, topicTitle, subTopicTitle } = req.params;
  const { title, position } = req.body;

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === topicTitle);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const subTopic = topic.subTopics.find((st) => st.title === subTopicTitle);
  if (!subTopic) return res.status(404).json({ message: "SubTopic not found" });

  if (title) subTopic.title = title;
  if (position !== undefined) subTopic.position = position;

  await subject.save();
  res.json({ message: "Subtopic updated!" });
};

/* -------------------------------------------------
   DELETE SUBTOPIC
------------------------------------------------- */
export const deleteSubTopic = async (req, res) => {
  const { subjectName, topicTitle, subTopicTitle } = req.params;

  const subject = await Subject.findOne({ name: subjectName });
  if (!subject) return res.status(404).json({ message: "Subject not found" });

  const topic = subject.topics.find((t) => t.title === topicTitle);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  const subTopic = topic.subTopics.find((st) => st.title === subTopicTitle);
  if (!subTopic) return res.status(404).json({ message: "SubTopic not found" });

  topic.subTopics = topic.subTopics.filter((st) => st.title !== subTopicTitle);

  await subject.save();
  res.json({ message: "SubTopic deleted successfully" });
};
