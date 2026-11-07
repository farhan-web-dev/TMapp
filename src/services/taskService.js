const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTasks() {
  let response;

  try {
    response = await fetch(TASKS_URL);
  } catch {
    throw new Error("Network error: unable to reach the server.");
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected response from the server.");
  }

  return data;
}
