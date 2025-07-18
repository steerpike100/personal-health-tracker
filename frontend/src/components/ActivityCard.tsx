import React from "react";

type Activity = {
  name: string;
  type: string;
  distance_km: string;
  moving_time_min: number;
  start_date: string;
};

const typeIcons: Record<string, string> = {
  Ride: "🚴‍♂️",
  Run: "🏃‍♀️",
  Walk: "🚶‍♂️",
  Swim: "🏊‍♂️",
};

export const ActivityCard: React.FC<{ activity: Activity }> = ({
  activity,
}) => {
  const { name, type, distance_km, moving_time_min, start_date } = activity;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {typeIcons[type] || "🏋️‍♂️"} {name}
        </h3>
        <span className="text-xs font-semibold uppercase px-2 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded">
          {type}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-semibold">{distance_km}</span> km in{" "}
        <span className="font-semibold">{moving_time_min}</span> min
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {new Date(start_date).toLocaleString(undefined, {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};
