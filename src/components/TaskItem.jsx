export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`group flex items-center gap-3 px-4 py-4 transition-colors sm:px-5 ${
        task.completed ? "bg-slate-50/70" : "bg-white hover:bg-slate-50/60"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? `Mark "${task.title}" as pending`
            : `Mark "${task.title}" as completed`
        }
        aria-pressed={task.completed}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
          task.completed
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white text-transparent hover:border-indigo-400"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="h-3 w-3"
        >
          <path
            d="m3.5 8 3 3 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm leading-6 ${
            task.completed ? "text-slate-400 line-through" : "text-slate-700"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 break-words text-xs leading-5 text-slate-500">
            {task.description}
          </p>
        )}
        {(task.priority || task.category || task.dueDate) && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {task.priority && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  task.priority === "High"
                    ? "bg-rose-50 text-rose-700"
                    : task.priority === "Low"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {task.priority} priority
              </span>
            )}
            {task.category && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {task.category}
              </span>
            )}
            {task.dueDate && (
              <span className="text-[11px] text-slate-500">
                Due{" "}
                {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                  undefined,
                  { month: "short", day: "numeric", year: "numeric" },
                )}
              </span>
            )}
          </div>
        )}
      </div>

      <span
        className={`hidden shrink-0 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex ${
          task.completed
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </li>
  );
}
