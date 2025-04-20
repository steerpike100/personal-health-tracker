import { ActivityList } from "./components/ActivityList";

function App() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Health Dashboard</h1>
      <ActivityList />
    </div>
  );
}

export default App;
