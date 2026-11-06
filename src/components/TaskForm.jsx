import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  category: "Personal",
  dueDate: "",
};

export default function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title) return;

    onAddTask(form);
    setForm(initialForm);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Add a task">
      <div>
        <label
          htmlFor="task-title"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Task title
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          value={form.title}
          onChange={updateField}
          placeholder="What needs to get done?"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="mb-1.5 block text-xs font-medium text-slate-600"
        >
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          value={form.description}
          onChange={updateField}
          placeholder="Add a few details (optional)"
          rows="2"
          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label
            htmlFor="task-priority"
            className="mb-1.5 block text-xs font-medium text-slate-600"
          >
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={updateField}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-category"
            className="mb-1.5 block text-xs font-medium text-slate-600"
          >
            Category
          </label>
          <select
            id="task-category"
            name="category"
            value={form.category}
            onChange={updateField}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-due-date"
            className="mb-1.5 block text-xs font-medium text-slate-600"
          >
            Due date
          </label>
          <input
            id="task-due-date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={updateField}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-px"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M12 5v14m-7-7h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add task
        </button>
      </div>
    </form>
  );
}
