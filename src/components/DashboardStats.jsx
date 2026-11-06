const cards = [
  {
    key: "total",
    label: "Total tasks",
    color: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "completed",
    label: "Completed",
    color: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="m5 12.5 4.2 4.2L19 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "pending",
    label: "Pending",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function DashboardStats({ tasks }) {
  const counts = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <section
      aria-label="Task overview"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {cards.map((card) => (
        <article
          key={card.key}
          className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {counts[card.key]}
            </p>
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
            {card.icon}
          </div>
        </article>
      ))}
    </section>
  );
}
