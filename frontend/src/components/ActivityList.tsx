import React, { useEffect, useState } from "react";

type Activity = {
  name: string;
  type: string;
  distance_km: string;
  moving_time_min: number;
  start_date: string;
};

export const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/.netlify/functions/get-activities");
        const json = await res.json();
        console.log("API response:", json);

        // json should be a raw array
        if (Array.isArray(json)) {
          setActivities(json);
        } else {
          throw new Error("Expected an array, got: " + JSON.stringify(json));
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!activities.length) return <p>No activities found.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Recent Activities</h2>
      <ul className="space-y-2">
        {activities.map((act, index) => (
          <li key={index} className="border p-3 rounded shadow-sm">
            <p><strong>{act.name}</strong> ({act.type})</p>
            <p>{act.distance_km} km in {act.moving_time_min} min</p>
            <p className="text-sm text-gray-500">
              {new Date(act.start_date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
