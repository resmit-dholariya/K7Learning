export default function ContentRenderer({ content }) {
  switch (content.type) {
    case "heading":
      return <h3 className="text-lg font-semibold">{content.value}</h3>;

    case "text":
      return <p className="text-gray-700">{content.value}</p>;

    case "pdf":
      return (
        <a
          href={content.value}
          target="_blank"
          className="text-blue-600 underline"
        >
          View PDF
        </a>
      );

    case "list":
      return (
        <ul className="list-disc ml-6">
          {content.value.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
