import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="px-6 py-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
          >
            <path
              d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-800">
          Nothing on your list yet
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Add a task above and make today count.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
