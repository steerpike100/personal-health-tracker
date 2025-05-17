import React, { useEffect, useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { Toast } from "./Toast";

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
  const [toastMsg, setToastMsg] = useState("");


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
  
      // Trigger backend sync from Strava → MongoDB
      const syncRes = await fetch("/.netlify/functions/strava-sync");
      const syncData = await syncRes.json();
  
      // Then fetch from MongoDB → UI
      await fetchActivities();
  
      setToastMsg(`✅ ${syncData.message || "Activities synced!"}`);
    } catch {
      setToastMsg("⚠️ Sync failed.");
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
  className={`flex items-center gap-2 px-4 py-2 text-sm rounded font-medium transition ${
    syncing
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
>
  {syncing && (
    <svg
      className="w-4 h-4 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  )}
  {syncing ? "Syncing..." : "🔁 Sync Now"}
</button>

      </div>

      {loading ? (
  <p>Loading activities...</p>
) : activities.length === 0 ? (
  <p>No activities found.</p>
) : (
  <>
    {/* 🚴 Rides (Rouvy + Outdoor) */}
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mt-6 mb-2">🚴 Rides</h3>
      {activities
        .filter(act =>
          act.type === "Ride" || act.name.toLowerCase().includes("rouvy")
        )
        .map((act, index) => (
          <ActivityCard key={`ride-${index}`} activity={act} />
        ))}
    </div>

    {/* 🏃 Walks & Runs */}
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mt-6 mb-2">🏃 Runs & Walks</h3>
      {activities
        .filter(act => act.type === "Run" || act.type === "Walk")
        .map((act, index) => (
          <ActivityCard key={`runwalk-${index}`} activity={act} />
        ))}
    </div>
  </>
)}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}

    </div>
  );
};

