import React, { useEffect, useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { Toast } from "./Toast";
import { ActivityGraph } from "./ActivityGraph";

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
  const [showAllRides, setShowAllRides] = useState(false);
  const [showAllRunWalks, setShowAllRunWalks] = useState(false);
  const [activityTypeFilter, setActivityTypeFilter] = useState<string>("All");
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const clearFilters = () => {
    setActivityTypeFilter("All");
    setDateRangeFilter("All");
    setSearchQuery("");
  };

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
      const syncRes = await fetch("/.netlify/functions/strava-sync");
      const syncData = await syncRes.json();

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

  const now = new Date();

  const filteredActivities = activities
    .filter((act) => {
      // 📆 Date Range Filter
      if (dateRangeFilter === "7d") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        return new Date(act.start_date) >= sevenDaysAgo;
      }
      if (dateRangeFilter === "30d") {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return new Date(act.start_date) >= thirtyDaysAgo;
      }
      return true;
    })
    .filter((act) => {
      // 🏃‍♂️ Type Filter
      if (activityTypeFilter === "All") return true;
      return act.type === activityTypeFilter;
    })
    .filter((act) => {
      // 🔍 Name Search
      if (searchQuery.trim() === "") return true;
      return act.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Activities
        </h2>
        <div className="flex flex-wrap gap-4 mt-4 items-center">
          {/* Date Range Filter */}
          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          {/* Activity Type Filter */}
          <select
            value={activityTypeFilter}
            onChange={(e) => setActivityTypeFilter(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-sm dark:bg-gray-800 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="Ride">Ride</option>
            <option value="VirtualRide">Virtual Ride</option>
            <option value="Run">Run</option>
            <option value="Walk">Walk</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 text-sm w-full sm:w-64 dark:bg-gray-800 dark:text-white"
          />

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="px-3 py-2 rounded text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white"
          >
            Clear Filters
          </button>
        </div>

        <button
          onClick={syncNow}
          disabled={syncing}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded font-semibold transition ${
            syncing
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
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
        <p className="text-gray-500 dark:text-gray-400">
          Loading activities...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No activities found.</p>
      ) : (
        <>
          {(() => {
            const rides = filteredActivities.filter(
              (act) =>
                act.type === "Ride" ||
                act.type === "VirtualRide" ||
                act.name.toLowerCase().includes("rouvy"),
            );

            const rideDistance = rides.reduce(
              (sum, act) => sum + parseFloat(act.distance_km),
              0,
            );
            const rideTime = rides.reduce(
              (sum, act) => sum + act.moving_time_min,
              0,
            );

            const displayedRides = showAllRides ? rides : rides.slice(0, 10);

            return (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🚴 Rides
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {rides.length} rides · {rideDistance.toFixed(1)} km ·{" "}
                  {rideTime} min
                </p>
                <ActivityGraph data={rides} />
                <div className="grid gap-4 md:grid-cols-2">
                  {displayedRides.map((act) => (
                    <ActivityCard key={act.id} activity={act} />
                  ))}
                </div>
                {rides.length > 10 && (
                  <button
                    onClick={() => setShowAllRides((prev) => !prev)}
                    className="text-blue-500 hover:underline"
                  >
                    {showAllRides ? "Show Less" : "Show All"}
                  </button>
                )}
              </div>
            );
          })()}

          {(() => {
            const runWalks = filteredActivities.filter(
              (act) => act.type === "Run" || act.type === "Walk",
            );

            const runDistance = runWalks.reduce(
              (sum, act) => sum + parseFloat(act.distance_km),
              0,
            );
            const runTime = runWalks.reduce(
              (sum, act) => sum + act.moving_time_min,
              0,
            );

            const displayedRunWalks = showAllRunWalks
              ? runWalks
              : runWalks.slice(0, 10);

            return (
              <div className="space-y-6 mt-10">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🏃 Runs & Walks
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {runWalks.length} activities · {runDistance.toFixed(1)} km ·{" "}
                  {runTime} min
                </p>
                <ActivityGraph data={runWalks} />
                <div className="grid gap-4 md:grid-cols-2">
                  {displayedRunWalks.map((act) => (
                    <ActivityCard key={act.id} activity={act} />
                  ))}
                </div>
                {runWalks.length > 10 && (
                  <button
                    onClick={() => setShowAllRunWalks((prev) => !prev)}
                    className="text-blue-500 hover:underline"
                  >
                    {showAllRunWalks ? "Show Less" : "Show All"}
                  </button>
                )}
              </div>
            );
          })()}
        </>
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
};
