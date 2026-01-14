import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubject } from "../services/api";

export default function Subject() {
  const { name } = useParams();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    getSubject(name).then(setSubject);
  }, [name]);

  if (!subject) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{subject.name}</h1>

      {subject.topics.map((topic) => (
        <div key={topic.title} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>

          {topic.subTopics.map((sub) => (
            <div key={sub.title} className="ml-4 mb-3">
              <h3 className="font-medium">{sub.title}</h3>

              {sub.contents.map((c, i) => (
                <p key={i} className="text-gray-700 ml-4">
                  {c.value}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
