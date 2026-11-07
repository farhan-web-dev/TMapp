import { useCallback, useEffect, useState } from "react";
import DashboardStats from "./components/DashboardStats.jsx";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { fetchTasks } from "./services/taskService.js";

function LoadingState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-slate-500">Loading your tasks…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center"
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6"
        >
          <path
            d="M12 8v5m0 3h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-slate-800">
        Couldn't load your tasks
      </h3>
      <p className="max-w-sm text-sm text-slate-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Retry
      </button>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const data = await fetchTasks();
      setTasks(data);
      setStatus("success");
    } catch (err) {
      setError(err?.message || "Something went wrong while loading tasks.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function addTask(taskDetails) {
    setTasks((currentTasks) => [
      {
        id: `local-${Date.now()}`,
        ...taskDetails,
        completed: false,
      },
      ...currentTasks,
    ]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const filters = [
    { key: "all", label: "All tasks" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-9 sm:px-8 sm:pt-12">
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              YOUR WORKSPACE
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Good things start <span className="text-indigo-600">here.</span>
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Keep your day moving, one task at a time.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-500 shadow-sm">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-indigo-500"
            >
              <rect
                x="3.5"
                y="5"
                width="17"
                height="15.5"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span>{new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
        </section>

        <DashboardStats tasks={tasks} />

        <section className="mt-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card sm:p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-slate-900">
              Add a task
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Write it down and get it out of your head.
            </p>
          </div>
          <TaskForm onAddTask={addTask} />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Your tasks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A little progress adds up.
              </p>
            </div>
            <div
              className="flex w-fit items-center gap-1 rounded-xl bg-slate-100 p-1"
              aria-label="Filter tasks"
            >
              {filters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  aria-pressed={filter === item.key}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === item.key
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {status === "loading" && <LoadingState />}

          {status === "error" && (
            <ErrorState message={error} onRetry={loadTasks} />
          )}

          {status === "success" && (
            <>
              <TaskList
                tasks={visibleTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
              {visibleTasks.length > 0 && (
                <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
                  Showing {visibleTasks.length}{" "}
                  {visibleTasks.length === 1 ? "task" : "tasks"}
                </div>
              )}
            </>
          )}
        </section>
        <footer className="mt-8 text-center text-xs text-slate-400">
          A clear mind starts with a clear list.
        </footer>
      </main>
    </div>
  );
}

export default App;
