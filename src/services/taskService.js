const TASKS_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTasks() {
  const response = await fetch(TASKS_URL);
  return response.json();
}
