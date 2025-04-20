import { ActivityList } from "./components/ActivityList";

function App() {
  return (
<div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">🏥 Health Dashboard</h1>
    <ActivityList />
  </div>
</div>

  );
}

export default App;
