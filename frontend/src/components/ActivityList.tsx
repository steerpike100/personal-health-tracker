import React, { useEffect, useState } from "react";
import { ActivityCard } from "./ActivityCard";

type Activity = {
  id: number;
  name: string;
  type: string;
  distance_km: string;
  moving_time_min: number;
  start_date: string;
};

export const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/.netlify/functions/get-activities");
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.error("Failed to load activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const syncNow = async () => {
    try {
      setSyncing(true);
      await fetchActivities();
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recent Activities</h2>
        <button
          onClick={syncNow}
          disabled={syncing}
          className={`px-4 py-2 text-sm rounded font-medium transition ${
            syncing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {syncing ? "Syncing..." : "🔁 Sync Now"}
        </button>
      </div>

      {loading ? (
        <p>Loading activities...</p>
      ) : activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((act, index) => (
            <ActivityCard key={index} activity={act} />
          ))}
        </div>
      )}
    </div>
  );
};
