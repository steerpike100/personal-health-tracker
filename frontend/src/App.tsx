import { ActivityList } from "./components/ActivityList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
          🚴 Steve’s Health Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Get fit you lazy fucker
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Strava Activities</h2>
          <ActivityList />
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700">Rouvy Workouts</h2>
          <p className="text-gray-500 italic">Coming soon…</p>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Samsung Health</h2>
          <p className="text-gray-500 italic">Coming soon…</p>
        </section>
      </main>
    </div>
  );
}


