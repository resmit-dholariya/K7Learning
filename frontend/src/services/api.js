const BASE_URL = "http://localhost:5000/api";

export async function getSubject(name) {
  const res = await fetch(`${BASE_URL}/subjects/${name}`);
  return res.json();
}
