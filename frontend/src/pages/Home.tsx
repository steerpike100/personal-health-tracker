export default function Home() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-4xl font-extrabold tracking-tight">
        Welcome to <span className="text-indigo-500">SteveHealthify</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Your personal health dashboard for tracking workouts, steps, and
        wellness trends.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/dashboard"
          className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Go to Dashboard
        </a>
        <a
          href="/settings"
          className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition"
        >
          Settings
        </a>
      </div>
    </div>
  );
}
