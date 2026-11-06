function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
      >
        <path
          d="m5 12.5 4.2 4.2L19 7"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 3.5a8.5 8.5 0 1 0 8.3 6.7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="TaskFlow home">
          <BrandMark />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Task<span className="text-indigo-600">Flow</span>
          </span>
        </a>
        <div className="hidden items-center gap-2 text-sm font-medium text-slate-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Your personal workspace
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700"
          aria-label="Your profile"
        >
          TF
        </div>
      </div>
    </header>
  );
}
