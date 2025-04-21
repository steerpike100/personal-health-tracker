import { ActivityList } from "./components/ActivityList";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold mb-2">🚴 Steve’s Health Dashboard</h1>
        <p className="text-lg text-blue-200 italic">Get fit you lazy fucker</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 space-y-8 pb-10">
        <section className="bg-white bg-opacity-10 rounded-xl p-6 shadow-md backdrop-blur">
          <h2 className="text-xl font-semibold mb-4 text-white">Strava Activities</h2>
          <ActivityList />
        </section>

        <section className="bg-white bg-opacity-10 rounded-xl p-6 shadow-md backdrop-blur">
          <h2 className="text-xl font-semibold mb-4 text-yellow-300">Rouvy Workouts</h2>
          <p className="text-blue-200 italic">Coming soon…</p>
        </section>

        <section className="bg-white bg-opacity-10 rounded-xl p-6 shadow-md backdrop-blur">
          <h2 className="text-xl font-semibold mb-4 text-green-300">Samsung Health</h2>
          <p className="text-blue-200 italic">Coming soon…</p>
        </section>
      </main>
    </div>
  );
}
