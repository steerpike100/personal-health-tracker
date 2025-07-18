import { ActivityList } from "../components/ActivityList";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <ActivityList />
    </div>
  );
}
